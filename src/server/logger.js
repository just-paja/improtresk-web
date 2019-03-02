import winston from 'winston'

const format = winston.format.combine(
  winston.format.cli(),
  winston.format.errors()
)

export default winston.createLogger({
  level: 'debug',
  format,
  transports: [
    new winston.transports.Console({
      format
    })
  ]
})
