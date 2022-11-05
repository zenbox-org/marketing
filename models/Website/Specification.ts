import { z } from 'zod'
import { UrlSchema } from '../../../generic/models/Url'

export const SpecificationSchema = z.object({
  url: UrlSchema,
})

export type Specification = z.infer<typeof SpecificationSchema>

export function validateSpecification(specification: Specification) {
  return SpecificationSchema.parse(specification)
}

export function getSpecificationUid(specification: Specification) {
  return JSON.stringify([specification.url])
}
