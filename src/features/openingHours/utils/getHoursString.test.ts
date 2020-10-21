import { getHoursStringFromSeconds } from './getHoursString'

describe('getHoursStringFromSeconds', () => {
  it('should return invalid message when seconds is less than 0', () => {
    const result = getHoursStringFromSeconds(-999)
    expect(result).toBe('invalid seconds input')
  })

  it('should return invalid message when seconds is more than 86399 (max value of seconds in one day)', () => {
    const result = getHoursStringFromSeconds(90000)
    expect(result).toBe('invalid seconds input')
  })

  it('should return 1 AM when second = 3600', () => {
    const result = getHoursStringFromSeconds(3600)
    expect(result).toEqual('1 AM')
  })

  it('should return 8:30 PM when seconds = 73800', () => {
    const result = getHoursStringFromSeconds(73800)
    expect(result).toEqual('8:30 PM')
  })

  it('should return 8:10 PM when seconds = 72600', () => {
    const result = getHoursStringFromSeconds(72600)
    expect(result).toEqual('8:10 PM')
  })

  it('should return 12:30 PM when seconds = 45000', () => {
    const result = getHoursStringFromSeconds(45000)
    expect(result).toEqual('12:30 PM')
  })

  it('should return 12 PM when seconds = 43200', () => {
    const result = getHoursStringFromSeconds(43200)
    expect(result).toEqual('12 PM')
  })

  it('should return 9 AM when seconds = 32400', () => {
    const result = getHoursStringFromSeconds(32400)
    expect(result).toEqual('9 AM')
  })

  it('should return 10:30 AM when seconds = 37800', () => {
    const result = getHoursStringFromSeconds(37800)
    expect(result).toEqual('10:30 AM')
  })

  it('should return 11:59:59 PM when seconds = 37800', () => {
    const result = getHoursStringFromSeconds(86399)
    expect(result).toEqual('11:59:59 PM')
  })
})
