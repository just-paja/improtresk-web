import textField from './textField'

export const pattern = /^(\d{4}-[01]\d-[0-3]\d)?$/
export const format = 'YYYY-MM-DD'

const dateField = ({
  messages,
  ...other
} = {}) => textField({
  pattern,
  messages: {
    pattern: 'forms.badDateFormat',
    ...messages
  },
  ...other
})

export default dateField
