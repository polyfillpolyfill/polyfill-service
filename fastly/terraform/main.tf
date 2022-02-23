provider "fastly" {
  version = "0.11.1"
}

output "service_id" {
  value = ["${fastly_service_v1.app.id}"]
}

resource "fastly_service_v1" "app" {
  name = "placeholder"

  force_destroy = false

  vcl {
    name    = "main.vcl"
    content = file("${path.module}/../vcl/main.vcl")
    main    = true
  }

  vcl {
    name    = "polyfill-service.vcl"
    content = file("${path.module}/../vcl/polyfill-service.vcl")
  }

  vcl {
    name    = "normalise-user-agent-3-25-1.vcl"
    content = file("${path.module}/../vcl/normalise-user-agent-3-25-1.vcl")
  }

  vcl {
    name    = "normalise-user-agent.vcl"
    content = file("${path.module}/../../node_modules/@financial-times/polyfill-useragent-normaliser/lib/normalise-user-agent.vcl")
  }

  vcl {
    name    = "fastly-boilerplate-begin.vcl"
    content = file("${path.module}/../vcl/fastly-boilerplate-begin.vcl")
  }

  vcl {
    name    = "fastly-boilerplate-end.vcl"
    content = file("${path.module}/../vcl/fastly-boilerplate-end.vcl")
  }

  vcl {
    name    = "breadcrumbs.vcl"
    content = file("${path.module}/../vcl/breadcrumbs.vcl")
  }

  vcl {
    name    = "redirects.vcl"
    content = file("${path.module}/../vcl/redirects.vcl")
  }

  vcl {
    name    = "synthetic-responses.vcl"
    content = file("${path.module}/../vcl/synthetic-responses.vcl")
  }

  vcl {
    name    = "top_pops.vcl"
    content = file("${path.module}/../vcl/top_pops.vcl")
  }

  dictionary {
    name = "toppops_config"
  }

  dictionary {
    name = "compute_at_edge_config"
  }
}

resource "fastly_service_dictionary_items_v1" "toppops_config_items" {
  service_id    = fastly_service_v1.app.id
  dictionary_id = { for dictionary in fastly_service_v1.app.dictionary : dictionary.name => dictionary.dictionary_id }["toppops_config"]

  items = {
  }

  lifecycle {
    ignore_changes = [items, ]
  }
}

resource "fastly_service_dictionary_items_v1" "compute_at_edge_config_items" {
  service_id    = fastly_service_v1.app.id
  dictionary_id = { for dictionary in fastly_service_v1.app.dictionary : dictionary.name => dictionary.dictionary_id }["compute_at_edge_config"]

  items = {
  }

  lifecycle {
    ignore_changes = [items, ]
  }
}
