enum DayInWeek {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday'
}

enum OpeningType {
  open = 'open',
  close = 'close'
}

type CloseHour = {
  type: OpeningType.close | string, //TODO: FIXME
  value: number
}

type OpenHour = {
  type: OpeningType.open | string, //TODO: FIXME
  value: number
}

type OpeningHour = CloseHour | OpenHour

type OpeningHours = OpeningHour[]

type OpeningHoursInAWeek = {
  [dayInWeek in DayInWeek]: OpeningHours
}

export {
  DayInWeek,
  OpeningType
}

export type {
  OpeningHour,
  OpeningHours,
  OpeningHoursInAWeek
}
