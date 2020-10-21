import { OpeningHoursInAWeek } from '../common/models/openingHours'
import openingHoursByDays from './data.json'

export const getOpeningHoursByDays = () => {
  if (typeof openingHoursByDays !== 'object') {
    throw new Error('Unexpected swap request response, not an object')
  } else {
    return openingHoursByDays as OpeningHoursInAWeek
  }
}
