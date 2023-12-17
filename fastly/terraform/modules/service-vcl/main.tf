resource "fastly_service_vcl" "app" {
  name = var.vcl_name

  force_destroy = false

  dynamic "backend" {
    for_each = var.vcl_backends
    content {
      name                  = backend.value["name"]
      address               = backend.value["address"]
      port                  = backend.value["port"]
      ssl_cert_hostname     = backend.value["ssl_cert_hostname"]
      auto_loadbalance      = backend.value["auto_loadbalance"]
      connect_timeout       = backend.value["connect_timeout"]
      first_byte_timeout    = backend.value["first_byte_timeout"]
      between_bytes_timeout = backend.value["between_bytes_timeout"]
      error_threshold       = backend.value["error_threshold"]
      override_host         = backend.value["override_host"]
    }
  }

  dynamic "domain" {
    for_each = var.vcl_domains
    content {
      name= domain.value["name"]
    }
  }

  vcl {
    name    = "main.vcl"
    content = file("${path.module}/vcl/main.vcl")
    main    = true
  }

  vcl {
    name    = "polyfill-service.vcl"
    content = file("${path.module}/vcl/polyfill-service.vcl")
  }

  vcl {
    name    = "normalise-user-agent-3-25-1.vcl"
    content = file("${path.module}/vcl/normalise-user-agent-3-25-1.vcl")
  }

  vcl {
    name    = "normalise-user-agent.vcl"
    content = file("${path.module}/vcl/normalise-user-agent.vcl")
  }

  vcl {
    name    = "fastly-boilerplate-begin.vcl"
    content = file("${path.module}/vcl/fastly-boilerplate-begin.vcl")
  }

  vcl {
    name    = "fastly-boilerplate-end.vcl"
    content = file("${path.module}/vcl/fastly-boilerplate-end.vcl")
  }

  vcl {
    name    = "breadcrumbs.vcl"
    content = file("${path.module}/vcl/breadcrumbs.vcl")
  }

  vcl {
    name    = "top_pops.vcl"
    content = file("${path.module}/vcl/top_pops.vcl")
  }

  vcl {
    name    = "fastly-devhub-globe.vcl"
    content = file("${path.module}/vcl/fastly-devhub-globe.vcl")
  }

  dictionary {
    name = "toppops_config"
  }

  logging_https {
    name           = "toppops-collector"
    url            = "https://toppops-ingest.fastlylabs.com/ingest"
    message_type   = "blank"
    format_version = 2
    format         = ""
    content_type   = "text/plain"
    method         = "POST"
    placement      = "none"
  }

  logging_https {
    name           = "fastly-devrel-traffic-globe"
    url            = "https://globeviz-data-proxy-dot-rd---product.uc.r.appspot.com/collector"
    message_type   = "blank"
    format_version = 2
    format         = ""
    content_type   = "text/plain"
    method         = "POST"
    placement      = "none"
  }
}

resource "fastly_service_dictionary_items" "toppops_config_items" {
  service_id    = fastly_service_vcl.app.id
  dictionary_id = { for dictionary in fastly_service_vcl.app.dictionary : dictionary.name => dictionary.dictionary_id }["toppops_config"]

  items = {
  }

  lifecycle {
    ignore_changes = [items, ]
  }
}
