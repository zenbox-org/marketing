import { z } from 'zod'
import { UrlSchema } from '../../generic/models/Url'
import { Id } from '../../generic/models/Id'

export const LocationSchema = UrlSchema

export type Location = z.infer<typeof LocationSchema>

export function validateLocation(location: Location) {
  return LocationSchema.parse(location)
}

export function getLocationUid(location: Location): Id {
  return location
}
