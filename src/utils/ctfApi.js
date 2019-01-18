const contentful = require(`contentful-management`)
require(`dotenv`).config()

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

// // Create chapter entries from former chapter JSON
// chapters.forEach(chapter => {
//   client
//     .getSpace('gi9muc70s4ub')
//     .then(space => space.getEnvironment('master'))
//     .then(env =>
//       env
//         .createEntry('chapter', {
//           fields: {
//             name: {
//               de: chapter.title,
//             },
//             slug: {
//               de: chapter.url,
//             },
//             active: {
//               de: !chapter.inactive,
//             },
//             coords: {
//               de: {
//                 lat: chapter.coords.lat,
//                 lon: chapter.coords.lng,
//               },
//             },
//           },
//         })
//         .then(console.log)
//         .catch(console.error)
//     )
// })

// Get entries
client
  .getSpace(process.env.CONTENTFUL_SPACE_ID)
  .then(space => space.getEnvironment(`master`))
  .then(env => env.getEntries({ content_type: `chapter` }))
  /* eslint-disable no-console */
  .then(console.log)
  .catch(console.error)
