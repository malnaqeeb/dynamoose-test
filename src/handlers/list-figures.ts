import FiguresRepository from '../repositories/figures'

async function listFigures(request: AWSLambda.APIGatewayProxyEvent) {
    const repository = new FiguresRepository()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await repository.listFigures()
    return {
        statusCode: 200,
        body: JSON.stringify({ result }),
    }
}
export const handler = listFigures
