import { z } from 'zod'
import { UrlSchema } from '../../generic/models/Url'

export const LinkSchema = z.object({
  title: z.string().min(1),
  url: UrlSchema,
})

export const LinkUidSchema = LinkSchema.pick({
  url: true,
})

export type Link = z.infer<typeof LinkSchema>

export type LinkUid = z.infer<typeof LinkUidSchema>

export function validateLink(link: Link) {
  return LinkSchema.parse(link)
}

export function getLinkUid(linkUid: LinkUid) {
  return LinkUidSchema.parse(linkUid)
}
