import type { SolutionType, SolverStateType } from '@types'

export class BallSortSolver {
  capacities: number[]

  constructor(capacities: number[]) {
    this.capacities = capacities
  }

  isSolved(state: SolverStateType): boolean {
    return state.every(
      (tube, idx) =>
        tube.length === 0 ||
        (tube.length === this.capacities[idx] &&
          tube.every((ball) => ball === tube[0])),
    )
  }

  serialize(state: SolverStateType): string {
    return state
      .map((tube) => tube.join(','))
      .sort()
      .join('|')
  }

  isValidMove(
    state: SolverStateType,
    fromIdx: number,
    toIdx: number,
  ): boolean {
    if (fromIdx === toIdx) return false

    const fromTube = state[fromIdx]
    const toTube = state[toIdx]

    if (fromTube.length === 0) return false // Empty tube can't be source
    if (toTube.length === this.capacities[toIdx]) return false // Full destination tube

    if (toTube.length === 0) {
      // Don't move a full tube of the same color to an empty tube (wasting time)
      if (
        fromTube.length === this.capacities[fromIdx] &&
        fromTube.every((b) => b === fromTube[0])
      )
        return false
      // Don't move a uniform tube (that isn't full) to an empty tube, unless it's to create space
      const isUniform = fromTube.every((b) => b === fromTube[0])
      if (isUniform) return false
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
    const visited = new Set()
    visited.add(this.serialize(initialState))

    while (queue.length > 0) {
      const current = queue.shift()
      if (!current) break
      const { state, moves } = current

      if (this.isSolved(state)) return moves

      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
          if (this.isValidMove(state, i, j)) {
            // Simulate the move
            const newState = state.map((tube) => [...tube])
            const ball = newState[i].pop()
            if (!ball) continue
            newState[j].push(ball)

            const serialized = this.serialize(newState)

            if (!visited.has(serialized)) {
              visited.add(serialized)
              queue.push({
                state: newState,
                moves: [...moves, { from: i, to: j, hex: ball }],
              })
            }
          }
        }
      }
    }
    return null
  }
}
