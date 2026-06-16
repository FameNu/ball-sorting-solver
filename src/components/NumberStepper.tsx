interface NumberStepperProps {
  value: number
  min?: number
  max?: number
  onChange: (newValue: number) => void
  disabled?: boolean
}

export default function NumberStepper({
  value,
  min = 0,
  max = 100,
  onChange,
  disabled,
}: NumberStepperProps) {
  const handleMinus = () => {
    if (value > min) onChange(value - 1)
  }
  const handlePlus = () => {
    if (value < max) onChange(value + 1)
  }

  return (
    <div
      className={`flex items-center bg-base-100 rounded-lg overflow-hidden border border-base-content/20 ${disabled && 'opacity-50 pointer-events-none'}`}
    >
      <button
        onClick={handleMinus}
        className='btn btn-ghost btn-sm rounded-none px-3 text-lg font-bold'
        type='button'
      >
        -
      </button>
      <input
        type='number'
        className='w-full text-center bg-transparent outline-none font-bold text-sm'
        value={value}
        readOnly
      />
      <button
        onClick={handlePlus}
        className='btn btn-ghost btn-sm rounded-none px-3 text-lg font-bold'
        type='button'
      >
        +
      </button>
    </div>
  )
}
