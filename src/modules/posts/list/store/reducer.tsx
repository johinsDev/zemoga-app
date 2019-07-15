import * as React from 'react'
import without from 'ramda/es/without'
import update from 'ramda/es/update'

// INTERFACES
export interface IState {
  data: any[]
  loading: boolean
  totalPages: number
  page: number
  search?: string
  refreshing?: boolean
  selectedTab: number
}

export interface IAction {
  type:
    | 'ADD_DATA'
    | 'TOOGLE_LOADING'
    | 'INC_PAGE'
    | 'INIT_PAGE'
    | 'UPDATE_ITEM'
    | 'CLEAN_DATA'
    | 'REMOVE_ITEM'
    | 'SET_SELECTED_TAB'
  data?: any[]
  totalPages?: number
  search?: string
  storeReferenceId?: string
  newDataItem?: {}
  index?: number
  selectedTab?: number
}

export type Dispatch = (action: IAction) => void

export interface IListProvider {
  children: React.ReactNode
}

export interface IComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface IItem {
  body: string
  id: number
  title: string
  userId: number
  read: boolean
  isFavorite?: boolean
  user?: {
    id: number
    name: string
    email: string
    phone: string
    website: string
  }
  comments?: IComment[]
}

// INITIAL STATE

const initialState = {
  data: [],
  loading: false,
  totalPages: 1,
  page: 1,
  refreshing: false,
  selectedTab: 0,
}

// CONTEXT
const ListStateContext = React.createContext<IState | undefined>(undefined)

const ListDispatchContext = React.createContext<Dispatch | undefined>(undefined)

function listReducer(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case 'ADD_DATA': {
      const data =
        state.page === 1 ? action.data : [...state.data, ...action.data]

      return {
        ...state,
        refreshing: false,
        totalPages: action.totalPages || 1,
        data,
      }
    }
    case 'INC_PAGE': {
      return {
        ...state,
        page: state.page + 1,
      }
    }
    case 'TOOGLE_LOADING': {
      return {
        ...state,
        loading: !state.loading,
      }
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        data: without([state.data[action.index]])(state.data),
      }
    }
    case 'CLEAN_DATA': {
      return initialState
    }
    case 'UPDATE_ITEM': {
      return {
        ...state,
        data: update(
          action.index,
          {
            ...state.data[action.index],
            ...action.newDataItem,
          },
          state.data
        ),
      }
    }
    case 'INIT_PAGE': {
      return {
        ...state,
        page: 1,
      }
    }
    case 'SET_SELECTED_TAB': {
      return {
        ...state,
        selectedTab: action.selectedTab,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function ListProvider({ children }: IListProvider) {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(listReducer, initialState)

  const _state = React.useMemo(() => state, [state])
  const _dispatch = React.useMemo(() => dispatch, [state])

  return (
    <ListStateContext.Provider value={_state}>
      <ListDispatchContext.Provider value={_dispatch}>
        {children}
      </ListDispatchContext.Provider>
    </ListStateContext.Provider>
  )
}

function useListState() {
  const context = React.useContext(ListStateContext)

  if (context === undefined) {
    throw new Error('useListState must be used within a ListProvider')
  }

  return context
}

function useListDispatch() {
  const context = React.useContext(ListDispatchContext)

  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }

  return context
}

function useList(): [IState, Dispatch] {
  return [useListState(), useListDispatch()]
}

export { ListProvider, useListState, useListDispatch, useList }
