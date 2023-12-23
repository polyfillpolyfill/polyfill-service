resource "fastly_service_compute" "app" {
  name = var.compute_name

  force_destroy = false

  package {
    filename         = "../../../pkg/package.tar.gz"
    source_code_hash = filesha512("../../../pkg/package.tar.gz")
  }

  backend {
    name    = "synthetic"
    address = "127.0.0.1"
    port    = 80
  }

  logging_https {
    name           = "toppops-collector"
    url            = "https://toppops-ingest.fastlylabs.com/ingest"
    message_type   = "blank"
    content_type   = "text/plain"
    method         = "POST"
  }

  logging_https {
    name           = "fastly-devrel-traffic-globe"
    url            = "https://globeviz-data-proxy-dot-rd---product.uc.r.appspot.com/collector"
    message_type   = "blank"
    content_type   = "text/plain"
    method         = "POST"
  }

  dynamic "domain" {
    for_each = var.compute_domains
    content {
      name = domain.value["name"]
    }
  }
}

