function actionsInputsModel (parcelRef, actionId, error) {
  const model = {
    hint: {
      text: 'How long is the fence you want to claim on in metres?'
    },
    label: {
      classes: 'govuk-label--xl',
      isPageHeading: true,
      text: 'Enter a fence length in metres'
    },
    id: 'actionInput',
    name: 'actionInput'
  }

  if (error) {
    model.errorMessage = { text: error }
  }

  return model
}

module.exports = actionsInputsModel
