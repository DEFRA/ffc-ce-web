const actionId = 'actionId'

function actionsModel (actions, parcelRef, errorMessage) {
  const items = actions.map(action => {
    return { value: action.id, text: `${action.id}: ${action.description}` }
  })
  const model = {
    idPrefix: actionId,
    name: actionId,
    fieldset: {
      legend: {
        text: 'Select an action',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--xl'
      }
    },
    hint: {
      text: `Select an action to apply to land parcel ${parcelRef}`
    },
    items
  }
  if (errorMessage) {
    model.errorMessage = {
      text: errorMessage
    }
  }
  return model
}

module.exports = actionsModel
