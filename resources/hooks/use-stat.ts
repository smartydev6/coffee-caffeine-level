import axios from 'axios'
import { Stat } from '../store/stat'

export const useStat = () => {
  const getStats = (): Promise<{ stats: Stat[]; drank_max: number }> => {
    return axios.get('/api/stats').then((res) => {
      return res.data
    })
  }

  const createStat = (stat: Stat) => {
    return axios.post(
      '/api/stats',
      {
        drink_id: stat.drink_id,
        mg: stat.mg,
        cup: stat.cup,
      },
      {
        validateStatus: (status) => status === 200,
      },
    )
  }

  const deleteStat = (statId: number) => {
    return axios.delete('/api/stats/' + statId)
  }

  return {
    getStats,
    createStat,
    deleteStat,
  }
}
