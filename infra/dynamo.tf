resource "aws_dynamodb_table" "figures" {
  name         = "figures-table-v2"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "companyId"
    type = "S"
  }
  attribute {
    name = "fileId"
    type = "S"
  }
  hash_key = "companyId"

  ttl {
    attribute_name = "expiredAt"
    enabled        = true
  }

  global_secondary_index {
    name               = "fileIdIndex"
    hash_key           = "fileId"
    projection_type    = "ALL"
    non_key_attributes = []
  }

}


output "table-name" {
  value = aws_dynamodb_table.figures.id
}
