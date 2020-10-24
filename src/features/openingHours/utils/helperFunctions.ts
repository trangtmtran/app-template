function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  const newArray = []
  const arrayLength = array.length
  for (let i = 0; i < arrayLength; i += chunkSize)
    newArray.push(array.slice(i, i + chunkSize))
  return newArray
}

export { splitArrayIntoChunks }
