import { useState } from 'react'
import './ItemInput.css'

const ItemInput = ({ items, onAddItem, onRemoveItem }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAddItem(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="item-input">
      <h2>Wheel Items</h2>
      
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an item..."
          className="input-field"
          maxLength={50}
        />
        <button type="submit" className="btn btn-add">
          ➕ Add
        </button>
      </form>

      <div className="items-list">
        {items.length === 0 ? (
          <p className="empty-message">No items yet. Add some to get started!</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index} className="item">
                <span className="item-text">{item}</span>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="btn-remove"
                  aria-label={`Remove ${item}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="item-count">
        Total items: <strong>{items.length}</strong>
      </div>
    </div>
  )
}

export default ItemInput
