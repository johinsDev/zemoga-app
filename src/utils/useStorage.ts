import is from 'ramda/es/is'
import { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'

export function useStorage(options: IUseStorageOptions): IUseStorageSignature {
  const [data, setData] = useState<any>()
  const { get = true, initialKey, callback } = options

  function getStorage(
    key: string,
    cb?: (error?: Error, result?: string) => void
  ) {
    return AsyncStorage.getItem(key, cb).then((_data: any) => {
      if (is(String, _data)) {
        return setData(_data)
      }

      return setData(JSON.parse(_data))
    })
  }

  function setStorage(key: string, value: string) {
    let _value = value
    if (!is(String, value)) {
      _value = JSON.stringify(value)
    }

    return AsyncStorage.setItem(key, value).then(() => setData(_value))
  }

  useEffect(() => {
    if (get) {
      if (!initialKey) {
        throw new Error('intialKey is neccesary')
      }

      getStorage(initialKey, callback)
    }
  }, [])

  return [data, setStorage, getStorage]
}

type IUseStorageSignature = [
  number | undefined,
  (key: string, value: string) => Promise<void>,
  (key: string) => Promise<void>
]

export interface IUseStorageOptions {
  get?: boolean
  initialKey?: string
  callback?: (error?: Error, result?: string) => void
}
