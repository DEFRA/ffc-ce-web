const parcelRefKey = 'parcelref'
const actionIdKey = 'actionid'
const allActionsKey = 'allactions'
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

function getAllActions (request) {
  console.log(request.yar.get(allActionsKey))
  return request.yar.get(allActionsKey)
}

function setAllActions (request, actions) {
  console.log(actions)
  request.yar.set(allActionsKey, actions)
  const act = request.yar.get(allActionsKey)
  console.log('SET:', act)
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
  getAllActions,
  setAllActions,
  getActionInput,
  setActionInput
}
