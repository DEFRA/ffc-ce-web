const parcelRefKey = 'parcelref'
const actionIdKey = 'actionid'
const actionInputKey = 'actioninput'

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

function getActionInput (request) {
  return request.yar.get(actionInputKey)
}

function setActionInput (request, actionInput) {
  return request.yar.set(actionInputKey, actionInput)
}

module.exports = {
  getParcelRef,
  setParcelRef,
  getActionId,
  setActionId,
  getActionInput,
  setActionInput
}
