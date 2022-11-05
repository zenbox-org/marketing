import { z } from 'zod'
import { FuncSchema } from '../../programming/models/Func'

/**
 * Component is a structure with listeners for user interactions, where at least render listener is defined
 */
export const ComponentSchema = z.object({
  name: z.string(),
  listeners: z.array(FuncSchema),
  // state: z.object({}),
})

export type Component = z.infer<typeof ComponentSchema>

export function validateComponent(component: Component) {
  return ComponentSchema.parse(component)
}

export function getComponentUid(component: Component) {
  return JSON.stringify([component.name])
}
