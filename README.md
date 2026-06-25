# Ball Sorting Solver

Version 1.0 of a dark-theme ball sorting puzzle solver built with React, TypeScript, and Vite.

## Stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- daisyUI
- ESLint

## What It Does

This app lets you build a ball sorting puzzle board, edit the tubes, and calculate a valid solution.

The board is rendered in a dark UI and supports:

- custom tube count
- configurable starting tube capacity
- manual tube editing
- gravity-based tube editing
- preset system colors
- custom colors
- solution steps after solving

## How The Solver Works

The solver uses a breadth-first search strategy.

1. The app reads the current board from the UI.
2. Each tube is converted into solver state and capacity data.
3. The solver checks every valid move between tubes.
4. It serializes each board state so repeated states are skipped.
5. It stops when a solved board is found.
6. The result is returned as a list of moves like `from`, `to`, and `hex`.

The solver treats a board as solved when each tube is either empty or contains balls of one color only and matches its capacity.

## Colors System (Currently in v1.0)

The app loads 12 default system colors, but you can add any custom color using the color picker.
- Red `#e53935`
- Dark Red `#8b0000`
- Light Green `#81c784`
- Dark Green `#2e7d32`
- Blue `#1e88e5`
- Light Blue `#81d4fa`
- Purple `#8e24aa`
- Light Purple `#ce93d8`
- Orange `#ff9800`
- Pink `#f06292`
- Beige `#e3c298`
- White `#ffffff`

## Features In v1.1
- changed layout and styling on the top panel
- changed layout of tube labels and counters
- fixed bug: when size of tubes are not equal, the solver will not allow moving a uniform tube to an empty tube of the same capacity (as it would be a waste of time)

## Features In v1.0

- Always uses dark theme
- Supports 2 to 20 tubes
- Lets you set the initial tube capacity
- Can reset or rebuild the board when settings change
- Can toggle the initial setup mode
- Can edit tubes manually by clicking cells
- Can enable or disable gravity-style filling
- Loads 12 system colors by default:
  - Red `#e53935`
  - Dark Red `#8b0000`
  - Light Green `#81c784`
  - Dark Green `#2e7d32`
  - Blue `#1e88e5`
  - Light Blue `#81d4fa`
  - Purple `#8e24aa`
  - Light Purple `#ce93d8`
  - Orange `#ff9800`
  - Pink `#f06292`
  - Beige `#e3c298`
  - White `#ffffff`
- Can add a custom color from the color picker
- Shows color counts above the board
- Highlights the active color
- Clears individual tubes
- Solves the current puzzle and renders each move step-by-step
- Shows a solved message when the board is already complete

## Getting Started

```bash
npm install
npm run dev
```

### Scripts

- `npm run dev` - start the local dev server
- `npm run build` - type-check and build for production
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint

## Project Structure

- `src/App.tsx` - main UI and app state
- `src/components/Tube.tsx` - tube editor UI
- `src/components/NumberStepper.tsx` - number input control
- `src/utils/solver.ts` - breadth-first search solver
- `src/utils/systemColors.ts` - default color palette
- `src/types/` - shared TypeScript types

## Notes

- Path aliases are configured for `@types`, `@components`, and `@utils`.
- The app uses a fixed dark theme on load.
