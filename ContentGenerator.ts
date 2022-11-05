import { z } from 'zod'

export const ContentGeneratorSchema = z.object({
  name: z.string(),
})

export type ContentGenerator = z.infer<typeof ContentGeneratorSchema>

export function getContentGeneratorUid(contentGenerator: ContentGenerator) {
  return JSON.stringify([contentGenerator.name])
}
