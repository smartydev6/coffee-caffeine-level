import React, { useMemo } from 'react'

const Wave = () => (
  <React.Fragment>
    <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
    <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
    <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
    <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
  </React.Fragment>
)

type Props = {
  mg: number
  max: number
}

export const Cup = ({ mg, max }: Props) => {
  const percent = useMemo(() => {
    const p = 100 - Math.round((mg / max) * 100)
    return p === 100 ? 120 : p
  }, [mg, max])
  return (
    <div>
      <div className="box">
        <div className="percent">
          <span className="percent-text">
            {mg || 0} / {max} mg
          </span>
        </div>
        <div id="water" className="water" style={{ transform: `translate(0, ${percent}%)` }}>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
            <Wave />
          </svg>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
            <Wave />
          </svg>
        </div>
      </div>
    </div>
  )
}
