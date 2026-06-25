import type { SolutionType, SolverStateType } from '@types'

export class BallSortSolver {
  capacities: number[]

  constructor(capacities: number[]) {
    this.capacities = capacities
  }

  isSolved(state: SolverStateType): boolean {
    const seenColors = new Set<string>()

    for (let i = 0; i < state.length; i++) {
      const tube = state[i]
      if (tube.length === 0) continue

      const firstColor = tube[0]

      // 1. All balls in this tube must be of the same color
      const isUniform = tube.every((ball) => ball === firstColor)
      if (!isUniform) return false

      // 2. This color must not have appeared in any other tube (each color should be contained in only one tube)
      if (seenColors.has(firstColor)) return false
      seenColors.add(firstColor)
    }

    return true
  }

  serialize(state: SolverStateType): string {
    // Group tubes by their capacities to avoid mixing tubes of different capacities when sorting
    const capacityGroups: Record<number, string[]> = {}

    for (let i = 0; i < state.length; i++) {
      const cap = this.capacities[i]
      if (!capacityGroups[cap]) capacityGroups[cap] = []
      capacityGroups[cap].push(state[i].join(','))
    }

    const serializedParts = []
    const sortedCaps = Object.keys(capacityGroups)
      .map(Number)
      .sort((a, b) => a - b)

    for (const cap of sortedCaps) {
      capacityGroups[cap].sort() // Sort only tubes with the same capacity
      serializedParts.push(`C${cap}:[${capacityGroups[cap].join('|')}]`)
    }

    return serializedParts.join('-')
  }

  isValidMove(state: SolverStateType, fromIdx: number, toIdx: number): boolean {
    if (fromIdx === toIdx) return false

    const fromTube = state[fromIdx]
    const toTube = state[toIdx]

    if (fromTube.length === 0) return false // Empty tube can't be source
    if (toTube.length === this.capacities[toIdx]) return false // Full destination tube

    if (toTube.length === 0) {
      const isUniform = fromTube.every((b) => b === fromTube[0])

      if (isUniform) {
        // Don't allow moving a tube that is uniform in color to an empty tube of the same capacity (as it would be a waste of time)
        // But allow moving to a tube of different capacity to open up space in larger/smaller tubes
        if (this.capacities[fromIdx] === this.capacities[toIdx]) {
          return false
        }
      }
      return true
    }

    // The top colors must match
    const topFrom = fromTube[fromTube.length - 1]
    const topTo = toTube[toTube.length - 1]

    return topFrom === topTo
  }

  solve(initialState: SolverStateType): SolutionType | null {
    const queue: Array<{ state: SolverStateType; moves: SolutionType }> = [
      { state: initialState, moves: [] },
    ]
    const visited = new Set<string>()
    visited.add(this.serialize(initialState))

    while (queue.length > 0) {
      const current = queue.shift()
      if (!current) break
      const { state, moves } = current

      if (this.isSolved(state)) return moves

      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
          if (this.isValidMove(state, i, j)) {
            // Simulate the move in chunks (move all consecutive balls of the same color that the destination can accommodate)
            const newState = state.map((tube) => [...tube])
            const fromTube = newState[i]
            const toTube = newState[j]

            const topColor = fromTube[fromTube.length - 1]

            // Count how many balls of the same color are consecutive at the top
            let chunkCount = 0
            for (let k = fromTube.length - 1; k >= 0; k--) {
              if (fromTube[k] === topColor) chunkCount++
              else break
            }

            const availableSpace = this.capacities[j] - toTube.length
            const ballsToMove = Math.min(chunkCount, availableSpace)

            // Move the balls from the source tube to the destination tube
            for (let k = 0; k < ballsToMove; k++) {
              const ball = fromTube.pop()
              if (ball) toTube.push(ball)
            }

            const serialized = this.serialize(newState)

            if (!visited.has(serialized)) {
              visited.add(serialized)
              queue.push({
                state: newState,
                // Save this move as 1 Move for the user (because in the game, when you press move once, it moves the whole chunk)
                moves: [...moves, { from: i, to: j, hex: topColor }],
              })
            }
          }
        }
      }
    }
    return null
  }
}
