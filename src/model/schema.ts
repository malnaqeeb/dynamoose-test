import * as dynamoose from 'dynamoose'
import { IndexType, Schema } from 'dynamoose/dist/Schema'

export const figuresSchema = new Schema({
    companyId: {
        type: String,
        required: true,
    },

    fileId: {
        type: String,
        index: {
            name: 'fileIdIndex',
            throughput: 1,
            type: IndexType.global,
        },

        required: true,
    },
    expiredAt: {
        type: Number,
    },
})
