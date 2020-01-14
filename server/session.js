const parcelRefKey = 'parcelref'

function getParcelRef (request) {
  return request.yar.get(parcelRefKey)
}

function setParcelRef (request, parcelRef) {
  return request.yar.set(parcelRefKey, parcelRef)
}

module.exports = {
  getParcelRef,
  setParcelRef
}
