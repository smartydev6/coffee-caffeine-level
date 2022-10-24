import React, { useEffect, useState } from 'react'
import { Drink, initialDrink } from '../store/drink'
import { MG_INPUT_MAX } from '../store/consts'

type Props = {
  drink?: Drink
  onSave: (drink: Drink) => void
  onClose: () => void
}

export const DrinkFormModal = ({ drink, onClose, onSave }: Props) => {
  const [value, setValue] = useState<Drink>({ ...initialDrink, ...drink })

  useEffect(() => {
    setValue({ ...initialDrink, ...drink })
  }, [drink?.id])

  const onMgChange = (mg: number) => {
    setValue((prev) => ({
      ...prev,
      mg: mg > 0 && mg <= MG_INPUT_MAX ? mg : 0,
    }))
  }

  const onCupChange = (cap: number) => {
    setValue((prev) => ({
      ...prev,
      cup: cap > 0 ? cap : 0,
    }))
  }

  return (
    <div className="modal z-40">
      <div className="modal-overlay bg-black/80" onClick={onClose} />
      <div className="modal-content z-50 h-auto p-8 md:top-10">
        <h2 className="text-xl font-bold mb-5">Drink {drink ? 'edit' : 'create'}</h2>
        <div className="mb-5">
          <input
            value={value.name || ''}
            type="text"
            placeholder="Coca-cola"
            maxLength={50}
            autoFocus={true}
            className="w-full px-4 text-xl py-4 rounded-md input"
            onChange={(e) => {
              setValue((prev) => ({ ...prev, name: e.target.value }))
            }}
          />
        </div>

        <div className="mb-5 flex flex-row">
          <input
            value={value.cup || ''}
            type="number"
            placeholder="100"
            style={{ width: 130 }}
            className="px-4 text-xl py-4 rounded-md input"
            onChange={(e) => onCupChange(Number(e.target.value))}
          />
          <div className="flex items-center px-3 mr-5">can</div>
        </div>

        <div className="mb-5 flex flex-row">
          <input
            value={value.mg || ''}
            type="number"
            placeholder="100"
            style={{ width: 130 }}
            className="px-4 text-xl py-4 rounded-md input"
            onChange={(e) => onMgChange(Number(e.target.value))}
          />
          <div className="flex items-center px-3 mr-5">mg / per can</div>
        </div>

        <div className="flex gap-2 mb-2">
          <button
            className="border-2 border-gray-700 text-gray-700 disabled:hover:bg-transparent disabled:border-gray-400 disabled:text-gray-400 px-5 py-1 font-bold text-lg hover:bg-gray-100 hover:text-black hover:border-black transition-all duration-200"
            onClick={() => onSave(value)}
            disabled={value.name.length === 0 || !value.mg || !value.cup}>
            {drink ? 'UPDATE' : 'CREATE'}
          </button>
          <button
            className="border-2 border-gray-700 text-gray-700 px-5 py-1 font-bold text-lg hover:bg-gray-100 hover:text-black hover:border-black transition-all duration-200"
            onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}
