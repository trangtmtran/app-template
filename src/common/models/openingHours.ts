import { DayOfWeek } from '../typings/apiTypes'

interface OpeningHoursStringInASingleDay {
  weekDay: DayOfWeek
  openingHours: string[]
}

export type { OpeningHoursStringInASingleDay }
