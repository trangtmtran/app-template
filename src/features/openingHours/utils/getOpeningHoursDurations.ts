import { CLOSED, MISSING_INFO } from '../../../common/constants'
import { OpeningHoursStringInASingleDay } from '../../../common/models/openingHours'
import {
  OpeningHoursInASingleDay,
  OpeningType,
} from '../../../common/typings/apiTypes'
import { getHoursStringFromSeconds } from './getHoursString'
import { splitArrayIntoChunks } from './helperFunctions'

const getTransitionCloseTime = (
  currentIndex: number,
  openingHoursInAWeek: OpeningHoursInASingleDay[]
) => {
  const monday = openingHoursInAWeek[0]
  const isSunday = currentIndex === 6
  const nextDay = isSunday ? monday : openingHoursInAWeek[currentIndex + 1]
  const closeTime = nextDay.openingHours[0]

  return closeTime
}

const addTransitionCloseTime = (
  openingHoursInAWeek: OpeningHoursInASingleDay[]
): OpeningHoursInASingleDay[] => {
  const openingHoursInAWeekWithAddedTransitionCloseTime = openingHoursInAWeek.map(
    (openingHoursInADay, index) => {
      const { openingHours } = openingHoursInADay
      const lastItem = openingHours[openingHours.length - 1]
      const isLastTimeOpenTime = lastItem
        ? lastItem.type === OpeningType.open
        : false
      if (isLastTimeOpenTime) {
        const closeTime = getTransitionCloseTime(index, openingHoursInAWeek)
        return {
          ...openingHoursInADay,
          openingHours: [...openingHoursInADay.openingHours, closeTime],
        }
      }
      return openingHoursInADay
    }
  )
  return openingHoursInAWeekWithAddedTransitionCloseTime
}

const removeFirstCloseTime = (
  addedTransitionCloseTime: OpeningHoursInASingleDay[]
): OpeningHoursInASingleDay[] => {
  const removedFirstCloseTime = addedTransitionCloseTime.map(
    (openingHoursInADay) => {
      const { openingHours } = openingHoursInADay
      const firstItem = openingHours[0]
      const isFirstItemCloseTime = firstItem
        ? firstItem.type === OpeningType.close
        : false
      if (isFirstItemCloseTime) {
        const openingHoursWithoutFirstItemAsCloseTime = openingHours.filter(
          (openingHour) => openingHour !== firstItem
        )
        return {
          ...openingHoursInADay,
          openingHours: openingHoursWithoutFirstItemAsCloseTime,
        }
      }
      return openingHoursInADay
    }
  )
  return removedFirstCloseTime
}

const convertToOpeningHoursString = (
  removedFirstCloseTime: OpeningHoursInASingleDay[]
): OpeningHoursStringInASingleDay[] => {
  const convertedToOpeningHoursString = removedFirstCloseTime.map(
    (openingHoursInADay) => {
      const { openingHours } = openingHoursInADay

      if (openingHours.length === 0) {
        return { ...openingHoursInADay, openingHours: [CLOSED] }
      } else {
        const groupedOpenAndCloseTime = splitArrayIntoChunks(openingHours, 2)
        const durations = groupedOpenAndCloseTime.map((openAndClosePair) => {
          const [open, close] = openAndClosePair
          if (open === undefined || close === undefined) {
            return MISSING_INFO
          }
          const openTimeString = getHoursStringFromSeconds(open.value)
          const closeTimeString = getHoursStringFromSeconds(close.value)
          return `${openTimeString} - ${closeTimeString}`
        })
        return { ...openingHoursInADay, openingHours: durations }
      }
    }
  )

  return convertedToOpeningHoursString
}

const getOpeningHoursDurations = (
  openingHoursInAWeek: OpeningHoursInASingleDay[] | null
): OpeningHoursStringInASingleDay[] | null => {
  if (openingHoursInAWeek === null) {
    return null
  }

  const addedTransitionCloseTime = addTransitionCloseTime(openingHoursInAWeek)
  const removedFirstCloseTime = removeFirstCloseTime(addedTransitionCloseTime)
  const openingHoursString = convertToOpeningHoursString(removedFirstCloseTime)

  return openingHoursString
}

export { getOpeningHoursDurations }
