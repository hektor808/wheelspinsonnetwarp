import { useState, useEffect } from 'react'
import Wheel from './components/Wheel'
import ItemInput from './components/ItemInput'
import Controls from './components/Controls'
import './App.css'

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('wheelItems')
    return saved ? JSON.parse(saved) : ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  })
  
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState(null)
  const [colors, setColors] = useState([
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
  ])

  useEffect(() => {
    localStorage.setItem('wheelItems', JSON.stringify(items))
  }, [items])

  const addItem = (item) => {
    if (item.trim()) {
      setItems([...items, item.trim()])
    }
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const clearItems = () => {
    setItems([])
    setWinner(null)
  }

  const handleSpinComplete = (selectedItem) => {
    setWinner(selectedItem)
    setIsSpinning(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎡 Spin Wheel Pro</h1>
        <p>Make random selections with style!</p>
      </header>

      <main className="app-main">
        <div className="wheel-section">
          <Wheel 
            items={items}
            colors={colors}
            isSpinning={isSpinning}
            onSpinComplete={handleSpinComplete}
          />
          
          {winner && !isSpinning && (
            <div className="winner-display">
              <h2>🎉 Winner!</h2>
              <p className="winner-text">{winner}</p>
            </div>
          )}

          <Controls 
            items={items}
            isSpinning={isSpinning}
            onSpin={() => {
              setIsSpinning(true)
              setWinner(null)
            }}
            onClear={clearItems}
          />
        </div>

        <div className="input-section">
          <ItemInput 
            items={items}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        </div>
      </main>
    </div>
  )
}

export default App
