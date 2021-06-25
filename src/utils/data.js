export function toLocalFormatData(responseData) {
  if (responseData === null) return []
  return Object.keys(responseData).map((key) => ({
    ...responseData[key],
    id: key.toString()
  }))
}
