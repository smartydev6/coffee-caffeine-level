import React from 'react'
import { Stat } from '../store/stat'

type Props = {
  stat: Stat
  onRemove: () => void
}

export const StatItem = ({ stat, onRemove }: Props) => {
  return (
    <div className="flex flex-row border-b last:border-0 border-neutral-500 py-2 justify-between">
      <div className="w-8/12">{stat.mg} mg</div>
      <div className="w-auto">
        <button
          className="border border-gray-700 text-gray-700 px-2 py-1 font-bold text-sm hover:bg-gray-100 hover:text-black hover:border-black transition-all duration-200"
          onClick={onRemove}>
          REMOVE
        </button>
      </div>
    </div>
  )
}
