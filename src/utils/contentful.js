/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const contentful = require(`contentful-management`)
require(`dotenv`).config()

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
})

const contentTypes = {
  person: `1kUEViTN4EmGiEaaeC6ouY`,
  page: `page`,
  remit: `remit`,
  chapter: `chapter`,
}

const remitsObj = {
  'Bereich Schüler': `3ybUw5CuVDEUVlPpIXFe2o`,
  'Bereich Werbung': `5exXIke6fVaIcw7J0UwaVr`,
  Rechtliches: `1cPkDSwTtmEQw9FbeYh4Mp`,
  Standortbetreuung: `27vwDJpxvou7rpcdtrOHmv`,
  Finanzen: `4hU4elsfwhidQBG7HyhvLk`,
  'Bereich Studenten': `76EQV8eBOiXo3j9bZ5nufX`,
  Öffentlichkeitsarbeit: `1kxzQ60YPTHZeYOkKbAzhn`,
  Mitgliederverwaltung: `6XWs2RZ9g8vCY2s8vBHmIJ`,
  Fundraising: `5CTeYl2gLQUprtEdQXkMRB`,
  IT: `2Q0v3tDnxhNfU0PtCTWFZo`,
  'Stellv. Vorsitz': `3eFJHmdoXIrxtivLRdb0sX`,
  Vorsitz: `6c5EARdwrF6fndz9ArTN4U`,
}

const chaptersObj = {
  Frankfurt: `qaK6IwrLi0Q68YC4gEEai`,
  Schrobenhausen: `1QIvFThG3ugoygWm28KCa8`,
  Mannheim: `3wjarfJAT6weSMoUyQ6cWa`,
  Stuttgart: `5bxyjJsoxyww2KMEGeAky2`,
  Hannover: `3y7uEw5Ez6K2q2q6I8sqsE`,
  Leipzig: `HI04NArguQKMOQ8oQ40Wa`,
  Marburg: `14zQC8toWOGocKWIqiw6im`,
  Göttingen: `3rG6VMkeBi0S8oiymUQSym`,
  Hamburg: `3fnMJ8ZbZu8KmKoKG4QGmA`,
  Erfurt: `4zTajeXWP6uukMs4E4KEcY`,
  Augsburg: `6jrLqsdISkyMO2CIaQ2a0s`,
  Dresden: `5vNdCCUP16qc0g2oaI4Eeu`,
  Nürnberg: `2enDotjjBOmKiQmyg6qMKm`,
  Berlin: `JRkMbSvJqSgIeSu2o0yW`,
  Bonn: `1hL4HCs8BK6eEmwKIWwoGu`,
  Heidelberg: `8eGRgqTh1mc0cCSy2E2mO`,
  Düsseldorf: `7mNwvjc1zO2gsCsUoGGmCQ`,
  Halle: `2VBp7j5B7aOeaQA0SgWie6`,
  München: `3CLbhLOI1q8usIoKcqO64a`,
  Ingolstadt: `4znfNCc3dCS8I4KM2IWW46`,
  Gießen: `31eSpHWopGIyqs6kWwsqAi`,
}

// Get entries
const createPeople = () =>
  client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(`master`))
    .then(env => env.getEntries({ content_type: contentTypes.page }))
    .then(({ items }) =>
      items
        .map(item => {
          const body = item.fields.body.de
          const title = item.fields.title.de
          if (body.includes(`<span id="heads">`) && title !== `Bundesvorstand`) {
            let index = -1
            if (!body.split(`[1]:`)[1]) return undefined
            const refs = body
              .split(`[1]:`)[1]
              .split(/\[[0-9]{1,2}\]:/g)
              .map(ref => ref.replace(/(?:\n|mailto:)/g, ``).trim())
            const deRefedBody = body.replace(
              /\[[0-9]{1,2}\][^:]/g,
              () => ++index && `(${refs[index]})`
            )
            const heads = deRefedBody.substring(
              deRefedBody.indexOf(`<span id="heads">`) + 17,
              deRefedBody.indexOf(`</span>`)
            )
            const people = heads
              .split(`\n\n`)
              .filter(item => item.startsWith(`![`))
              .map(person => {
                let props
                if (person.includes(`__`))
                  props = person.replace(
                    /.*images\.ctfassets\.net\/gi9muc70s4ub\/(.+?)\/.+?\)(?:\n)?_(.+?)_\n__(.+?)__/g,
                    `$1,$2,$3`
                  )
                else
                  props = person.replace(
                    /.*images\.ctfassets\.net\/gi9muc70s4ub\/(.+?)\/.+?\)(?:\n)?_(.+?)_/g,
                    `$1,$2`
                  )
                return props.split(`,`)
              })
            return {
              title,
              people,
            }
          }
        })
        .filter(item => item)
    )
    .then(chapters => {
      client
        .getSpace(process.env.CONTENTFUL_SPACE_ID)
        .then(space => space.getEnvironment(`master`))
        .then(env =>
          chapters.forEach(chapter => {
            chapter.people.forEach(([photoId, name, remit]) => {
              env.createEntry(contentTypes.person, {
                fields: {
                  name: { de: name },
                  photo: {
                    de: {
                      sys: { type: `Link`, linkType: `Asset`, id: photoId },
                    },
                  },
                  roles: { de: [`Chapter Manager`] },
                  dateJoined: { de: `2018-01-01` },
                  remits: {
                    de: [
                      {
                        sys: {
                          type: `Link`,
                          linkType: `Entry`,
                          id: remitsObj[remit || `Bereich Studenten`],
                        },
                      },
                    ],
                  },
                  chapter: {
                    de: {
                      sys: {
                        type: `Link`,
                        linkType: `Entry`,
                        id: chaptersObj[chapter.title],
                      },
                    },
                  },
                  bio: {
                    de: `${name} engagiert sich am Standort ${chapter.title}`,
                  },
                },
              })
            })
          })
        )
    })
    .then(console.log)
    .catch(console.error)

const getPeople = () =>
  client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(`master`))
    .then(env => env.getEntries({ content_type: contentTypes.person }))
    .then(({ items }) =>
      items.map(item => ({
        ...item.fields,
        photo: item.fields.photo.de.sys,
        chapter: item.fields.chapter && item.fields.chapter.de.sys,
        remits: item.fields.remits.de[0].sys,
      }))
    )
    .then(console.log)
    .catch(console.error)

const publishDraftPeople = () =>
  client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(`master`))
    .then(env =>
      env.getEntries({ content_type: contentTypes.person, changed: true })
    )
    .then(({ items }) => items.map(person => person.publish()))
    .then(console.log)
    .catch(console.error)

const getRemits = () =>
  client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(`master`))
    .then(env => env.getEntries({ content_type: contentTypes.remit }))
    .then(({ items }) => {
      const remitsObj = {}
      items.forEach(item => (remitsObj[item.fields.title.de] = item.sys.id))
      return remitsObj
    })
    .then(console.log)
    .catch(console.error)

const getChapters = () =>
  client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(`master`))
    .then(env => env.getEntries({ content_type: contentTypes.chapter }))
    .then(({ items }) => {
      const chaptersObj = {}
      items.forEach(item => (chaptersObj[item.fields.title.de] = item.sys.id))
      return chaptersObj
    })
    .then(console.log)
    .catch(console.error)

publishDraftPeople()
