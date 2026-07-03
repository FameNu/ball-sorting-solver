import { BallSortSolver } from '@utils/solver'

const RED_HEX = '#FE5658'
const GREEN_HEX = '#4BCD49'

describe('BallSortSolver', () => {
  describe('constructor', () => {
    it('should initialize capacities correctly', () => {
      const capacities = [4, 4, 4]
      const solver = new BallSortSolver(capacities)
      expect(solver.capacities).toEqual(capacities)
    })

    it('should handle empty capacities', () => {
      const capacities: number[] = []
      const solver = new BallSortSolver(capacities)
      expect(solver.capacities).toEqual(capacities)
    })

    it('should handle varying capacities', () => {
      const capacities = [3, 5, 2]
      const solver = new BallSortSolver(capacities)
      expect(solver.capacities).toEqual(capacities)
    })
  })

  describe('isSolved', () => {
    it('should return true for a solved state', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, RED_HEX, RED_HEX, RED_HEX], [GREEN_HEX, GREEN_HEX, GREEN_HEX, GREEN_HEX]]
      expect(solver.isSolved(state)).toBe(true)
    })

    it('should return false for an unsolved state with mixed colors in a tube', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, GREEN_HEX, RED_HEX, RED_HEX], [GREEN_HEX, GREEN_HEX, GREEN_HEX, GREEN_HEX]]
      expect(solver.isSolved(state)).toBe(false)
    })

    it('should return false for an unsolved state with the same color in multiple tubes', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, RED_HEX, RED_HEX, RED_HEX], [RED_HEX, RED_HEX, RED_HEX, RED_HEX]]
      expect(solver.isSolved(state)).toBe(false)
    })

    it('should return true for an empty state', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state: string[][] = [[], []]
      expect(solver.isSolved(state)).toBe(true)
    })
  })

  describe('serialize', () => {
    it('should serialize a state correctly', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, RED_HEX, RED_HEX, RED_HEX], [GREEN_HEX, GREEN_HEX, GREEN_HEX, GREEN_HEX]]
      expect(solver.serialize(state)).toBe('C4:[#4BCD49,#4BCD49,#4BCD49,#4BCD49|#FE5658,#FE5658,#FE5658,#FE5658]')
    })

    it('should handle empty tubes in serialization', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, RED_HEX, RED_HEX, RED_HEX], []]
      expect(solver.serialize(state)).toBe('C4:[|#FE5658,#FE5658,#FE5658,#FE5658]')
    })

    it('should handle varying capacities in serialization', () => {
      const capacities = [3, 5]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, RED_HEX, RED_HEX], [GREEN_HEX, GREEN_HEX, GREEN_HEX, GREEN_HEX, GREEN_HEX]]
      expect(solver.serialize(state)).toBe('C3:[#FE5658,#FE5658,#FE5658]-C5:[#4BCD49,#4BCD49,#4BCD49,#4BCD49,#4BCD49]')
    })
  })

  describe('isValidMove', () => {
    it('should return false for a move from an empty tube', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[], [GREEN_HEX, GREEN_HEX, GREEN_HEX, GREEN_HEX]]
      expect(solver.isValidMove(state, 0, 1)).toBe(false)
    })

    it('should return false for a move to a full tube', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, RED_HEX, RED_HEX, RED_HEX], [GREEN_HEX, GREEN_HEX, GREEN_HEX, GREEN_HEX]]
      expect(solver.isValidMove(state, 0, 1)).toBe(false)
    })

    it('should return true for a valid move', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, RED_HEX, RED_HEX], [GREEN_HEX, GREEN_HEX, RED_HEX]]
      expect(solver.isValidMove(state, 0, 1)).toBe(true)
    })

    it('should return true when moving a uniform tube to an empty tube of different capacity', () => {
      const capacities = [3, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, RED_HEX, RED_HEX], []]
      expect(solver.isValidMove(state, 0, 1)).toBe(true)
    })
  })

  describe('solve', () => {
    it('should return a solution for a solvable state', () => {
      const capacities = [4, 4, 5]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, GREEN_HEX, RED_HEX, RED_HEX], [GREEN_HEX, GREEN_HEX, GREEN_HEX, GREEN_HEX], []]
      const solution = solver.solve(state)
      expect(solution).not.toBeNull()
    })

    it('should return null for an unsolvable state', () => {
      const capacities = [4, 4]
      const solver = new BallSortSolver(capacities)
      const state = [[RED_HEX, GREEN_HEX, RED_HEX, RED_HEX], [GREEN_HEX, GREEN_HEX, GREEN_HEX]]
      const solution = solver.solve(state)
      expect(solution).toBeNull()
    })
  })
})
