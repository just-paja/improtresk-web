import { combine } from 'react-saga-rest'
import { newsListFetch } from '../actions'

import createCollectionReducers, { initialState } from '../../reducers/createCollectionReducers'

export default combine(initialState, createCollectionReducers({
  routine: newsListFetch,
  identAttr: 'id'
}))
