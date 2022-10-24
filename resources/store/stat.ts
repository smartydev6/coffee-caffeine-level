export interface Stat {
    id: number
    drink_id: number
    mg: number
    cup: number
    datetime: string
}

export const initialStat: Stat = {
    id: 0,
    drink_id: 0,
    mg: 0,
    cup: 0,
    datetime: '',
}
