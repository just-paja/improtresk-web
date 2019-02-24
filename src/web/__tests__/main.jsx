import Analytics from 'react-ga'
import sinon from 'sinon'
import ReactDOM from 'react-dom'

describe('Client App', () => {
  beforeEach(() => {
    sinon.stub(Analytics, 'initialize')
    sinon.stub(ReactDOM, 'hydrate')
  })

  afterEach(() => {
    Analytics.initialize.restore()
    ReactDOM.hydrate.restore()
  })

  it('renders default state without errors', () => {
    expect(() => {
      // eslint-disable-next-line global-require
      require('../main')
    }).not.toThrow()
    expect(Analytics.initialize.called).toBeTruthy()
    expect(ReactDOM.hydrate.called).toBeTruthy()
  })
})
