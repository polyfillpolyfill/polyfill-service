sub breadcrumb_recv {
	if (req.restarts == 0) {
		set req.http.X-VCL-Route = "VCL_RECV";
	} else {
		set req.http.X-VCL-Route = req.http.X-VCL-Route ",VCL_RECV";
	}
}

sub breadcrumb_hash {
	set req.http.X-VCL-Route = req.http.X-VCL-Route ",VCL_HASH";
}

sub breadcrumb_miss {
	set req.http.X-PreFetch-Miss = ",VCL_MISS";
}

sub breadcrumb_pass {
	set req.http.X-PreFetch-Pass = ",VCL_PASS";
}

sub breadcrumb_fetch {
	set beresp.http.X-PreFetch-Pass = req.http.X-PreFetch-Pass;
	set beresp.http.X-PreFetch-Miss = req.http.X-PreFetch-Miss;
	set beresp.http.X-PostFetch = ",VCL_FETCH(status: " beresp.status if (beresp.http.X-VCL-Route, "; BERESP_VCL_ROUTE: " beresp.http.X-VCL-Route, "")")";
	set beresp.http.X-VCL-Route = req.http.X-VCL-Route;
}

sub breadcrumb_deliver {
	if (resp.http.X-VCL-Route) {
		set req.http.X-VCL-Route = resp.http.X-VCL-Route;
	}

	if (fastly_info.state ~ "^HITPASS") {
		set req.http.X-VCL-Route = req.http.X-VCL-Route ",VCL_HIT(object: uncacheable, return: pass)";
	}
	elseif (fastly_info.state ~ "^HIT") {
		set req.http.X-VCL-Route = req.http.X-VCL-Route ",VCL_HIT(" req.http.host req.url ")";
	}
	else {
		if (resp.http.X-PreFetch-Pass) {
			set req.http.X-VCL-Route = req.http.X-VCL-Route resp.http.X-PreFetch-Pass;
		}

		if (resp.http.X-PreFetch-Miss) {
			set req.http.X-VCL-Route = req.http.X-VCL-Route resp.http.X-PreFetch-Miss;
		}

		if (resp.http.X-PostFetch) {
			set req.http.X-VCL-Route = req.http.X-VCL-Route resp.http.X-PostFetch;
		}
	}

	set req.http.X-VCL-Route = req.http.X-VCL-Route ",VCL_DELIVER";
}
