module.exports = {
  'projects': [
    {
      'runner': 'jest-runner-standard',
      'testMatch': [
        '<rootDir>/src/**/*.{js,jsx}'
      ],
      'displayName': 'linter'
    },
    {
      'displayName': 'improtresk-web',
      'testPathIgnorePatterns': [
        '<rootDir>[/\\\\](build|docs|node_modules|scripts)[/\\\\]'
      ],
      'testMatch': [
        '<rootDir>/src/**/__tests__/*.{js,jsx}'
      ],
      'testEnvironment': 'node',
      'testURL': 'http://localhost',
      'transform': {
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
        '.+\\.css$': 'jest-css-modules-transform',
        '^(?!.*\\.(json)$)': '<rootDir>/config/jest/fileTransform.js'
      },
      'transformIgnorePatterns': [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
      ],
      'setupFilesAfterEnv': [
        '<rootDir>/config/jest/enzyme.js'
      ]
    }
  ],
  'collectCoverageFrom': [
    'src/**/*.{js,jsx}'
  ],
  'coveragePathIgnorePatterns': [
    '/node_modules/',
    '/locales/',
    '/constants/'
  ]
}
