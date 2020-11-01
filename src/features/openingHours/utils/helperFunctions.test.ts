import { DayOfWeek } from '../../../common/typings/apiTypes'
import { isToday, splitArrayIntoChunks } from './helperFunctions'

describe('splitArrayIntoChunks', () => {
  it('should return correct array with flat test array and chunk size = 2', () => {
    const testArray = [1, 2, 3, 4, 5]
    const result = splitArrayIntoChunks(testArray, 2)
    const expectedResult = [[1, 2], [3, 4], [5]]
    expect(result).toEqual(expectedResult)
  })

  it('should return correct array with flat test array and chunk size = 3', () => {
    const testArray = [1, 2, 3, 4, 5]
    const result = splitArrayIntoChunks(testArray, 3)
    const expectedResult = [
      [1, 2, 3],
      [4, 5],
    ]
    expect(result).toEqual(expectedResult)
  })

  it('should return correct array with test array depth = 2 and chunk size = 2', () => {
    const testArray = [1, [2, 3], 4, 5]
    const result = splitArrayIntoChunks(testArray, 2)
    const expectedResult = [
      [1, [2, 3]],
      [4, 5],
    ]
    expect(result).toEqual(expectedResult)
  })
})

describe('isToday', () => {
  it('should return false if today is not wednesday', () => {
    const today = DayOfWeek.monday
    const weekday = DayOfWeek.wednesday
    expect(isToday(today, weekday)).toBe(false)
  })

  it('should return false if today is not a valid day', () => {
    const today = 'something else' as DayOfWeek
    const weekday = DayOfWeek.wednesday
    expect(isToday(today, weekday)).toBe(false)
  })

  it('should return true if today is not a valid enum DayOfWeek but value = wednesday string', () => {
    const today = 'wednesday' as DayOfWeek
    const weekday = DayOfWeek.wednesday
    expect(isToday(today, weekday)).toBe(true)
  })

  it('should return true if today is wednesday', () => {
    const today = DayOfWeek.wednesday
    const weekday = DayOfWeek.wednesday
    expect(isToday(today, weekday)).toBe(true)
  })
})
