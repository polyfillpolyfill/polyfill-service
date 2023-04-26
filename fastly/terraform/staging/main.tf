module "vcl" {
  source       = "../modules/service-vcl"
  vcl_backends = var.vcl_backends
  vcl_domains  = var.vcl_domains
  vcl_name     = var.vcl_name
}

module "compute" {
  source          = "../modules/service-compute"
  compute_domains = var.compute_domains
  compute_name    = var.compute_name
}
