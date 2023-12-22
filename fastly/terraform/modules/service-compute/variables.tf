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
