locals {
  vcl = fileset("${path.module}/../vcl", "*.vcl")
}

resource "fastly_service_v1" "app" {
  name = "placeholder" // This gets replaced by the name defined in dev_override.tf/qa_override.tf/production_override.tf

  force_destroy = false

  vcl {
    name    = "normalise-user-agent.vcl"
    content = file("${path.module}/../../node_modules/@financial-times/polyfill-useragent-normaliser/lib/normalise-user-agent.vcl")
  }

  dynamic "vcl" {
    for_each = local.vcl
    content {
      name    = vcl.value
      main    = vcl.value == "main.vcl" ? true : false
      content = file("${path.module}/../vcl/${vcl.value}")
    }
  }

  dictionary {
    name = "toppops_config"
  }
}

resource "fastly_service_dictionary_items_v1" "items" {
  service_id    = fastly_service_v1.app.id
  dictionary_id = { for dictionary in fastly_service_v1.app.dictionary : dictionary.name => dictionary.dictionary_id }["toppops_config"]

  items = {
  }

  lifecycle {
    ignore_changes = [items, ]
  }
}
