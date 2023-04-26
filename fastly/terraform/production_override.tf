resource "fastly_service_compute" "app" {
  name = "polyfill-service.edgecompute.app"

  domain {
    name = "polyfill-service.edgecompute.app"
  }
}

resource "fastly_service_compute" "app" {
  name = "polyfill-service.edgecompute.app"

  domain {
    name = "polyfill-service.edgecompute.app"
  }

}

resource "fastly_service_vcl" "app" {
  name = "cdn.polyfill.io"

  domain {
    name = "polyfill.io"
  }

  domain {
    name = "www.polyfill.io"
  }

  domain {
    name = "cdn.polyfill.io"
  }

  domain {
    name = "cdn.polyfills.io"
  }

  domain {
    name = "polyfills.io"
  }

  domain {
    name = "www.polyfills.io"
  }

  domain {
    name = "polyfill.webservices.ft.com"
  }

  backend {
    name                  = "compute_at_edge"
    address               = "polyfill-service.edgecompute.app"
    port                  = 443
    healthcheck           = "compute_at_edge_healthcheck"
    ssl_cert_hostname     = "*.edgecompute.app"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
    override_host         = "polyfill-service.edgecompute.app"
  }

}