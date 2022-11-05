import FiguresRepository from '../repositories/figures'

export async function getFigures(request: AWSLambda.APIGatewayProxyEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { companyId } = request.pathParameters

    const repository = new FiguresRepository()
    const result = await repository.getFiguresById(companyId)
    return {
        statusCode: 200,
        body: JSON.stringify({ result }),
    }
}
export const handler = getFigures
