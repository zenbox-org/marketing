import { z } from 'zod'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { isEqualByD } from 'libs/utils/lodash'
import { NameSchema } from '../../generic/models/Name'

export const ButtonSchema = z.object({
  title: NameSchema,
}).describe('Button')

export const ButtonsSchema = z.array(ButtonSchema)
  .superRefine(getDuplicatesRefinement('Button', parseButtonUid))

export const ButtonUidSchema = ButtonSchema.pick({
  title: true,
})

export type Button = z.infer<typeof ButtonSchema>

export type ButtonUid = z.infer<typeof ButtonUidSchema>

export function parseButton(button: Button): Button {
  return ButtonSchema.parse(button)
}

export function parseButtons(buttons: Button[]): Button[] {
  return ButtonsSchema.parse(buttons)
}

export function parseButtonUid(buttonUid: ButtonUid): ButtonUid {
  return ButtonUidSchema.parse(buttonUid)
}

export const isEqualButton = (a: Button) => (b: Button) => isEqualByD(a, b, parseButtonUid)
