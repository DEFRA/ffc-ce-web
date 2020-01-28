function getTitle (actionId) {
  return actionId === 'FG1' ? 'Enter a fence length in metres' : 'Enter the area in hectares'
}

function getHint (actionId) {
  return actionId === 'FG1' ? 'How long is the fence you want to claim on in metres?' : 'What is the area you wish to claim on in hectares?'
}

function actionsInputsModel (parcelRef, actionId, error) {
  const model = {
    hint: {
      text: getHint(actionId)
    },
    label: {
      classes: 'govuk-label--xl',
      isPageHeading: true,
      text: getTitle(actionId)
    },
    classes: 'govuk-input--width-10',
    id: 'actionInput',
    name: 'actionInput'
  }

  if (error) {
    model.errorMessage = { text: error }
  }

  return model
}

module.exports = actionsInputsModel
