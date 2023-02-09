import * as dynamoose from 'dynamoose'

import type { DynamoDB } from '@aws-sdk/client-dynamodb'

import { listFigures } from './list-figures'

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

    const query = () => {
        return {
            Items: [
                {
                    companyId: { S: companyId },
                    fileId: { S: fileId },
                    id: { S: id },
                },
            ],
        }
    }
    const dynamoClient = {
        query,
    } as unknown as DynamoDB

    dynamoose.aws.ddb.set(dynamoClient)

    const request = {
        pathParameters: {
            companyId,
        },
    } as unknown as AWSLambda.APIGatewayProxyEvent

    const listFiguresByFileId = await listFigures(request)

    expect(listFiguresByFileId).toMatchInlineSnapshot(`
        Object {
          "body": "{\\"result\\":[{\\"companyId\\":\\"company-id\\",\\"fileId\\":\\"file-id\\"}]}",
          "statusCode": 200,
        }
    `)
})
