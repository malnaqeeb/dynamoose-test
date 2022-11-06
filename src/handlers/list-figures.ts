import { listFiguresByFileId } from '../repositories/figures'

async function listFigures(request: AWSLambda.APIGatewayProxyEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { fileId } = request.pathParameters

    const result = await listFiguresByFileId(fileId)
    return {
        statusCode: 200,
        body: JSON.stringify({ result }),
    }
}
export const handler = listFigures
