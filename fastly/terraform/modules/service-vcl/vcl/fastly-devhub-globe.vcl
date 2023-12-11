table globeviz_config {
    "sample_rate": "1000",
    "sample_rate_AF": "50",
    "sample_rate_SA": "100",
    "sample_rate_OC": "100",
    "service_name": "PIO"
}

// https://deviceatlas.com/device-data/explorer/#defined_property_values/7/2705619
table globeviz_known_browsers {
  "Chrome": "C",
  "Chrome Mobile": "C",
  "Firefox": "F",
  "Firefox for Mobile": "F",
  "Edge": "E",
  "Kindle Browser": "K",
  "Safari": "S",
  "Samsung Browser": "A"
}


// Record the following data (space separated)
//    PIO             Name of source service (3 char)
//    LCY             Name of Fastly POP (3 char)
//    51.43,-0.23     Client location (var length)
//    17234           Duration (var length)
//    42426           Minimum observed RTT (var length)
//    EN              Normalized Accept-Language (2 char)
//    M               Cache state (1 char: H, M, P)
//    2               HTTP version (numeric, variable length)
//    1.2             TLS version (numeric, variable length)
//    C               Browser (1 char: C, F, E, K, S, A)
//    M               Is mobile (M) or other (-)
//
sub vcl_log {
  declare local var.sample_rate INTEGER;
  
  set var.sample_rate = std.atoi(
    table.lookup(globeviz_config, "sample_rate_"+client.geo.continent_code, 
      table.lookup(globeviz_config, "sample_rate", "100000")
    )
  );
  // Record only non-shielding, non-VPN requests at the specified sample frequency
  if (fastly.ff.visits_this_service == 0 && client.geo.proxy_type == "?" && randombool(1, var.sample_rate)) {
    log "syslog " req.service_id " fastly-devrel-traffic-globe :: "
      table.lookup(globeviz_config, "service_name", "-") " "
      server.datacenter " "
      client.geo.latitude "," client.geo.longitude " "
      time.elapsed.usec " "
      client.socket.tcpi_min_rtt " "
      std.toupper(
        accept.language_lookup(
          "en:de:fr:nl:jp:es:ar:zh:gu:he:hi:id:it:ko:ms:pl:pt:ru:th:uk",
          "en",
          req.http.Accept-Language
        )
      ) " "
      substr(fastly_info.state, 0, 1) " "
      regsuball(req.proto, "[^\d.]", "") " "
      regsuball(tls.client.protocol, "[^\d.]", "") " "
      table.lookup(globeviz_known_browsers, client.browser.name, "Z") " "
      if (client.geo.conn_type == "mobile", "M", "-")
    ;
  }
}
