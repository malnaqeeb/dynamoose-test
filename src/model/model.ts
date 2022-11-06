import { Item } from 'dynamoose/dist/Item'

export interface FiguresModel extends Item {
    companyId: string
    fileId: string
    expiredAt: number
}
