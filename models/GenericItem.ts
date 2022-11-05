import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { isEqualBy } from 'zenbox-util/lodash'
import { NameSchema } from '../../generic/models/Name'
import { DescriptionSchema } from '../../generic/models/Description'

export const GenericItemSchema = z.object({
  title: NameSchema,
  subtitle: NameSchema.optional(),
  description: DescriptionSchema.optional(),
  image: z.string().optional(),
}).describe('GenericItem')

export const GenericItemsSchema = z.array(GenericItemSchema)
  .superRefine(getDuplicatesRefinement('GenericItem', parseGenericItemUid))

export const GenericItemUidSchema = GenericItemSchema.pick({
  title: true,
})

export type GenericItem = z.infer<typeof GenericItemSchema>

export type GenericItemUid = z.infer<typeof GenericItemUidSchema>

export function parseGenericItem(item: GenericItem): GenericItem {
  return GenericItemSchema.parse(item)
}

export function parseGenericItems(items: GenericItem[]): GenericItem[] {
  return GenericItemsSchema.parse(items)
}

export function parseGenericItemUid(itemUid: GenericItemUid): GenericItemUid {
  return GenericItemUidSchema.parse(itemUid)
}

export const isEqualGenericItem = (a: GenericItem) => (b: GenericItem) => isEqualBy(a, b, parseGenericItemUid)
