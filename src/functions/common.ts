export const isEqual = <T>(target: T, to: T) => Object.is(target, to)
export const isLess = (target: number, than: number) => target < than
export const isMore = (target: number, than: number) => target > than
export const isEqualOrLess = (target: number, than: number) => target <= than
export const isEqualOrMore = (target: number, than: number) => target >= than

export const isPositive = (target: number) => target > 0
export const isNegative = (target: number) => target < 0

export const clamp = (value: number, max: number, min: number) =>
  Math.min(Math.max(value, min), max)

export const generateRandomInteger = (max: number = 1, min: number = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const normalize = (value: number, max: number, min: number = 0) => {
  if (max <= min)
    throw new Error('Maximum value must be greater than minimum value.')
  const result = (value - min) / (max - min)
  return result
}

export const getMinimum = (values: number[]): number => {
  if (values.length === 0) throw new Error('Array cannot be empty.')

  let minimum = Number.MAX_SAFE_INTEGER
  values.forEach((value) => {
    if (minimum > value) minimum = value
  })
  return minimum
}

export const getMaximum = (values: number[]): number => {
  if (values.length === 0) throw new Error('Array cannot be empty.')

  let maximum = Number.MIN_SAFE_INTEGER
  values.forEach((value) => {
    if (maximum < value) maximum = value
  })
  return maximum
}

export const removeSpecialCharacters = (str: string) =>
  str.replace(/[^a-zA-Z0-9\s]/g, '')

export const shallowCopy = <T extends object>(original: T) => {
  if (Array.isArray(original)) return original.slice(0) as T
  return Object.assign({}, original)
}

export const getRandomIntegerInRange = (standard: number, offset: number) => {
  const max = standard + offset
  const min = standard - offset
  return Math.floor(Math.random() * (max - min + 1)) + min
}
