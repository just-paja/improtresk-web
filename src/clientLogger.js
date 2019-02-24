/* eslint-disable no-console */
export const logError = (error) => {
  console.error(error)
  if (global.Raven) {
    global.Raven.captureException(error)
  }
}

export const logWarning = (error) => {
  console.warn(error)
}
