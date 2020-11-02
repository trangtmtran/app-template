import { DayOfWeek } from '../../../common/typings/apiTypes'

function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  const newArray = []
  const arrayLength = array.length
  for (let i = 0; i < arrayLength; i += chunkSize)
    newArray.push(array.slice(i, i + chunkSize))
  return newArray
}

const isToday = (
  todayString: DayOfWeek | string,
  dayOfWeek: DayOfWeek
): boolean => {
  return todayString === dayOfWeek
}

export { splitArrayIntoChunks, isToday }
