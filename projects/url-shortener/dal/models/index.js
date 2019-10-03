// All models need the connection to get set up.
module.exports = (connection) => {
  return {
    Url: require('./Url')(connection),
  }
}
