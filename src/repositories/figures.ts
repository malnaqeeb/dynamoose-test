import * as dynamoose from 'dynamoose'
import { FiguresModel } from '../model/model'
import { figuresSchema } from '../model/schema'
import { validate, schema } from './validate'
export interface Figures {
    companyId: string
    fileId: string
    expiredAt: number
}

const tableName = process.env.TABLE_NAME ?? 'figures-table-v2'

if (!tableName) {
    throw new Error(`No table has been found`)
}
const figuresRepository = dynamoose.model<FiguresModel>(tableName, figuresSchema, {
    create: false,
    expires: {
        ttl: 604800, // one week
        attribute: 'expiredAt',
        items: {
            returnExpired: false,
        },
    },
})

export const getFiguresByCompanyId = async (companyId: string): Promise<Figures> => {
    try {
        const item = await figuresRepository.get(companyId)
        const validatedResponse = validate<Figures>(schema, item)
        return validatedResponse
    } catch (error) {
        throw new Error(`Error while getting the figures for ${companyId}`)
    }
}

export const createFigures = async (companyId: string, fileId: string): Promise<Figures> => {
    try {
        const result = await figuresRepository.create({
            companyId,
            fileId,
        })
        const validatedResponse = validate<Figures>(schema, result)
        return validatedResponse
    } catch (error) {
        console.log(error)
        throw new Error(`Error while creating the figures for ${companyId}`)
    }
}

// query on GSI
export const listFiguresByFileId = async (fileId: string): Promise<Figures> => {
    const filter = new dynamoose.Condition().where('fileId').eq(fileId)

    try {
        const item = await figuresRepository.query(filter).exec()
        const validatedResponse = validate<Figures>(schema, item)
        return validatedResponse
    } catch (error) {
        throw new Error(`Error while getting the figures ${fileId}`)
    }
}
