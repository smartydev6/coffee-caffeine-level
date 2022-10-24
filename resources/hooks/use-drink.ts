import axios from 'axios'
import { Drink } from '../store/drink'

export const useDrink = () => {
  const getDrinks = (): Promise<Drink[]> => {
    return axios.get('/api/drinks').then((res) => {
      return res.data
    })
  }

  const createDrink = (drink: Drink) => {
    return axios.post('/api/drinks', {
      name: drink.name,
      mg: drink.mg,
      cup: drink.cup,
    })
  }

  const updateDrink = (drink: Drink) => {
    return axios.put('/api/drinks/' + drink.id, {
      name: drink.name,
      mg: drink.mg,
      cup: drink.cup,
    })
  }

  const deleteDrink = (drinkId: number) => {
    return axios.delete('/api/drinks/' + drinkId)
  }

  return {
    getDrinks,
    createDrink,
    updateDrink,
    deleteDrink,
  }
}
