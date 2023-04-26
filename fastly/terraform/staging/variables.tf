variable "compute_name" {
  type = string
}
variable "compute_domains" {
  type = list(object({
    name = string
  }))
}

variable "vcl_name" {
  type = string
}

variable "vcl_backends" {
  type = list(object({
    name                  = string
    address               = string
    port                  = number
    ssl_cert_hostname     = string
    auto_loadbalance      = bool
    connect_timeout       = number
    first_byte_timeout    = number
    between_bytes_timeout = number
    error_threshold       = number
    override_host         = string
  }))
}

variable "vcl_domains" {
  type = list(object({
    name = string
  }))
}
