terraform {
  cloud {
    organization = "polyfill-service"

    workspaces {
      name = "polyfill-service-production"
    }
  }

  required_version = ">= 1.1.2"
}