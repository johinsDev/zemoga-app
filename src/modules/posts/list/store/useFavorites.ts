import { useList } from './reducer'
import propEq from 'ramda/es/propEq'
import filter from 'ramda/es/filter'

export default function useFavorites() {
  const [{ data }] = useList()

  return filter(propEq('isFavorite', true), data)
}
