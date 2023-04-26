resource "fastly_service_compute" "app" {
  name = "qa.polyfill.io.edgecompute.app"

  domain {
    name = "qa-polyfill-service.edgecompute.app"
  }
}

resource "fastly_service_vcl" "app" {
  name = "qa.polyfill.io"

  domain {
    name = "qa.polyfill.io"
  }

  backend {
    name                  = "compute_at_edge"
    address               = "qa-polyfill-service.edgecompute.app"
    port                  = 443
    healthcheck           = "compute_at_edge_healthcheck"
    ssl_cert_hostname     = "*.edgecompute.app"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
    override_host         = "qa-polyfill-service.edgecompute.app"
    use_ssl               = true
  }

}