export type SolverMoveType = {
  from: number
  to: number
  hex: string
}

export type SolutionType = SolverMoveType[]

export type SolverStateType = string[][]

export type SolverResultType = {
  solution: SolutionType | null
}
