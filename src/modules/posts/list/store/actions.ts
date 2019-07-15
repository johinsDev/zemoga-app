import pathOr from 'ramda/es/pathOr'
import { AsyncStorage } from 'react-native'
import map from 'ramda/es/map'
import assoc from 'ramda/es/assoc'
import without from 'ramda/es/without'
import update from 'ramda/es/update'

import { postService } from './service'
import { Dispatch } from './reducer'

const getKey = (page: number) => `/posts?_page=${page}&_limit=20`

const getItemOnCache = async (index: number) => {
  try {
    const itemsPerPage = 20

    let page = Math.ceil(index / itemsPerPage)

    if (index === 0) {
      page = 1
    }

    const url = getKey(page)

    const cacheData = await AsyncStorage.getItem(url)

    const data = JSON.parse(cacheData)

    return [data, url]
  } catch (error) {
    console.log('ERROR', error)
  }
}

async function loadPosts(dispatch: Dispatch, page: number) {
  dispatch({ type: 'TOOGLE_LOADING' })

  const url = getKey(page)
  // await AsyncStorage.clear()
  try {
    const [storageItems, storageTotal] = await Promise.all([
      AsyncStorage.getItem(url),
      AsyncStorage.getItem('total'),
    ])

    if (storageItems && storageTotal) {
      return dispatch({
        type: 'ADD_DATA',
        data: JSON.parse(storageItems),
        totalPages: JSON.parse(storageTotal),
      })
    }

    const res = await postService.fetch(url)

    let data = pathOr([], ['data'], res)
    const totalPages = pathOr(0, ['headers', 'x-total-count'], res) / 20

    // first 20
    if (page === 1) {
      data = map(assoc('read', false), data)
    } else {
      data = map(assoc('read', true), data)
    }

    await AsyncStorage.setItem(url, JSON.stringify(data))
    await AsyncStorage.setItem('total', JSON.stringify(totalPages))

    dispatch({ type: 'ADD_DATA', data, totalPages })
  } catch (error) {
    console.log('ERROR', error)
  } finally {
    dispatch({ type: 'TOOGLE_LOADING' })
  }
}

async function refreshPosts(dispatch: Dispatch) {
  const url = getKey(1)

  try {
    await AsyncStorage.removeItem(url)
    dispatch({ type: 'CLEAN_DATA' })
    await loadPosts(dispatch, 1)
  } catch (error) {
    console.log('ERROR', error)
  }
}

async function removeAll(dispatch: Dispatch) {
  try {
    await AsyncStorage.clear()
    dispatch({ type: 'CLEAN_DATA' })
  } catch (error) {
    console.log('ERROR', error)
  }
}

async function removeItem(dispatch: Dispatch, index: number) {
  try {
    const [data, url] = await getItemOnCache(index)

    await AsyncStorage.setItem(
      url,
      JSON.stringify(without([data[index]])(data))
    )

    dispatch({ type: 'REMOVE_ITEM', index })
  } catch (error) {
    console.log('ERROR', error)
  }
}

async function updateItem(dispatch: Dispatch, index: number, newData: {}) {
  try {
    const [data, url] = await getItemOnCache(index)

    await AsyncStorage.setItem(
      url,
      JSON.stringify(
        update(
          index,
          {
            ...data[index],
            ...newData,
          },
          data
        )
      )
    )

    dispatch({ type: 'UPDATE_ITEM', index, newDataItem: newData })
  } catch (error) {
    console.log('ERROR', error)
  }
}

async function getUser(dispatch: Dispatch, userId: number, index: number) {
  try {
    const res = await postService.fetch(`/users/${userId}`)

    const user = pathOr([], ['data'], res)

    updateItem(dispatch, index, { user })
  } catch (error) {
    console.log('ERROR', error)
  }
}

async function loadComments(dispatch: Dispatch, postId: number, index: number) {
  try {
    const res = await postService.fetch(`/posts/${postId}/comments?_page=1`)

    const comments = pathOr([], ['data'], res)

    updateItem(dispatch, index, { comments })
  } catch (error) {
    console.log('ERROR', error)
  }
}

export default {
  loadPosts,
  refreshPosts,
  removeAll,
  removeItem,
  updateItem,
  getUser,
  loadComments,
}
