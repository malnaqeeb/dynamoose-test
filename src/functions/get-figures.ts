import { getFiguresByCompanyId } from '../repositories/figures'

export async function getFigures(request: AWSLambda.APIGatewayProxyEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { companyId } = request.pathParameters

    const result = await getFiguresByCompanyId(companyId)
    return {
        statusCode: 200,
        body: JSON.stringify({ result }),
    }
}
export const handler = getFigures
