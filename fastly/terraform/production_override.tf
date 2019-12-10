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

  backend {
    name                  = "v3_eu"
    address               = "origami-polyfill-service-eu.herokuapp.com"
    port                  = 443
    healthcheck           = "v3_eu_healthcheck"
    ssl_cert_hostname     = "*.herokuapp.com"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
    shield                = "london_city-uk"
  }

  healthcheck {
    name      = "v3_eu_healthcheck"
    host      = "origami-polyfill-service-eu.herokuapp.com"
    path      = "/__gtg"
    timeout   = 5000
    threshold = 2
    window    = 5
  }

  backend {
    name                  = "v3_us"
    address               = "origami-polyfill-service-us.herokuapp.com"
    port                  = 443
    healthcheck           = "v3_us_healthcheck"
    ssl_cert_hostname     = "*.herokuapp.com"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
    shield                = "iad-va-us"
  }

  healthcheck {
    name      = "v3_us_healthcheck"
    host      = "origami-polyfill-service-us.herokuapp.com"
    path      = "/__gtg"
    timeout   = 5000
    threshold = 2
    window    = 5
  }

  header {
    name        = "EU Host"
    action      = "set"
    type        = "request"
    destination = "http.EU_Host"
    source      = "\"origami-polyfill-service-eu.herokuapp.com\""
  }

  header {
    name        = "US Host"
    action      = "set"
    type        = "request"
    destination = "http.US_Host"
    source      = "\"origami-polyfill-service-us.herokuapp.com\""
  }

  dictionary {
    name = "toppops_config"
  }
}


resource "fastly_service_dictionary_items_v1" "secrets_items" {
    service_id = "${fastly_service_v1.app.id}"
    dictionary_id = "${{for dictionary in fastly_service_v1.app.dictionary : dictionary.name => dictionary.dictionary_id}["secrets"]}"

    items = {
      datacenters: "LCY,NRT,HAM,BWI,DCA"
      sample_percent: "5"
    }
}