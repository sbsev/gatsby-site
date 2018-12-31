const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken:
    'CFPAT-73ab1c829b7e1bfc3fc0dea99658828c5e0778b3abc41e9cce2a5f5bd062ee0e',
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
  .getSpace('gi9muc70s4ub')
  .then(space => space.getEnvironment('master'))
  .then(env => env.getEntries({ content_type: 'chapter' }))
  .then(console.log)
  .catch(console.error)
