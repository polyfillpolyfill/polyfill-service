resource "fastly_service_compute" "app" {
  name = "origami-polyfill-service-dev.edgecompute.app"

  domain {
    name = "origami-polyfill-service-dev.edgecompute.app"
  }
}

resource "fastly_service_vcl" "app" {
  name = "dev.polyfill.io"

  domain {
    name = "dev.polyfill.io"
  }

  backend {
    name                  = "compute_at_edge"
    address               = "origami-polyfill-service-dev.edgecompute.app"
    port                  = 443
    healthcheck           = "compute_at_edge_healthcheck"
    ssl_cert_hostname     = "*.edgecompute.app"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
    override_host         = "origami-polyfill-service-dev.edgecompute.app"
    use_ssl               = true
  }

}