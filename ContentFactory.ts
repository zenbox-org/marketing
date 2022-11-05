import { z } from 'zod'
import { impl, todo } from 'zenbox-util/todo'
import { ComponentSchema } from './models/Component'
import { Call } from '../programming/models/Call'
import { Func } from '../programming/models/Func'

/**
 * A content factory is a list of components that encourage users to execute actions
 */
export const ContentFactorySchema = z.object({
  name: z.string(),
  purpose: todo(z.string()),
  components: z.array(ComponentSchema),
})

export type ContentFactory = z.infer<typeof ContentFactorySchema>

export function getContentFactoryUid(contentFactory: ContentFactory) {
  return JSON.stringify([contentFactory.name])
}

// A content factory is "valid" if it actually produces the desired actions
export function isValid(call: Call, factory: ContentFactory) {
  return !!factory.components.find(c => c.listeners.find(l => funcMatchesCall(call, l)))
}

export function funcMatchesCall(call: Call, func: Func) {
  throw impl()
}
