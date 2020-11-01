enum DayOfWeek {
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

type OpeningHour = CloseHour | OpenHour

type WorkingDay = OpeningHour[]
const ClosedDay: OpeningHour[] = []

type OpeningHours = WorkingDay | typeof ClosedDay

type OpeningHoursByDays = {
  [dayInWeek in DayOfWeek]: OpeningHours
}

interface OpeningHoursInASingleDay {
  weekDay: DayOfWeek
  openingHours: OpeningHours
}

export { DayOfWeek, OpeningType }
export type {
  OpeningHour,
  OpeningHours,
  OpeningHoursByDays,
  OpeningHoursInASingleDay,
}
