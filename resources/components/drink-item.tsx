import React, { useMemo } from 'react'
import cn from 'classnames'
import { Drink } from '../store/drink'

type Props = {
  drink: Drink
  drank: number
  drankCount: number
  drankMax: number
  onDrink: () => void
  onRemove: () => void
  edit: boolean
}

export const DrinkItem = ({
  drink,
  onDrink,
  onRemove,
  drank,
  drankCount,
  drankMax,
  edit,
}: Props) => {
  const isMax = useMemo(() => drink.mg + drankCount > drankMax, [drink, drankCount, drankMax])
  return (
    <div
      className={cn(
        'px-4 max-w-md flex flex-row py-2 border-b border-neutral-500 last:border-b-0 cursor-pointer justify-between',
        isMax && 'bg-red-50',
      )}>
      <div className="w-8/12">
        <div>{drink.name}</div>
        <div className="text-neutral-500">{drink.mg * drink.cup} mg (volume)</div>
        <div className="text-neutral-500">{drank} mg (drank)</div>
      </div>
      <div className="w-auto justify-center items-center flex gap-2">
        <button
          className="border-2 border-gray-700 text-gray-700 px-5 py-1 font-bold text-lg hover:bg-gray-100 hover:text-black hover:border-black transition-all duration-200 disabled:hover:bg-transparent disabled:border-gray-400 disabled:text-gray-400"
          onClick={onDrink}>
          {edit ? 'EDIT' : 'SELECT'}
        </button>
        {edit ? (
          <button
            className="border-2 border-gray-700 text-gray-700 px-5 py-1 font-bold text-lg hover:bg-gray-100 hover:text-black hover:border-black transition-all duration-200"
            onClick={onRemove}>
            RM
          </button>
        ) : (
          <React.Fragment />
        )}
      </div>
    </div>
  )
}
