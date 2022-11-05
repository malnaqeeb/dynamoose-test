import * as dynamoose from 'dynamoose'
import { FiguresModel } from '../model/model'
import { figuresSchema } from '../model/schema'
import { validate, schema } from './validate'
export interface Figures {
    companyId: string
    fileId: string
    id: string
}

const tableName = process.env.TABLE_NAME

if (!tableName) {
    throw new Error(`No table has been found`)
}
const figuresRepository = dynamoose.model<FiguresModel>(tableName, figuresSchema, { create: false })

export const getFiguresById = async (companyId: string): Promise<Figures> => {
    try {
        const item = figuresRepository.get(companyId)
        const validatedResponse = validate<Figures>(schema, item)
        return validatedResponse
    } catch (error) {
        throw new Error(`error while getting the figures for ${companyId}`)
    }
}

export const addFigures = async (
    companyId: string,
    fileId: string,
    id: string
): Promise<Figures> => {
    try {
        const result = await figuresRepository.create({
            companyId,
            fileId,
            id,
        })
        const validatedResponse = validate<Figures>(schema, result)
        return validatedResponse
    } catch (error) {
        throw new Error(`error while creating the figures for ${companyId}`)
    }
}

// query on GSI
export const listFigures = async (fileId: string): Promise<Figures> => {
    const filter = new dynamoose.Condition().where('fileId').eq(fileId)
    try {
        const item = await figuresRepository.query(filter).exec()
        const validatedResponse = validate<Figures>(schema, item)
        return validatedResponse
    } catch (error) {
        throw new Error(`error while getting the figures ${fileId}`)
    }
}

// import * as dynamoose from 'dynamoose'
// import { Model } from 'dynamoose/dist/Model'
// import { FiguresModel } from '../model/model'
// import { figuresSchema } from '../model/schema'
// import { validate, schema } from './validate'
// interface Figures {
//     companyId: string
//     fileId: string
//     id: string
// }
// export default class FiguresRepository {
//     private figuresInstance: Model<FiguresModel>

//     constructor() {
//         const tableName = process.env.ITEM_TABLE ?? 'figures-table'
//         this.figuresInstance = dynamoose.model<FiguresModel>(tableName, figuresSchema, {
//             create: false,
//         })
//     }

//     addFigures = async (companyId: string, fileId: string, id: string): Promise<Figures> => {
//         const result = await this.figuresInstance.create({
//             companyId,
//             fileId,
//             id,
//         })
//         const res = validate<Figures>(schema, result)

//         return res
//     }

//     getFiguresById = async (companyId: string) => {
//         return await this.figuresInstance.get({ companyId })
//     }

//     listFigures = async () => {
//         const filter = new dynamoose.Condition().where('fileId').eq('1234')
//         return this.figuresInstance
//             .query('fileId')
//             .eq('4c5d5067-5f12-4ce8-a84b-4db2a6803734')
//             .exec()
//     }
// }
