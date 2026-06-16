import type { TubeType } from '@types'

interface TubeProps {
  index: number
  tube: TubeType
  activeColorHex: string | null
  enableGravity: boolean
  onUpdateTube: (
    index: number,
    newTubeData: TubeType,
  ) => void
  onClearTube: (index: number) => void
}

export default function Tube({
  index,
  tube,
  activeColorHex,
  enableGravity,
  onUpdateTube,
  onClearTube,
}: TubeProps) {
  const handleBallClick = (slotIndex: number) => {
    if (!activeColorHex) return
    const newBalls = [...tube.balls]

    if (enableGravity) {
      const emptyIndex = newBalls.indexOf(null)
      if (emptyIndex !== -1) {
        newBalls[emptyIndex] = activeColorHex
      } else {
        newBalls[tube.capacity - 1] = null
      }
    } else {
      if (newBalls[slotIndex] === activeColorHex) {
        newBalls[slotIndex] = null
      } else {
        newBalls[slotIndex] = activeColorHex
      }
    }
    onUpdateTube(index, { ...tube, balls: newBalls })
  }

  const changeCapacity = (delta: number) => {
    const newCapacity = tube.capacity + delta
    if (newCapacity < 1 || newCapacity > 10) return

    const newBalls = [...tube.balls]
    if (delta > 0) newBalls.push(null)
    else newBalls.pop()

    onUpdateTube(index, { ...tube, capacity: newCapacity, balls: newBalls })
  }

  return (
    <div className='flex flex-col items-center gap-3 bg-base-200 p-4 rounded-xl w-24 shadow-sm'>
      <div className='text-xs font-bold text-base-content/60'>
        Tube {index + 1}
      </div>

      {/* Tube Visual */}
      <div className='flex flex-col-reverse w-12 border-4 border-t-0 border-base-content/30 rounded-b-full p-1 gap-1 bg-base-100/30'>
        {Array.from({ length: tube.capacity }).map((_, slotIndex) => {
          const color = tube.balls[slotIndex]
          return (
            <div
              key={slotIndex}
              onClick={() => handleBallClick(slotIndex)}
              className='w-full aspect-square rounded-full cursor-pointer border border-dashed border-base-content/20 hover:border-base-content/80 transition-colors'
              style={{ backgroundColor: color || 'transparent' }}
            />
          )
        })}
      </div>

      {/* Controls */}
      <div className='flex flex-col items-center gap-2 w-full mt-2'>
        <span className='text-xs font-bold text-base-content/60'>
          Size: {tube.capacity}
        </span>
        <div className='flex gap-2 w-full justify-between'>
          <button
            onClick={() => changeCapacity(-1)}
            className='btn btn-square btn-xs text-base font-bold'
          >
            -
          </button>
          <button
            onClick={() => changeCapacity(1)}
            className='btn btn-square btn-xs text-base font-bold'
          >
            +
          </button>
        </div>
        <button
          onClick={() => onClearTube(index)}
          className='btn btn-error btn-xs w-full mt-1 font-bold'
        >
          Clear
        </button>
      </div>
    </div>
  )
}
