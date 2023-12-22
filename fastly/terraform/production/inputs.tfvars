compute_name = "polyfill-service.edgecompute.app"

compute_domains = [
  {
    name = "polyfill-service.edgecompute.app"
  }
]

https_loggers = [
  {
    name         = "toppops-collector"
    url          = "https://toppops-ingest.fastlylabs.com/ingest"
    message_type = "blank"
    content_type = "text/plain"
    method       = "POST"
  },
  {
    name         = "fastly-devrel-traffic-globe"
    url          = "https://globeviz-data-proxy-dot-rd---product.uc.r.appspot.com/collector"
    message_type = "blank"
    content_type = "text/plain"
    method       = "POST"
  }
]

vcl_name = "cdn.polyfill.io"
vcl_backends = [
  {
    name                  = "compute_at_edge"
    address               = "polyfill-service.edgecompute.app"
    port                  = 443
    ssl_cert_hostname     = "*.edgecompute.app"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
    override_host         = "polyfill-service.edgecompute.app"
  }
]


vcl_domains = [
  {
    name = "polyfill.io"
  },
  {
    name = "www.polyfill.io"
  },
  {
    name = "cdn.polyfill.io"
  }
]
