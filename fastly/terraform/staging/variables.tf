variable "compute_name" {
  type = string
}
variable "compute_domains" {
  type = list(object({
    name = string
  }))
}

variable "https_loggers" {
  type = list(object({
    name         = string
    url          = string
    message_type = string
    content_type = string
    method       = string
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
