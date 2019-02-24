import { getData, getProgress, getProp, isRequired, transformData } from 'react-saga-rest'

export const aggregatePollAnswerData = answer => (
  answer.performer ? ({
    ...answer,
    performer: null,
    image: answer.performer.photos[0]
      ? answer.performer.photos[0].image
      : null,
    links: answer.performer.links,
    description: answer.performer.text
  }) : answer
)

export const aggregatePollData = poll => ({
  ...poll,
  answers: poll.answers.map(aggregatePollAnswerData)
})

export const aggregateNewsData = news => (
  news && news.poll ? {
    ...news,
    poll: aggregatePollData(news.poll)
  } : news
)

export const getNewsListState = state => state.news.list
export const getNewsDetailState = state => state.news.detail

export const getNewsListProgress = getProgress(getNewsListState)
export const getNewsDetailProgress = getProgress(getNewsDetailState)

export const isNewsListRequired = isRequired(getNewsListState)
export const isNewsDetailRequired = isRequired(getNewsDetailState)

export const getNewsList = getData(getNewsListState)
export const getNewsDetailId = getProp(getNewsDetailState, 'id')
export const getNewsDetail = transformData(getNewsDetailState, [
  aggregateNewsData
])
