import { z } from 'zod'
import { Id } from '../../generic/models/Id'
import { UrlSchema } from '../../generic/models/Url'

export const LocationSchema = UrlSchema

export type Location = z.infer<typeof LocationSchema>

export function validateLocation(location: Location) {
  return LocationSchema.parse(location)
}

export function getLocationUid(location: Location): Id {
  return location
}
