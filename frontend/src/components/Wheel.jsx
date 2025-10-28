import { useRef, useEffect, useState } from 'react'
import './Wheel.css'

const Wheel = ({ items, colors, isSpinning, onSpinComplete }) => {
  const canvasRef = useRef(null)
  const [rotation, setRotation] = useState(0)
  const [targetRotation, setTargetRotation] = useState(0)
  const animationRef = useRef(null)

  const drawWheel = (ctx, currentRotation) => {
    if (items.length === 0) return

    const canvas = ctx.canvas
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((currentRotation * Math.PI) / 180)

    const sliceAngle = (2 * Math.PI) / items.length

    // Draw wheel slices
    items.forEach((item, index) => {
      const startAngle = index * sliceAngle
      const endAngle = startAngle + sliceAngle
      const color = colors[index % colors.length]

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.rotate(startAngle + sliceAngle / 2)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 16px Arial'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
      ctx.fillText(item, radius * 0.6, 0)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(0, 0, 20, 0, 2 * Math.PI)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.restore()

    // Draw pointer
    ctx.beginPath()
    ctx.moveTo(centerX + radius - 30, centerY)
    ctx.lineTo(centerX + radius + 10, centerY - 15)
    ctx.lineTo(centerX + radius + 10, centerY + 15)
    ctx.closePath()
    ctx.fillStyle = '#FF6B6B'
    ctx.fill()
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    drawWheel(ctx, rotation)
  }, [items, colors, rotation])

  useEffect(() => {
    if (isSpinning && items.length > 0) {
      // Calculate random rotation (multiple spins + random position)
      const spins = 5 + Math.random() * 5
      const randomDegrees = Math.random() * 360
      const newRotation = rotation + spins * 360 + randomDegrees
      
      setTargetRotation(newRotation)

      const duration = 4000
      const startTime = Date.now()
      const startRotation = rotation

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        const currentRotation = startRotation + (newRotation - startRotation) * easeOut
        setRotation(currentRotation)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          // Calculate winner
          const normalizedRotation = (360 - (currentRotation % 360)) % 360
          const sliceAngle = 360 / items.length
          const winnerIndex = Math.floor(normalizedRotation / sliceAngle) % items.length
          
          onSpinComplete(items[winnerIndex])
        }
      }

      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isSpinning])

  if (items.length === 0) {
    return (
      <div className="wheel-container">
        <div className="wheel-empty">
          <p>Add items to spin the wheel!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="wheel-container">
      <canvas
        ref={canvasRef}
        className="wheel-canvas"
        style={{ width: '500px', height: '500px' }}
      />
    </div>
  )
}

export default Wheel
