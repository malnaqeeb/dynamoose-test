import { getFigures } from './get-figures'
import * as dynamoose from 'dynamoose'
import { mockClient } from 'aws-sdk-client-mock'
import type { DynamoDB } from '@aws-sdk/client-dynamodb'
import AWS from 'aws-sdk'
import { DeepPartial } from 'dynamoose/dist/General'

beforeEach(() => {
    dynamoose.Table.defaults.set({ create: false, waitForActive: false })
})
afterEach(() => {
    dynamoose.Table.defaults.set({})
})

it('should query dynamodb correctly', async () => {
    const companyId = 'company-id'
    const fileId = 'file-id'
    const id = 'entity-id'
    const get = () => {
        return {
            Item: {
                companyId: { S: companyId },
                fileId: { S: fileId },
                id: { S: id },
            },
        }
    }

    const dynamoClient = {
        getItem: get,
    } as unknown as DynamoDB

    dynamoose.aws.ddb.set(dynamoClient)

    const request = {
        pathParameters: {
            companyId,
        },
    } as unknown as AWSLambda.APIGatewayProxyEvent

    const result = await getFigures(request)

    expect(result).toMatchInlineSnapshot(`
        Object {
          "body": "{\\"result\\":{\\"companyId\\":\\"company-id\\",\\"fileId\\":\\"file-id\\",\\"id\\":\\"entity-id\\"}}",
          "statusCode": 200,
        }
    `)
})
