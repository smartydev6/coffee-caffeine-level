import React from 'react'

type Props = {
  edit: boolean
  onEdit: () => void
}

export const Header = ({ edit, onEdit }: Props) => (
  <div className="flex flex-col py-10 items-center">
    <h1 className="text-3xl font-bold py-2">
      COFFEE <span className="text-orange-800">limiter</span>
    </h1>
    <div className="mb-1">
      Today: <span className="font-bold">{new Date().toDateString()}</span>
    </div>
    <div className="underline cursor-pointer" onClick={onEdit}>
      {edit ? 'Disable edit mode' : 'Enable edit mode'}
    </div>
  </div>
)
