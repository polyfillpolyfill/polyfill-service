resource "fastly_service_v1" "app" {
  domain {
    name = "polyfill.io"
  }

  domain {
    name = "cdn.polyfill.io"
  }

  domain {
    name = "cdn.polyfills.io"
  }

  domain {
    name = "polyfills.io"
  }

  domain {
    name = "polyfill.webservices.ft.com"
  }
}
