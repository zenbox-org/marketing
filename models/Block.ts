import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { NameSchema } from '../../generic/models/Name'
import { GenericItemSchema } from './GenericItem'
import { identity } from 'lodash-es'
import { DescriptionSchema } from '../../generic/models/Description'
import { ButtonSchema } from './Button'
import { ThoughtSchema } from 'libs/generic/models/Thought'
import { NotesSchema } from '../../generic/models/Notes'

export const BlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('hero'),
    title: NameSchema,
    subtitle: NameSchema.optional(),
    buttons: z.array(ButtonSchema).optional(),
  }),
  z.object({
    type: z.literal('items'),
    title: NameSchema.optional(),
    items: z.array(GenericItemSchema),
    notes: NotesSchema,
  }),
  z.object({
    type: z.literal('text-highlight'),
    image: z.string(),
    title: NameSchema,
    subtitle: NameSchema.optional(),
    description: DescriptionSchema.optional(),
    points: z.array(z.string()).optional(),
    button: ButtonSchema.optional(),
  }),
  z.object({
    type: z.literal('text'),
    title: NameSchema,
    description: DescriptionSchema,
  }),
  z.object({
    type: z.literal('faq'),
    questions: z.array(ThoughtSchema),
  }),
]).describe('Block')

// Can't define BlockUidSchema

export const BlocksSchema = z.array(BlockSchema)
  .superRefine(getDuplicatesRefinement('Block', identity))

export type Block = z.infer<typeof BlockSchema>

export function parseBlock(block: Block): Block {
  return BlockSchema.parse(block)
}

export function parseBlocks(blocks: Block[]): Block[] {
  return BlocksSchema.parse(blocks)
}
