import { ThoughtSchema } from 'libs/generic/models/Thought'
import { identity } from 'lodash-es'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { z } from 'zod'
import { DescriptionSchema } from '../../generic/models/Description'
import { NameSchema } from '../../generic/models/Name'
import { NotesSchema } from '../../generic/models/Notes'
import { ButtonSchema } from './Button'
import { GenericItemBlockSchema } from './GenericItemBlock'

const HeroBlockSchema = z.object({
  type: z.literal('hero'),
  title: NameSchema,
  subtitle: NameSchema.optional(),
  buttons: z.array(ButtonSchema).optional(),
})

const ItemsBlockSchema = z.object({
  type: z.literal('items'),
  title: NameSchema.optional(),
  items: z.array(GenericItemBlockSchema),
  notes: NotesSchema,
})

const TextHighlightBlockSchema = z.object({
  type: z.literal('text-highlight'),
  image: z.string(),
  title: NameSchema,
  subtitle: NameSchema.optional(),
  description: DescriptionSchema.optional(),
  points: z.array(z.string()).optional(),
  button: ButtonSchema.optional(),
})

const CardBlockSchema = z.object({
  type: z.literal('card'),
  title: NameSchema,
  children: DescriptionSchema,
})

const TextBlockSchema = z.object({
  type: z.literal('text'),
  title: NameSchema,
  description: DescriptionSchema,
})

const FaqBlockSchema = z.object({
  type: z.literal('faq'),
  questions: z.array(ThoughtSchema),
})

export const BlockSchema = z.discriminatedUnion('type', [
  HeroBlockSchema,
  ItemsBlockSchema,
  TextHighlightBlockSchema,
  CardBlockSchema,
  TextBlockSchema,
  FaqBlockSchema,
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
