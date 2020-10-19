import moment from 'moment'

const HOUR_IN_SECONDS = 3600
const MINUTE_IN_SECONDS = 60

const secondsToHours = (seconds: number): number => {
  return seconds / HOUR_IN_SECONDS
}

const getMinutesRemainderInSeconds = (seconds: number): number => {
  return seconds % HOUR_IN_SECONDS
}

const secondsToMinutesPart = (seconds: number): number => {
  const minutesRemainderInSeconds = getMinutesRemainderInSeconds(seconds)
  const minutes = minutesRemainderInSeconds / MINUTE_IN_SECONDS
  const minutesQuotient = Math.floor(minutes)
  return minutesQuotient
}

const secondsToSecondsPart = (seconds: number): number => {
  const minutesRemainderInSeconds = getMinutesRemainderInSeconds(seconds)
  const secondsRemainder = minutesRemainderInSeconds % MINUTE_IN_SECONDS
  return secondsRemainder
}

const formattedHoursTo12HoursTime = (hours: number): string => {
  return moment(hours, 'hour').format('h')
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

const secondsToMeridiemTimeString = (seconds: number): string => {
  const hours = secondsToHours(seconds)
  const formattedHours = formattedHoursTo12HoursTime(hours)
  const minutesPart = secondsToMinutesPart(seconds)
  const secondsPart = secondsToSecondsPart(seconds)
  const meridiem = hours >= 12 ? 'PM' : 'AM'
  const openingHours = getOpeningHoursTemplate(
    formattedHours,
    minutesPart,
    secondsPart,
    meridiem
  )
  return openingHours
}

export { secondsToHours, secondsToMeridiemTimeString }
