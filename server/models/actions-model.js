const actionId = 'actionId'

function actionsModel (actions, parcelRef, errorMessage) {
  const items = actions.map(action => {
    return { value: action.id, text: `${action.id}: ${action.description}` }
  })
  return {
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
      text: `Select an action to apply to parcel ${parcelRef}`
    },
    items,
    errorMessage: {
      text: errorMessage
    }
  }
}

module.exports = actionsModel
