const bllUrl = require('./url')
const id = require('./id')

// Any dependencies that are outside bll scope are injected.
module.exports = (dal) => {
  return {
    url: bllUrl({
      urlDalApi: dal.url,
      encode: id.encode,
      decode: id.decode,
    }),
  }
}
