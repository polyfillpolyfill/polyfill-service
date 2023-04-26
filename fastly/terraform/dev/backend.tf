terraform {
  cloud {
    organization = "polyfill-service"

    workspaces {
      name = "polyfill-service-dev"
    }
  }

  required_version = ">= 1.1.2"
}