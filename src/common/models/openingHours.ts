export enum DayInWeek {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday'
}

export enum OpeningType {
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

export type OpeningHour = CloseHour | OpenHour

type OpeningHours = OpeningHour[]

export type OpeningHoursInAWeek = {
  [dayInWeek in DayInWeek]: OpeningHours
}