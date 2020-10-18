export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type OpeningType = 'open' | 'close'

export type OpeningHour = {
  type: OpeningType
  value: Number
}

export type OpeningHours = OpeningHour[]

export type OpeningHoursInAWeek = {
  [dayInWeek in DayOfWeek]: OpeningHours
}