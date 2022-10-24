import React, { useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'

import 'tailwindcss/tailwind.css'
import './css/app.css'

import { Header } from './components/header'
import { Drink } from './store/drink'
import { DrinkItem } from './components/drink-item'
import { Cup } from './components/cup'
import { Stat } from './store/stat'
import { DrinkModal } from './components/drink-modal'
import { useStat } from './hooks/use-stat'
import { useDrink } from './hooks/use-drink'
import { StatItem } from './components/stat-item'
import { DrinkFormModal } from './components/drink-form-modal'

const root = document.getElementById('root') as Element

const App = () => {
  const [drinkId, setDrinkId] = useState<number>(0)
  const [drankMax, setDrankMax] = useState<number>(0)
  const [drinkModalShow, setDrinkModalShow] = useState<boolean>(false)
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [edit, setEdit] = useState<boolean>(false)

  const { getDrinks, createDrink, updateDrink, deleteDrink } = useDrink()
  const { getStats, createStat, deleteStat } = useStat()

  useEffect(() => {
    getDrinks().then((items) => setDrinks(items))
    getStats().then((items) => {
      setStats(items.stats)
      setDrankMax(items.drank_max)
    })
  }, [])

  const todayDrankCount = useMemo(() => {
    return stats.reduce((total, stat) => total + stat.mg, 0) || 0
  }, [stats])

  const drinkStatCount = (id: number) => {
    return (
      stats.filter((stat) => stat.drink_id === id).reduce((total, stat) => stat.mg + total, 0) || 0
    )
  }

  const drinkSelected = useMemo(
    () => drinks?.find((drink) => drink.id === drinkId),
    [drinkId, drinks],
  )

  const drinkSelectedStats = useMemo(
    () => stats.filter((stat) => stat.drink_id === drinkId),
    [drinkId, stats],
  )

  const onDrink = (stat: Stat) => {
    createStat(stat)
      .then(() => {
        getStats().then((items) => {
          setStats(items.stats)
        })
      })
      .catch((e) => {
        getStats().then((items) => {
          setStats(items.stats)
        })
      })
    setDrinkId(0)
  }

  const onStatRemove = (id: number) => {
    deleteStat(id).then(() => {
      getStats().then((items) => setStats(items.stats))
    })
  }

  const onDrinkModalClose = () => {
    setDrinkId(0)
    setDrinkModalShow(false)
  }

  const onDrinkCreateModalShow = () => {
    setDrinkId(0)
    setDrinkModalShow(true)
  }

  const onDrinkSave = (drink: Drink) => {
    if (drink.id) {
      updateDrink(drink).then(() => getDrinks().then((items) => setDrinks(items)))
    } else {
      createDrink(drink).then(() => getDrinks().then((items) => setDrinks(items)))
    }

    onDrinkModalClose()
  }

  const onDrinkRemove = (id: number) => {
    if (confirm('Remove the drink?')) {
      deleteDrink(id).then(() => {
        getDrinks().then((items) => setDrinks(items))
      })
    }
  }

  return (
    <div className="pb-12">
      {drinkModalShow && edit ? (
        <DrinkFormModal drink={drinkSelected} onClose={onDrinkModalClose} onSave={onDrinkSave} />
      ) : (
        <React.Fragment />
      )}

      {drinkModalShow && !edit && drinkId && drinkSelected ? (
        <DrinkModal
          drink={drinkSelected}
          drank={todayDrankCount}
          max={drankMax}
          onDrink={onDrink}
          onClose={onDrinkModalClose}>
          {drinkSelectedStats.length ? (
            <div className="pt-8">
              <h3 className="text-lg font-bold">History</h3>
              {drinkSelectedStats.map((stat) => (
                <StatItem stat={stat} key={stat.id} onRemove={() => onStatRemove(stat.id)} />
              ))}
            </div>
          ) : (
            <React.Fragment />
          )}
        </DrinkModal>
      ) : (
        <React.Fragment />
      )}

      <div className="container mx-auto">
        <Header edit={edit} onEdit={() => setEdit(!edit)} />
        <div className="flex flex-col items-center justify-center">
          <div className="mb-10">
            <Cup mg={todayDrankCount} max={drankMax} />
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="mb-5">
            {drinks?.map((drink) => (
              <DrinkItem
                drink={drink}
                drank={drinkStatCount(drink.id)}
                drankCount={todayDrankCount}
                drankMax={drankMax}
                edit={edit}
                key={drink.id}
                onDrink={() => {
                  setDrinkId(drink.id)
                  setDrinkModalShow(true)
                }}
                onRemove={() => onDrinkRemove(drink.id)}
              />
            ))}
          </div>
          {edit ? (
            <button
              className="mx-3 border-2 border-gray-700 text-gray-700 px-5 py-1 font-bold text-lg hover:bg-gray-100 hover:text-black hover:border-black transition-all duration-200"
              onClick={onDrinkCreateModalShow}>
              CREATE DRINK
            </button>
          ) : (
            <React.Fragment />
          )}
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(root).render(<App />)
