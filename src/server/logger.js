import winston from 'winston'

const errorStackFormat = winston.format(info => (
  info instanceof Error
    ? Object.assign({}, info, { message: info.stack })
    : info
))

const format = winston.format.combine(
  winston.format.splat(),
  errorStackFormat(),
  winston.format.cli(),
  winston.format.timestamp()
)

export const logger = winston.createLogger({
  level: 'debug',
  format,
  transports: [
    new winston.transports.Console()
  ]
})
