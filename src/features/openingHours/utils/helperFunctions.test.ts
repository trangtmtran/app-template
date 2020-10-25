import { splitArrayIntoChunks } from "./helperFunctions"

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
    const expectedResult = [[1, 2, 3], [4, 5]]
    expect(result).toEqual(expectedResult)
  })

  it('should return correct array with test array depth = 2 and chunk size = 2', () => {
    const testArray = [1, [2, 3], 4, 5]
    const result = splitArrayIntoChunks(testArray, 2)
    const expectedResult = [[1, [2, 3]], [4, 5]]
    expect(result).toEqual(expectedResult)
  })
})