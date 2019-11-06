const richTextFromMarkdown = require(`@contentful/rich-text-from-markdown`)
  .richTextFromMarkdown
const { createClient } = require(`contentful-management`)

const mimeType = {
  bmp: `image/bmp`,
  djv: `image/vnd.djvu`,
  djvu: `image/vnd.djvu`,
  gif: `image/gif`,
  jpeg: `image/jpeg`,
  jpg: `image/jpeg`,
  pbm: `image/x-portable-bitmap`,
  pgm: `image/x-portable-graymap`,
  png: `image/png`,
  pnm: `image/x-portable-anymap`,
  ppm: `image/x-portable-pixmap`,
  psd: `image/vnd.adobe.photoshop`,
  svg: `image/svg+xml`,
  svgz: `image/svg+xml`,
  tif: `image/tiff`,
  tiff: `image/tiff`,
  xbm: `image/x-xbitmap`,
  xpm: `image/x-xpixmap`,
  '': `application/octet-stream`,
}

function getContentType(url) {
  const index = url.lastIndexOf(`.`)
  const extension = index === -1 ? `` : url.substr(index + 1)
  return mimeType[extension]
}

function getFileName(url) {
  const index = url.lastIndexOf(`/`)
  const fileName = index === -1 ? `` : url.substr(index + 1)
  return fileName
}

module.exports = function(migration, { makeRequest, spaceId, accessToken }) {
  const managementClient = createClient({ accessToken })

  migration.transformEntries({
    contentType: `page`,
    from: [`body`],
    to: [`richBody`],
    transformEntryForLocale: async function(fromFields, currentLocale) {
      // The returned Rich Text object to be added to the new "copy" field
      const result = {
        copy: {
          nodeType: `document`,
          content: content,
          data: {},
        },
      }
      return result
    },
  })

  // Return a Rich Text embedded asset object
  function embedImagesAsAssetBlocks(img) {
    // This field is not localized.
    const asset = img.fields.image[`de-DE`]
    return [
      {
        nodeType: `embedded-asset-block`,
        content: [],
        data: {
          target: {
            sys: {
              type: `Link`,
              linkType: `Asset`,
              id: asset.sys.id,
            },
          },
        },
      },
    ]
  }

  // Return Rich Text instead of Markdown
  async function transformPageBody(page, locale) {
    const copy = page.fields.body[locale]
    return await richTextFromMarkdown(copy, async mdNode => {
      if (mdNode.type !== `image`) return null

      // Create and asset and publish it
      const space = await managementClient.getSpace(spaceId)
      // Unfortunately, we can't pull the environment id from the context
      const environment = await space.getEnvironment(`rich-text-migration`)

      let asset = await environment.createAsset({
        fields: {
          title: {
            'de-DE': mdNode.title ? mdNode.title + locale : mdNode.alt + locale,
          },
          file: {
            'de-DE': {
              contentType: getContentType(mdNode.url),
              fileName: getFileName(mdNode.url) + locale,
              upload: `https:${mdNode.url}`,
            },
          },
        },
      })
      asset = await asset.processForAllLocales({
        processingCheckWait: 4000,
      })
      asset = await asset.publish()
      console.log(`published asset's id is ${asset.sys.id}`)
      return {
        nodeType: `embedded-asset-block`,
        content: [],
        data: {
          target: {
            sys: {
              type: `Link`,
              linkType: `Asset`,
              id: asset.sys.id,
            },
          },
        },
      }
    })
  }
}
