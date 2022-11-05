import { z } from 'zod'
import { UrlSchema } from '../../../generic/models/Url'

export const DesignSchema = z.object({
  url: UrlSchema,
})

export type Design = z.infer<typeof DesignSchema>

export function validateDesign(design: Design) {
  return DesignSchema.parse(design)
}

export function getDesignUid(design: Design) {
  return JSON.stringify([design.url])
}
