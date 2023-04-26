variable "compute_name" {
  type = string
}
variable "compute_domains" {
  type = list(object({
    name    = string
  }))
}
