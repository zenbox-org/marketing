import { z } from 'zod'
import { DomainSchema } from '../../dns/models/Domain'
import { ComponentSchema } from './Component'

export const WebsiteSchema = z.object({
  domain: DomainSchema,
  components: z.array(ComponentSchema),
})

export type Website = z.infer<typeof WebsiteSchema>

export function validateWebsite(website: Website) {
  return WebsiteSchema.parse(website)
}

export function getWebsiteUid(website: Website) {
  return JSON.stringify([website.domain])
}
