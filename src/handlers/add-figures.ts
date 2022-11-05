// import FiguresRepository from '../repositories/figures'
import { Figures } from 'repositories/figures'
import { v4 as uuidv4 } from 'uuid'

interface AddFiguresResponse {
    body: any
    statusCode: number
}
export async function addFigures(request: any): Promise<AddFiguresResponse> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { companyId } = request.pathParameters

    // const repository = new FiguresRepository()
    const fileId = uuidv4()
    const id = uuidv4()
    // const companyId = uuidv4()
    // const result = await repository.addFigures(companyId, fileId, id)
    const result = await addFigures({ companyId, fileId, id })
    return {
        statusCode: 200,
        body: JSON.stringify({ result }),
    }
}
export const handler = addFigures
