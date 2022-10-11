terraform {
  required_providers {
    fastly = {
      source  = "fastly/fastly"
      version = "1.1.2"
    }
  }
}

resource "fastly_service_compute" "app" {
  name = "placeholder"

  force_destroy = false

  package {
    filename         = "../c-at-e/pkg/package.tar.gz"
    source_code_hash = filesha512("../c-at-e/pkg/package.tar.gz")
  }
}

resource "fastly_service_vcl" "app" {
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

resource "fastly_service_dictionary_items" "toppops_config_items" {
  service_id    = fastly_service_vcl.app.id
  dictionary_id = { for dictionary in fastly_service_vcl.app.dictionary : dictionary.name => dictionary.dictionary_id }["toppops_config"]

  items = {
  }

  lifecycle {
    ignore_changes = [items, ]
  }
}

resource "fastly_service_dictionary_items" "compute_at_edge_config_items" {
  service_id    = fastly_service_vcl.app.id
  dictionary_id = { for dictionary in fastly_service_vcl.app.dictionary : dictionary.name => dictionary.dictionary_id }["compute_at_edge_config"]

  items = {
  }

  lifecycle {
    ignore_changes = [items, ]
  }
}
