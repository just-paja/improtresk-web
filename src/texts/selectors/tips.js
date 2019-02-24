import { getData, getProgress, isRequired } from 'react-saga-rest'

export const getTipListState = state => state.texts.tips

export const getTipList = getData(getTipListState)
export const getTipListProgress = getProgress(getTipListState)
export const isTipListRequired = isRequired(getTipListState)
