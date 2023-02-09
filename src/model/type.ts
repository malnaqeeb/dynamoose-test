import { Item } from 'dynamoose/dist/Item'

export interface FiguresApiModel {
    companyId: string
    fileId: string
    expiredAt: number
    userId: string
}

export type FigureItem = FiguresApiModel & Item
