import { z } from 'zod'
import { PathSchema } from '../../http/Path'

export const PageSchema = z.object({
  path: PathSchema,
})

export type Page = z.infer<typeof PageSchema>

export function validatePage(page: Page) {
  return PageSchema.parse(page)
}

export function getPageUid(page: Page) {
  return JSON.stringify([page.path])
}
