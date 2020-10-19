import { secondsToMeridiemTimeString } from "./helperFunctions"

describe('secondsToMeridiemString', () => {
  it('should return 1 AM when second = 3600', () => {
    const result = secondsToMeridiemTimeString(3600)
    expect(result).toEqual('1 AM')
  })

  it('should return 8:30 PM when seconds = 73800', () => {
    const result = secondsToMeridiemTimeString(73800)
    expect(result).toEqual('8:30 PM')
  })

  it('should return 8:10 PM when seconds = 72600', () => {
    const result = secondsToMeridiemTimeString(72600)
    expect(result).toEqual('8:10 PM')
  })
  
  it('should return 12:30 PM when seconds = 45000', () => {
    const result = secondsToMeridiemTimeString(45000)
    expect(result).toEqual('12:30 PM')
  })

  it('should return 12 PM when seconds = 43200', () => {
    const result = secondsToMeridiemTimeString(43200)
    expect(result).toEqual('12 PM')
  })

  it('should return 9 AM when seconds = 32400', () => {
    const result = secondsToMeridiemTimeString(32400)
    expect(result).toEqual('9 AM')
  })

  it('should return 10:30 AM when seconds = 37800', () => {
    const result = secondsToMeridiemTimeString(37800)
    expect(result).toEqual('10:30 AM')
  })

  it('should return 11:59:59 PM when seconds = 37800', () => {
    const result = secondsToMeridiemTimeString(86399)
    expect(result).toEqual('11:59:59 PM')
  })
})