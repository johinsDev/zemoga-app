const devConfig = {
  API_URL: 'https://jsonplaceholder.typicode.com',
}

const testConfig = {
  API_URL: 'https://jsonplaceholder.typicode.com',
}

const prodConfig = {
  API_URL: 'https://jsonplaceholder.typicode.com',
}

const defaultConfig = {
  API_URL: 'https://jsonplaceholder.typicode.com',
}

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig
    case 'test':
      return testConfig
    default:
      return prodConfig
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
}
