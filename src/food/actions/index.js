import * as constants from '../constants'
import * as api from '../../api'

import { createRoutine } from '../../routines'

export const mealListFetch = createRoutine(constants.MEAL_LIST_FETCH, api.fetchMeals)

export default {}
