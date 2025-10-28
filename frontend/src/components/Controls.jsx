import './Controls.css'

const Controls = ({ items, isSpinning, onSpin, onClear }) => {
  return (
    <div className="controls">
      <button
        className="btn btn-primary btn-spin"
        onClick={onSpin}
        disabled={isSpinning || items.length === 0}
      >
        {isSpinning ? '🎡 Spinning...' : '🎯 Spin the Wheel!'}
      </button>
      
      <button
        className="btn btn-secondary"
        onClick={onClear}
        disabled={isSpinning || items.length === 0}
      >
        🗑️ Clear All
      </button>
    </div>
  )
}

export default Controls
