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
    })

    expect(SYSTEM_COLORS[11]).toMatchObject({
      id: 'c12',
      name: 'White',
      hex: '#E7F1F3',
    })
  })
})
