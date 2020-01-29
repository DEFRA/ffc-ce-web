const parcelRefKey = 'parcelref'
const actionIdKey = 'actionid'
const actionInputKey = 'actioninput'
const parcelDataKey = 'parceldata'

function getParcelRef (request) {
  return request.yar.get(parcelRefKey)
}

function setParcelRef (request, parcelRef) {
  return request.yar.set(parcelRefKey, parcelRef)
}

function getAllParcelData (request) {
  return request.yar.get(parcelDataKey)
}

function setAllParcelData (request, parcelData) {
  return request.yar.set(parcelDataKey, parcelData)
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
  getAllParcelData,
  setAllParcelData,
  getActionId,
  setActionId,
  getActionInput,
  setActionInput
}
