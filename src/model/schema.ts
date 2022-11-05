import * as dynamoose from 'dynamoose'
import { IndexType, Schema } from 'dynamoose/dist/Schema'

export const figuresSchema = new Schema({
    id: {
        type: String,
    },
    companyId: {
        type: String,
        required: true,
    },

    fileId: {
        type: String,
        index: {
            name: 'fileIdIndex',
            rangeKey: 'id',
            throughput: 1,
            type: IndexType.global,
        },

        required: true,
    },
})
