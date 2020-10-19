import { OpeningHoursInAWeek } from '../common/models/openingHours'
import openingHoursData from './data.json'

export const getOpeningHoursData = (): OpeningHoursInAWeek => {
  return openingHoursData
}