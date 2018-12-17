provider "fastly" {
  version = "0.1.2"
}

variable "domain" {
  type    = "string"
  default = "polyfill.io"
}

variable "name" {
  type    = "string"
  default = "Origami Polyfill Service"
}

output "service_id" {
  value = ["${fastly_service_v1.app.id}"]
}

resource "fastly_service_v1" "app" {
  name = "${var.name}"

  force_destroy = false

  domain {
    name = "${var.domain}"
  }

  vcl {
    name    = "main.vcl"
    content = "${file("${path.module}/../vcl/main.vcl")}"
    main    = true
  }

  vcl {
    name    = "polyfill-service.vcl"
    content = "${file("${path.module}/../vcl/polyfill-service.vcl")}"
  }

  vcl {
    name    = "useragent-parser.vcl"
    content = "${file("${path.module}/../vcl/useragent-parser.vcl")}"
  }

  vcl {
    name    = "normalise-user-agent.vcl"
    content = "${file("${path.module}/../vcl/normalise-user-agent.vcl")}"
  }

  vcl {
    name    = "normalise-user-agent-latest.vcl"
    content = "${file("${path.module}/../vcl/normalise-user-agent-latest.vcl")}"
  }

  vcl {
    name    = "fastly-boilerplate-begin.vcl"
    content = "${file("${path.module}/../vcl/fastly-boilerplate-begin.vcl")}"
  }

  vcl {
    name    = "fastly-boilerplate-end.vcl"
    content = "${file("${path.module}/../vcl/fastly-boilerplate-end.vcl")}"
  }

  vcl {
    name    = "breadcrumbs.vcl"
    content = "${file("${path.module}/../vcl/breadcrumbs.vcl")}"
  }

  vcl {
    name    = "redirects.vcl"
    content = "${file("${path.module}/../vcl/redirects.vcl")}"
  }

  vcl {
    name    = "synthetic-responses.vcl"
    content = "${file("${path.module}/../vcl/synthetic-responses.vcl")}"
  }
}
