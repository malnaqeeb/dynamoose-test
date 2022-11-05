resource "aws_dynamodb_table" "figures" {
  name         = "figures-table"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "companyId"
    type = "S"
  }
  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "fileId"
    type = "S"
  }
  hash_key  = "companyId"
  range_key = "id"


  global_secondary_index {
    name               = "fileIdIndex"
    hash_key           = "fileId"
    range_key          = "id"
    projection_type    = "ALL"
    non_key_attributes = []
  }

}


output "table-name" {
  value = aws_dynamodb_table.figures.id
}
