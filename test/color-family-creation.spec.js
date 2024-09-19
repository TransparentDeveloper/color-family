/**
 * @file color-family-creation.spec.js
 * @description This file contains test cases for the ColorFamily class.
 *
 * The tests cover various scenarios for creating instances of ColorFamily:
 * - Creating an instance with no arguments
 * - Creating an instance with a base color string
 * - Creating an instance with a 6-character HEX code
 * - Creating an instance with an 8-character HEX code
 */

const { ColorFamily } = require('../dist/cjs/index.js')

const HEX6_REGEX = /^#[0-9A-Fa-f]{6}$/
const HEX8_REGEX = /^#[0-9A-Fa-f]{8}$/

describe('When creating an instance with no arguments', () => {
  let colorFamily

  beforeEach(() => {
    colorFamily = new ColorFamily()
  })

  it('should return a valid 6-character HEX code', () => {
    const hexCode6 = colorFamily.getHexCode()
    expect(hexCode6).toMatch(HEX6_REGEX)
  })

  it('should return a valid 8-character HEX code when requested', () => {
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8).toMatch(HEX8_REGEX)
  })

  it('should have the same first 6 characters in the 8-character HEX code as in the 6-character HEX code', () => {
    const hexCode6 = colorFamily.getHexCode()
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8.slice(0, 7)).toBe(hexCode6)
  })

  it('should return an 8-character HEX code ending with "ff" for alpha', () => {
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8.slice(-2)).toBe('ff')
  })
})

describe('When creating an instance with a BaseColor like "red"', () => {
  let parameter
  let colorFamily

  beforeEach(() => {
    parameter = 'red'
    colorFamily = new ColorFamily(parameter)
  })

  it('should return a valid 6-character HEX code', () => {
    const hexCode6 = colorFamily.getHexCode()
    expect(hexCode6).toMatch(HEX6_REGEX)
  })

  it('should return a valid 8-character HEX code when requested', () => {
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8).toMatch(HEX8_REGEX)
  })

  it('should have the same first 6 characters in the 8-character HEX code as in the 6-character HEX code', () => {
    const hexCode6 = colorFamily.getHexCode()
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8.slice(0, 7)).toBe(hexCode6)
  })

  it('should return an 8-character HEX code ending with "ff" for alpha', () => {
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8.slice(-2)).toBe('ff')
  })
})

describe('When creating an instance with a 6-character HEX code like "#123456"', () => {
  let parameter
  let colorFamily

  beforeEach(() => {
    parameter = '#123456'
    colorFamily = new ColorFamily(parameter)
  })

  it('should return a valid 6-character HEX code', () => {
    const hexCode6 = colorFamily.getHexCode()
    expect(hexCode6).toMatch(HEX6_REGEX)
  })

  it('should return a valid 8-character HEX code when requested', () => {
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8).toMatch(HEX8_REGEX)
  })

  it('should have the same first 6 characters in the 8-character HEX code as in the 6-character HEX code', () => {
    const hexCode6 = colorFamily.getHexCode()
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8.slice(0, 7)).toBe(hexCode6)
  })

  it('should return an 8-character HEX code ending with "ff" for alpha', () => {
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8.slice(-2)).toBe('ff')
  })

  it('should return a valid 6-character HEX code that matches the provided value', () => {
    const hexCode6 = colorFamily.getHexCode()
    expect(hexCode6).toBe(parameter)
  })
})

describe('When creating an instance with an 8-character HEX code like "#12345678"', () => {
  let parameter
  let colorFamily

  beforeEach(() => {
    parameter = '#12345678'
    colorFamily = new ColorFamily(parameter)
  })

  it('should return a valid 6-character HEX code', () => {
    const hexCode6 = colorFamily.getHexCode()
    expect(hexCode6).toMatch(HEX6_REGEX)
  })

  it('should return a valid 8-character HEX code when requested', () => {
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8).toMatch(HEX8_REGEX)
  })

  it('should have the same first 6 characters in the 8-character HEX code as in the 6-character HEX code', () => {
    const hexCode6 = colorFamily.getHexCode()
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8.slice(0, 7)).toBe(hexCode6)
  })

  it('should return a valid 8-character HEX code that matches the provided value', () => {
    const hexCode8 = colorFamily.getHexCode('hexCode8')
    expect(hexCode8).toBe(parameter)
  })
})
