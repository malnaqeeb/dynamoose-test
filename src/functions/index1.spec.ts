import { getFigures } from './get-figures'
import * as dynamoose from 'dynamoose'

import type { DynamoDB } from '@aws-sdk/client-dynamodb'

import { addFigures } from './add-figures'
import { APIGatewayProxyEvent } from 'aws-lambda'
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
    const getItem = () => {
        return {
            Item: {
                companyId: { S: companyId },
                fileId: { S: fileId },
                id: { S: id },
            },
        }
    }

    const putItem = () => {
        return {
            Item: {
                companyId: { S: companyId },
                fileId: { S: fileId },
                id: { S: id },
            },
        }
    }
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
        getItem,
        putItem,
        query,
    } as unknown as DynamoDB

    dynamoose.aws.ddb.set(dynamoClient)

    const request = {
        pathParameters: {
            companyId,
        },
    } as unknown as AWSLambda.APIGatewayProxyEvent

    const figuresByCompanyId = await getFigures(request)
    const createFigures = await addFigures(request)
    const listFiguresByFileId = await listFigures(request)

    expect(figuresByCompanyId).toMatchInlineSnapshot(`
        Object {
          "body": "{\\"result\\":{\\"companyId\\":\\"company-id\\",\\"fileId\\":\\"file-id\\"}}",
          "statusCode": 200,
        }
    `)
    expect(JSON.parse(createFigures.body)).toEqual({
        result: {
            companyId,
            fileId: expect.any(String),
            expiredAt: expect.any(Number),
        },
    })
    expect(listFiguresByFileId).toMatchInlineSnapshot(`
        Object {
          "body": "{\\"result\\":[{\\"companyId\\":\\"company-id\\",\\"fileId\\":\\"file-id\\"}]}",
          "statusCode": 200,
        }
    `)
})
