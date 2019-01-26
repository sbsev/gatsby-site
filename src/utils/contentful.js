const contentful = require(`contentful-management`)
require(`dotenv`).config()

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
})

// Get entries
client
  .getSpace(process.env.CONTENTFUL_SPACE_ID)
  .then(space => space.getEnvironment(`master`))
  .then(env => env.getEntries({ content_type: `5KMiN6YPvi42icqAUQMCQe` }))
  .then(({ items }) => items.map(item => item))
  /* eslint-disable no-console */
  .then(console.log)
  .catch(console.error)
