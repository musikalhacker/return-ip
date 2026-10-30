variable "location" {
  type    = string
  default = "centralus"
}

variable "resource_group_name" {
  type    = string
  default = "rg-return-ip"
}

variable "app_name" {
  type        = string
  description = "Globally unique name for the App Service"
}
