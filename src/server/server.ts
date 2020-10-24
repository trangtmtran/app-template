import {
  DayOfWeek,
  OpeningHoursByDays,
  OpeningHoursInASingleDay,
} from '../common/models/openingHours'
import openingHoursByDays from './data.json'

export const getOpeningHoursInAWeek = (): OpeningHoursInASingleDay[] | null => {
  if (typeof openingHoursByDays !== 'object') {
    throw new Error('Unexpected swap request response, not an object')
  } else {
    const filteredAndSortedOpeningHours = filterAndSortOpeningHours(
      openingHoursByDays as OpeningHoursByDays
    )
    return filteredAndSortedOpeningHours
  }
}

const getOpeningHoursIn7Days = (
  openingHoursByDays: OpeningHoursByDays
): OpeningHoursInASingleDay[] | null => {
  const openingHours = Object.entries(openingHoursByDays).map(
    (dayWithOpeningHours) => {
      const isValidDay = Object.values(DayOfWeek).find(
        (day) => day === dayWithOpeningHours[0]
      )
      if (isValidDay) {
        const weekDay = dayWithOpeningHours[0] as DayOfWeek
        const openingHours = dayWithOpeningHours[1]
        return { weekDay, openingHours }
      }
      return null
    }
  )

  const openingHoursIn7Days: OpeningHoursInASingleDay[] = openingHours.filter(
    (openingHour): openingHour is OpeningHoursInASingleDay =>
      openingHour !== null && openingHour.hasOwnProperty('weekDay')
  )

  if (openingHoursIn7Days.length !== 7) {
    return null
  }

  return openingHoursIn7Days
}

const sortOpeningHoursByDayInWeek = (
  openingHoursIn7Days: OpeningHoursInASingleDay[]
): OpeningHoursInASingleDay[] => {
  const weekdayOrder = Object.values(DayOfWeek)
  const sortedOpeningHours = openingHoursIn7Days.sort(
    (a, b) => weekdayOrder.indexOf(a.weekDay) - weekdayOrder.indexOf(b.weekDay)
  )
  return sortedOpeningHours
}

const filterAndSortOpeningHours = (
  openingHoursByDays: OpeningHoursByDays
): OpeningHoursInASingleDay[] | null => {
  const openingHoursIn7Days = getOpeningHoursIn7Days(openingHoursByDays)
  const sortedOpeningHours = openingHoursIn7Days
    ? sortOpeningHoursByDayInWeek(openingHoursIn7Days)
    : null
  return sortedOpeningHours
}
