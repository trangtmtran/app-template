import moment from 'moment'
import {
  HOUR_IN_SECONDS,
  MAX_SECONDS_VALUE,
  MINUTE_IN_SECONDS,
} from '../../common/constants'
import { Meridiem } from '../../common/typings/timeCalculationTypes'

const convertSecondsToHours = (seconds: number): number => {
  return seconds / HOUR_IN_SECONDS
}

const getMinutesRemainderInSeconds = (seconds: number): number => {
  return seconds % HOUR_IN_SECONDS
}

const convertSecondsToMinutesPart = (seconds: number): number => {
  const minutesRemainderInSeconds = getMinutesRemainderInSeconds(seconds)
  const minutes = minutesRemainderInSeconds / MINUTE_IN_SECONDS
  const minutesQuotient = Math.floor(minutes)
  return minutesQuotient
}

const convertSecondsToSecondsPart = (seconds: number): number => {
  const minutesRemainderInSeconds = getMinutesRemainderInSeconds(seconds)
  const secondsRemainder = minutesRemainderInSeconds % MINUTE_IN_SECONDS
  return secondsRemainder
}

const convertTo12HoursTimeStr = (hours: number): string => {
  return moment(hours, 'hour').format('h')
}

const getMeridiemStringFromHours = (hours: number): Meridiem => {
  const meridiem = hours >= 12 ? Meridiem.PM : Meridiem.AM
  return meridiem
}

const getOpeningHoursTemplate = (
  hours: string,
  minutes: number,
  seconds: number,
  meridiem: string
): string => {
  const hoursMinutesTemplate = `${hours}:${minutes} ${meridiem}`
  const hoursOnlyTemplate = `${hours} ${meridiem}`
  const hoursMinutesSecondsTemplate = `${hours}:${minutes}:${seconds} ${meridiem}`
  if (seconds) {
    return hoursMinutesSecondsTemplate
  } else if (minutes) {
    return hoursMinutesTemplate
  } else {
    return hoursOnlyTemplate
  }
}

const getOpeningHoursStringFromSeconds = (seconds: number): string => {
  const invalidSecondsInput = seconds < 0 || seconds > MAX_SECONDS_VALUE
  if (invalidSecondsInput) {
    return 'invalid seconds input'
  }
  const hours = convertSecondsToHours(seconds)
  const formattedHours = convertTo12HoursTimeStr(hours)
  const minutesPart = convertSecondsToMinutesPart(seconds)
  const secondsPart = convertSecondsToSecondsPart(seconds)
  const meridiem = getMeridiemStringFromHours(hours)
  const openingHours = getOpeningHoursTemplate(
    formattedHours,
    minutesPart,
    secondsPart,
    meridiem
  )
  return openingHours
}

export { convertSecondsToHours, getOpeningHoursStringFromSeconds }
