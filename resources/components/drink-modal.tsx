import React, { useMemo } from 'react'
import { Drink } from '../store/drink'
import { initialStat, Stat } from '../store/stat'

type Props = {
  drink: Drink
  drank: number
  max: number
  onDrink: (stat: Stat) => void
  onClose: () => void
  children: React.ReactElement | React.ReactElement[]
}

export const DrinkModal = ({ drink, onDrink, onClose, drank, max, children }: Props) => {
  const cups = useMemo(() => Array.from({ length: drink.cup }), [drink.cup])
  const isMax = useMemo(
    () => cups.filter((cup, index) => drink.mg * (index + 1) + drank > max).length === cups.length,
    [drank, max],
  )

  return (
    <div className="modal z-40">
      <div className="modal-overlay bg-black/80" onClick={onClose} />
      <div className="modal-content z-50 h-auto p-8 md:top-10">
        <h2 className="text-xl font-bold">How much do you want to drink?</h2>
        <div className="text-base text-base mb-5">
          {drink.name} {drink.mg * drink.cup} mg
        </div>
        <div className="mb-2 flex flex-col">
          {cups.map((cup, index) => (
            <div key={index} className="mb-2">
              <button
                className="border border-gray-700 text-gray-700 px-5 py-1 disabled:hover:bg-transparent disabled:border-gray-400 disabled:text-gray-400 text-lg hover:bg-gray-100 hover:text-black hover:border-black transition-all duration-200"
                onClick={() => {
                  onDrink({
                    ...initialStat,
                    drink_id: drink.id,
                    cup: index + 1,
                    mg: drink.mg * (index + 1),
                  })
                }}
                disabled={drink.mg * (index + 1) + drank > max}>
                {index + 1 + ' can'} - {drink.mg * (index + 1)} mg
              </button>
            </div>
          ))}
        </div>
        {isMax ? (
          <div className="font-bold text-base text-red-600 mb-5">
            You can't drink any more. It's bad for your health
          </div>
        ) : (
          <React.Fragment />
        )}
        <div className="flex gap-2 mb-2">
          <button
            className="border-2 border-gray-700 text-gray-700 px-5 py-1 font-bold text-lg hover:bg-gray-100 hover:text-black hover:border-black transition-all duration-200"
            onClick={onClose}>
            CANCEL
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
