const parcelRefKey = 'parcelref'
const actionIdKey = 'actionid'

function getParcelRef (request) {
  return request.yar.get(parcelRefKey)
}

function setParcelRef (request, parcelRef) {
  return request.yar.set(parcelRefKey, parcelRef)
}

function getActionId (request) {
  return request.yar.get(actionIdKey)
}

function setActionId (request, actionId) {
  return request.yar.set(actionIdKey, actionId)
}

module.exports = {
  getParcelRef,
  setParcelRef,
  getActionId,
  setActionId
}
