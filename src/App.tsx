import { useState } from 'react'

import { SYSTEM_COLORS } from '@utils/systemColors'
import { BallSortSolver } from '@utils/solver'
import type { SolutionType, TubeType } from '@types'

import NumberStepper from '@components/NumberStepper'
import Tube from '@components/Tube'

export default function App() {
  const generateInitialTubes = (
    count: number,
    capacity: number,
    isInit: boolean,
  ) => {
    return Array.from({ length: count }, () => ({
      capacity: isInit ? capacity : 4,
      balls: Array(isInit ? capacity : 4).fill(null),
    }))
  }

  // --- ประกาศ State พร้อมค่าเริ่มต้นจาก Helper ทันที ---
  const [numTubes, setNumTubes] = useState<number>(14)
  const [initCapacity, setInitCapacity] = useState<number>(4)
  const [useInit, setUseInit] = useState<boolean>(true)
  const [enableGravity, setEnableGravity] = useState<boolean>(false)

  const [tubes, setTubes] = useState<TubeType[]>(() =>
    generateInitialTubes(14, 4, true),
  )

  // โหลดสีจากระบบทั้งหมด 12 สีเป็นค่าเริ่มต้น
  const [challengeColors, setChallengeColors] = useState<string[]>(() =>
    SYSTEM_COLORS.map((c) => c.hex),
  )
  const [activeColorHex, setActiveColorHex] = useState<string | null>(
    () => SYSTEM_COLORS[0]?.hex || null,
  )

  // State สำหรับรับค่าสี Custom
  const [customColorHex, setCustomColorHex] = useState<string>('#ffffff')

  const [solution, setSolution] = useState<SolutionType | null>(null)
  const [isSolving, setIsSolving] = useState(false)

  // --- Event Handlers ---
  const handleNumTubesChange = (val: number) => {
    setNumTubes(val)
    setTubes(generateInitialTubes(val, initCapacity, useInit))
  }

  const handleInitCapacityChange = (val: number) => {
    setInitCapacity(val)
    setTubes(generateInitialTubes(numTubes, val, useInit))
  }

  const handleUseInitChange = (checked: boolean) => {
    setUseInit(checked)
    if (checked) {
      setTubes(generateInitialTubes(numTubes, initCapacity, checked))
    }
  }

  const handleAddCustomColor = () => {
    // ป้องกันการแอดสีซ้ำ
    if (!challengeColors.includes(customColorHex)) {
      setChallengeColors([...challengeColors, customColorHex])
      setActiveColorHex(customColorHex) // เลือกสีใหม่ที่เพิ่งแอดให้เลย
    }
  }

  const handleUpdateTube = (index: number, updatedTube: TubeType) => {
    const newTubes = [...tubes]
    newTubes[index] = updatedTube
    setTubes(newTubes)
  }

  const handleClearTube = (index: number) => {
    const newTubes = [...tubes]
    newTubes[index].balls = Array(newTubes[index].capacity).fill(null)
    setTubes(newTubes)
  }

  const calculateCounters = () => {
    const counts: { [key: string]: number } = {}
    tubes.forEach((t) =>
      t.balls.forEach((b) => {
        if (b) counts[b] = (counts[b] || 0) + 1
      }),
    )
    return counts
  }

  const counts = calculateCounters()

  const handleSolve = () => {
    setIsSolving(true)
    setSolution(null)

    setTimeout(() => {
      const capacities = tubes.map((t) => t.capacity)
      const solverState = tubes.map((t) => t.balls.filter((b) => b !== null))

      const solver = new BallSortSolver(capacities)
      const moves = solver.solve(solverState)
      setSolution(moves || [])
      setIsSolving(false)
    }, 100)
  }

  return (
    <div className='drawer lg:drawer-open'>
      <input id='app-drawer' type='checkbox' className='drawer-toggle' />

      {/* Main Content */}
      <div className='drawer-content flex flex-col items-center'>
        {/* Mobile Navbar */}
        <div className='w-full navbar bg-base-200 lg:hidden px-4'>
          <div className='flex-none'>
            <label
              htmlFor='app-drawer'
              className='btn btn-square btn-ghost text-xl'
            >
              ☰
            </label>
          </div>
          <div className='flex-1 px-2 mx-2 text-primary font-bold text-lg'>
            Ball Sort Solver
          </div>
        </div>

        <main className='p-4 md:p-8 w-full max-w-5xl'>
          {/* Top Panel: Counters & Palette */}
          <div className='bg-base-200 p-4 rounded-xl mb-6 shadow-sm'>
            <div className='grid grid-cols-4 min-[500px]:grid-cols-6 md:grid-cols-8 xl:grid-cols-12 gap-2 mb-4'>
              {challengeColors.map((hex, i) => (
                <div
                  key={i}
                  className='badge badge-lg gap-2 bg-base-300 border-none p-4 mx-auto'
                >
                  <div
                    className='w-4 h-4 rounded-full border border-base-content/20'
                    style={{ backgroundColor: hex }}
                  ></div>
                  <span className='font-bold'>{counts[hex] || 0}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className='text-sm font-bold text-base-content/60 mb-2'>
                Active Color
              </h3>
              <div className='max-sm:grid max-sm:grid-cols-6 sm:flex sm:flex-wrap gap-3'>
                {challengeColors.map((hex, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveColorHex(hex)}
                    className={`w-10 h-10 rounded-full transition-transform hover:scale-110 border-4 ${activeColorHex === hex ? `${hex === '#ffffff' ? 'border-primary' : 'border-white'} shadow-lg` : 'border-transparent'}`}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tubes Grid */}
          <div className='flex flex-wrap justify-center gap-4 mb-8'>
            {tubes.map((tube, i) => (
              <Tube
                key={i}
                index={i}
                tube={tube}
                activeColorHex={activeColorHex}
                enableGravity={enableGravity}
                onUpdateTube={handleUpdateTube}
                onClearTube={handleClearTube}
              />
            ))}
          </div>

          {/* Action & Solution */}
          <button
            onClick={handleSolve}
            disabled={isSolving}
            className='btn btn-success btn-lg w-full mb-8 text-white font-bold'
          >
            {isSolving ? 'Calculating...' : 'Solve Puzzle'}
          </button>

          {solution !== null && (
            <div className='bg-base-200 p-6 rounded-xl shadow-sm'>
              <h2 className='text-xl font-bold text-primary mb-4'>
                Solution Steps
              </h2>
              {solution.length === 0 ? (
                <p className='text-success font-bold'>
                  The board is already solved!
                </p>
              ) : (
                <div className='flex flex-col gap-3'>
                  {solution.map((step, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-4 bg-base-100 p-3 rounded-lg border border-base-300'
                    >
                      <div className='badge badge-primary font-bold'>
                        {i + 1}
                      </div>
                      <div className='flex items-center gap-2'>
                        Move
                        <div
                          className='w-4 h-4 rounded-full border border-base-content/20'
                          style={{ backgroundColor: step.hex }}
                        />
                        from{' '}
                        <strong className='text-primary'>
                          Tube {step.from + 1}
                        </strong>{' '}
                        to{' '}
                        <strong className='text-primary'>
                          Tube {step.to + 1}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div className='drawer-side z-50'>
        <label htmlFor='app-drawer' className='drawer-overlay'></label>
        <aside className='p-6 w-80 min-h-full bg-base-300 text-base-content flex flex-col gap-6'>
          <h2 className='text-xl font-bold text-primary border-b border-base-content/10 pb-2'>
            Board Setup
          </h2>

          <div className='form-control'>
            <label className='label font-bold text-sm'>Number of Tubes</label>
            <NumberStepper
              value={numTubes}
              onChange={handleNumTubesChange}
              min={2}
              max={20}
            />
          </div>

          <div className='form-control bg-base-200 p-3 rounded-lg'>
            <label className='cursor-pointer label justify-start gap-3'>
              <input
                type='checkbox'
                className='toggle toggle-primary checkbox-sm'
                checked={useInit}
                onChange={(e) => handleUseInitChange(e.target.checked)}
              />
              <span className='label-text font-bold'>Init general balls</span>
            </label>
            <div className='mt-2'>
              <NumberStepper
                value={initCapacity}
                onChange={handleInitCapacityChange}
                min={1}
                max={10}
                disabled={!useInit}
              />
            </div>
          </div>

          <div className='form-control'>
            <label className='cursor-pointer label justify-start gap-3'>
              <input
                type='checkbox'
                className='toggle toggle-primary checkbox-sm'
                checked={enableGravity}
                onChange={(e) => setEnableGravity(e.target.checked)}
              />
              <span className='label-text font-bold'>Enable Gravity</span>
            </label>
          </div>

          <div className='divider my-0'>Colors</div>

          {/* Add Custom Color Section */}
          <div className='form-control bg-base-200 p-3 rounded-lg'>
            <label className='label font-bold text-sm pt-0'>
              Add Custom Color
            </label>
            <div className='flex gap-2 items-center'>
              <input
                type='color'
                className='w-12 h-10 rounded cursor-pointer border border-base-content/20 p-0 bg-transparent'
                value={customColorHex}
                onChange={(e) => setCustomColorHex(e.target.value)}
              />
              <button
                className='btn btn-primary btn-sm h-10 flex-1'
                onClick={handleAddCustomColor}
              >
                Add Color
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
