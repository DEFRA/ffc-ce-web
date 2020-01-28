function getTitle (actionId) {
  return actionId === 'FG1' ? 'Enter a fence length in metres' : 'Enter the area in hectares'
}

function getHint (actionId) {
  return actionId === 'FG1' ? 'How long is the fence you want to claim on in metres?' : 'What is the area you wish to claim on in hectares?'
}

function boundsValid (action) {
  return action && action.inputs && action.inputs[0] && action.inputs[0].upperbound && action.inputs[0].lowerbound
}

function getBounds (action) {
  return boundsValid(action)
    ? action.inputs.find(input => input.upperbound !== undefined && input.lowerbound !== undefined)
    : undefined
}

function boundsMessage (bounds) {
  return `Please choose a value between ${bounds.lowerbound} and ${bounds.upperbound}.`
}

function getBoundsHint (action) {
  const bounds = getBounds(action)
  return bounds ? boundsMessage(bounds) : ''
}

function actionsInputsModel (parcelRef, action, error) {
  const model = {
    hint: {
      text: `${getHint(action.id)} ${getBoundsHint(action)}`
    },
    label: {
      classes: 'govuk-label--xl',
      isPageHeading: true,
      text: getTitle(action.id)
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
