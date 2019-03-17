import moment from 'moment'

export const getNumberRange = (min, max) => {
  const hours = []
  for (let hour = min; hour <= max; hour++) {
    hours.push(hour)
  }
  return hours
}

export const shiftHour = hour => (hour < 6 ? hour + 23 : hour)

export const unshiftHour = hour => (hour > 23 ? hour - 23 : hour)

export const isInEvent = hour => event => (
  hour >= shiftHour(moment(event.startAt).hours()) &&
  hour <= shiftHour(moment(event.endAt).hours())
)
