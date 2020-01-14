function actionsModel (parcelRef, actionId, error) {
  const model = {
    parcelRef,
    actionId,
    label: {
      text: 'Proposed fence length'
    },
    id: 'actionInput',
    name: 'actionInput'
  }

  if (error) {
    model.errorMessage = { text: error }
  }

  return model
}

module.exports = actionsModel
