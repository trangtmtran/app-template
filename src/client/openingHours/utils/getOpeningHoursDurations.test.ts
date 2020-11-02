import { CLOSED, MISSING_INFO } from '../../../common/constants'
import { DayOfWeek, OpeningType } from '../../../common/typings/apiTypes'
import { getOpeningHoursDurations } from './getOpeningHoursDurations'

describe('getOpeningHoursDurations', () => {
  it('should return CLOSED when days are closed', () => {
    const testData = [
      { weekDay: DayOfWeek.monday, openingHours: [] },
      { weekDay: DayOfWeek.tuesday, openingHours: [] },
      { weekDay: DayOfWeek.wednesday, openingHours: [] },
      { weekDay: DayOfWeek.thursday, openingHours: [] },
      { weekDay: DayOfWeek.friday, openingHours: [] },
      { weekDay: DayOfWeek.saturday, openingHours: [] },
      { weekDay: DayOfWeek.sunday, openingHours: [] },
    ]

    const result = getOpeningHoursDurations(testData)
    const expectedResult = [
      { weekDay: DayOfWeek.monday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.tuesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.wednesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.thursday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.friday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.saturday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.sunday, openingHours: [CLOSED] },
    ]

    expect(result).toEqual(expectedResult)
  })

  it('should return missing info test when there is no matching closing time', () => {
    const testData = [
      {
        weekDay: DayOfWeek.monday,
        openingHours: [{ type: OpeningType.open, value: 3600 }],
      },
      { weekDay: DayOfWeek.tuesday, openingHours: [] },
      { weekDay: DayOfWeek.wednesday, openingHours: [] },
      { weekDay: DayOfWeek.thursday, openingHours: [] },
      { weekDay: DayOfWeek.friday, openingHours: [] },
      { weekDay: DayOfWeek.saturday, openingHours: [] },
      { weekDay: DayOfWeek.sunday, openingHours: [] },
    ]

    const result = getOpeningHoursDurations(testData)
    const expectedResult = [
      { weekDay: DayOfWeek.monday, openingHours: [MISSING_INFO] },
      { weekDay: DayOfWeek.tuesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.wednesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.thursday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.friday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.saturday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.sunday, openingHours: [CLOSED] },
    ]

    expect(result).toEqual(expectedResult)
  })

  it('should return CLOSED on the day that only has closing time', () => {
    const testData = [
      {
        weekDay: DayOfWeek.monday,
        openingHours: [{ type: OpeningType.open, value: 84000 }],
      },
      {
        weekDay: DayOfWeek.tuesday,
        openingHours: [{ type: OpeningType.close, value: 3600 }],
      },
      { weekDay: DayOfWeek.wednesday, openingHours: [] },
      { weekDay: DayOfWeek.thursday, openingHours: [] },
      { weekDay: DayOfWeek.friday, openingHours: [] },
      { weekDay: DayOfWeek.saturday, openingHours: [] },
      { weekDay: DayOfWeek.sunday, openingHours: [] },
    ]

    const result = getOpeningHoursDurations(testData)
    const expectedResult = [
      { weekDay: DayOfWeek.monday, openingHours: ['11:20 PM - 1 AM'] },
      { weekDay: DayOfWeek.tuesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.wednesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.thursday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.friday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.saturday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.sunday, openingHours: [CLOSED] },
    ]

    expect(result).toEqual(expectedResult)
  })

  it('should return transition time when previous day has no closing time', () => {
    const testData = [
      {
        weekDay: DayOfWeek.monday,
        openingHours: [{ type: OpeningType.open, value: 84000 }],
      },
      {
        weekDay: DayOfWeek.tuesday,
        openingHours: [
          { type: OpeningType.close, value: 3600 },
          { type: OpeningType.open, value: 36000 },
        ],
      },
      {
        weekDay: DayOfWeek.wednesday,
        openingHours: [{ type: OpeningType.close, value: 3600 }],
      },
      { weekDay: DayOfWeek.thursday, openingHours: [] },
      { weekDay: DayOfWeek.friday, openingHours: [] },
      { weekDay: DayOfWeek.saturday, openingHours: [] },
      { weekDay: DayOfWeek.sunday, openingHours: [] },
    ]

    const result = getOpeningHoursDurations(testData)
    const expectedResult = [
      { weekDay: DayOfWeek.monday, openingHours: ['11:20 PM - 1 AM'] },
      { weekDay: DayOfWeek.tuesday, openingHours: ['10 AM - 1 AM'] },
      { weekDay: DayOfWeek.wednesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.thursday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.friday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.saturday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.sunday, openingHours: [CLOSED] },
    ]

    expect(result).toEqual(expectedResult)
  })

  it('should return transition opening hours from sunday to monday', () => {
    const testData = [
      {
        weekDay: DayOfWeek.monday,
        openingHours: [{ type: OpeningType.close, value: 3600 }],
      },
      { weekDay: DayOfWeek.tuesday, openingHours: [] },
      { weekDay: DayOfWeek.wednesday, openingHours: [] },
      { weekDay: DayOfWeek.thursday, openingHours: [] },
      { weekDay: DayOfWeek.friday, openingHours: [] },
      { weekDay: DayOfWeek.saturday, openingHours: [] },
      {
        weekDay: DayOfWeek.sunday,
        openingHours: [{ type: OpeningType.open, value: 82800 }],
      },
    ]

    const result = getOpeningHoursDurations(testData)
    const expectedResult = [
      { weekDay: DayOfWeek.monday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.tuesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.wednesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.thursday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.friday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.saturday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.sunday, openingHours: ['11 PM - 1 AM'] },
    ]

    expect(result).toEqual(expectedResult)
  })

  it('should return multiple opening hours in one day', () => {
    const testData = [
      {
        weekDay: DayOfWeek.monday,
        openingHours: [{ type: OpeningType.close, value: 3600 }],
      },
      {
        weekDay: DayOfWeek.tuesday,
        openingHours: [
          { type: OpeningType.open, value: 36000 },
          { type: OpeningType.close, value: 50400 },
          { type: OpeningType.close, value: 57600 },
          { type: OpeningType.close, value: 63000 },
          { type: OpeningType.close, value: 68000 },
          { type: OpeningType.close, value: 80400 },
        ],
      },
      { weekDay: DayOfWeek.wednesday, openingHours: [] },
      { weekDay: DayOfWeek.thursday, openingHours: [] },
      { weekDay: DayOfWeek.friday, openingHours: [] },
      { weekDay: DayOfWeek.saturday, openingHours: [] },
      {
        weekDay: DayOfWeek.sunday,
        openingHours: [{ type: OpeningType.open, value: 82800 }],
      },
    ]

    const result = getOpeningHoursDurations(testData)
    const expectedResult = [
      { weekDay: DayOfWeek.monday, openingHours: [CLOSED] },
      {
        weekDay: DayOfWeek.tuesday,
        openingHours: [
          '10 AM - 2 PM',
          '4 PM - 5:30 PM',
          '6:53:20 PM - 10:20 PM',
        ],
      },
      { weekDay: DayOfWeek.wednesday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.thursday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.friday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.saturday, openingHours: [CLOSED] },
      { weekDay: DayOfWeek.sunday, openingHours: ['11 PM - 1 AM'] },
    ]

    expect(result).toEqual(expectedResult)
  })
})
