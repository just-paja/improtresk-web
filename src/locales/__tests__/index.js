import * as locales from '..'

const getTranslationPaths = (object, prefix) => Object.keys(object).reduce((aggr, key) => (
  typeof object[key] === 'object'
    ? [...aggr, ...getTranslationPaths(object[key], key)]
    : [...aggr, prefix ? `${prefix}.${key}` : key]
), [])

expect.extend({
  toHaveTranslation (messages, message, lang) {
    if (messages.indexOf(message) > -1) {
      return { pass: true }
    }
    return {
      message: () => `Expected message list to contain "${message}" from language "${lang}"`,
      pass: false
    }
  }
})

describe('Locales', () => {
  it('provides cs language', () => {
    expect(locales).toHaveProperty('cs')
  })

  it('provides en language', () => {
    expect(locales).toHaveProperty('en')
  })

  const languages = Object.keys(locales)

  languages.forEach(testLang => it(`${testLang} has all the messages as other languages`, () => {
    const testMessages = getTranslationPaths(locales[testLang])
    languages
      .filter(lang => lang !== testLang)
      .map(lang => ({ lang, messages: getTranslationPaths(locales[lang]) }))
      .forEach(({ lang, messages }) => messages.forEach(
        message => expect(testMessages).toHaveTranslation(message, lang)
      ))
  }))
})
