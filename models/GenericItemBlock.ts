import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { DescriptionSchema } from '../../generic/models/Description'
import { NameSchema } from '../../generic/models/Name'

export const GenericItemBlockSchema = z.object({
  title: NameSchema,
  subtitle: NameSchema.optional(),
  description: DescriptionSchema.optional(),
  image: z.string().optional(),
}).describe('GenericItemBlock')

export const GenericItemBlocksSchema = getArraySchema(GenericItemBlockSchema, parseGenericItemBlockUid)

export const GenericItemBlockUidSchema = GenericItemBlockSchema.pick({
  title: true,
})

export type GenericItemBlock = z.infer<typeof GenericItemBlockSchema>

export type GenericItemBlockUid = z.infer<typeof GenericItemBlockUidSchema>

export function parseGenericItemBlock(block: GenericItemBlock): GenericItemBlock {
  return GenericItemBlockSchema.parse(block)
}

export function parseGenericItemBlocks(blocks: GenericItemBlock[]): GenericItemBlock[] {
  return GenericItemBlocksSchema.parse(blocks)
}

export function parseGenericItemBlockUid(uid: GenericItemBlockUid): GenericItemBlockUid {
  return GenericItemBlockUidSchema.parse(uid)
}

export const isEqualGenericItem = (a: GenericItemBlock) => (b: GenericItemBlock) => isEqualByD(a, b, parseGenericItemBlockUid)
