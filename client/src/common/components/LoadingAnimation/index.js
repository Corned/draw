import React, { useEffect } from "react"

import "./index.scss"

const LoadingAnimation = () => {
  const barCount = 10
  const barData = new Array(barCount).fill(0)

  return (
    <div className="loading-animation-container">
      { 
        barData.map((delay, index) => (
          <div
            key={delay}
            className="loading-animation-container__bar"
            style={{ animationDelay: `${index/barCount}s` }}
          />
        ))
      }
    </div>
  )
}

export default LoadingAnimation