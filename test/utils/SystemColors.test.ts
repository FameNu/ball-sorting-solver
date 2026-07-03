import { SYSTEM_COLORS } from '@utils/systemColors'

describe('SystemColors', () => {
  it('exports 12 system colors', () => {
    expect(SYSTEM_COLORS).toHaveLength(12)
  })

  it('keeps the first and last color names stable', () => {
    expect(SYSTEM_COLORS[0]).toMatchObject({
      id: 'c1',
      name: 'Red',
      hex: '#FE5658',
      insideColor: { name: 'Inner Red', hex: '#D13F40' },
    })

    expect(SYSTEM_COLORS[11]).toMatchObject({
      id: 'c12',
      name: 'White',
      hex: '#E7F1F3',
      insideColor: { name: 'Inner White', hex: '#CAD2DF' },
    })
  })

  it('keeps the color names and hex values stable', () => {
    const expectedColors = [
      { name: 'Red', hex: '#FE5658', insideColor: { name: 'Inner Red', hex: '#D13F40' } },
      { name: 'Dark Red', hex: '#872E2B', insideColor: { name: 'Inner Dark Red', hex: '#691918' } },
      { name: 'Light Green', hex: '#4BCD49', insideColor: { name: 'Inner Light Green', hex: '#20A41D' } },
      { name: 'Dark Green', hex: '#719883', insideColor: { name: 'Inner Dark Green', hex: '#295546' } },
      { name: 'Blue', hex: '#3673E2', insideColor: { name: 'Inner Blue', hex: '#1B56CA' } },
      { name: 'Light Blue', hex: '#1DB4D3', insideColor: { name: 'Inner Light Blue', hex: '#048BA9' } },
      { name: 'Purple', hex: '#7C2CB1', insideColor: { name: 'Inner Purple', hex: '#A23DE5' } },
      { name: 'Light Purple', hex: '#B9ABE1', insideColor: { name: 'Inner Light Purple', hex: '#8070AF' } },
      { name: 'Pink', hex: '#FFA2A3', insideColor: { name: 'Inner Pink', hex: '#E66B6D' } },
      { name: 'Orange', hex: '#F9992B', insideColor: { name: 'Inner Orange', hex: '#C06D0F' } },
      { name: 'Beige', hex: '#E0BB8F', insideColor: { name: 'Inner Beige', hex: '#C08F55' } },
      { name: 'White', hex: '#E7F1F3', insideColor: { name: 'Inner White', hex: '#CAD2DF' } },
    ]

    expectedColors.forEach((expectedColor, index) => {
      const actualColor = SYSTEM_COLORS[index]
      const actualColorInsideColor = actualColor.insideColor
      expect(actualColor.name).toBe(expectedColor.name)
      expect(actualColor.hex).toBe(expectedColor.hex)
      expect(actualColorInsideColor.name).toEqual(expectedColor.insideColor.name)
      expect(actualColorInsideColor.hex).toEqual(expectedColor.insideColor.hex)
    })
  })
})
