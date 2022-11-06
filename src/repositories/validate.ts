import type { AnySchema, ObjectSchema, ValidationOptions } from 'joi'
import Joi from 'joi'
export function validate<T>(schema: AnySchema, input: unknown, options?: ValidationOptions): T {
    const { value, error } = schema.validate(input, options)
    if (error) {
        throw error
    }
    return value as T
}

export const schema = Joi.object({
    companyId: Joi.string().required(),
    fileId: Joi.string().required(),
    // it store the time as epoch but retrieve as Date object
    expiredAt: Joi.alternatives(Joi.number(), Joi.object()),
})
