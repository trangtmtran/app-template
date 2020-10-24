enum DayInWeek {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

enum OpeningType {
  open = 'open',
  close = 'close',
}

type CloseHour = {
  type: OpeningType.close
  value: number
}

type OpenHour = {
  type: OpeningType.open
  value: number
}

type ClosedDay = []

type OpeningHour = CloseHour | OpenHour

type OpeningHours = OpeningHour[] | ClosedDay

type OpeningHoursByDays = {
  [dayInWeek in DayInWeek]: OpeningHours
}

interface OpeningHoursInASingleDay {
  weekDay: DayInWeek
  openingHours: OpeningHours
}

export { DayInWeek, OpeningType }
export type { OpeningHour, OpeningHours, OpeningHoursByDays, OpeningHoursInASingleDay }
