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

  dynamic "domain" {
    for_each = var.compute_domains
    content {
      name = domain.value["name"]
    }
  }
}