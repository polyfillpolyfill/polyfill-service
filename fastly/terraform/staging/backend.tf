terraform {
  cloud {
    organization = "polyfill-service"

    workspaces {
      name = "polyfill-service-staging"
    }
  }

  required_version = ">= 1.1.2"
}