const actionId = 'actionId'

function actionsModel (actions, parcelRef, errorMessage) {
  const selectModel = {
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
    items: actions
      .filter((action) => { return action.eligible })
      .map((action) => {
        return {
          value: action.id,
          text: `${action.id}: ${action.description}`
        }
      })
  }

  const ineligibleModel = {
    caption: 'Ineligible Actions',
    captionClasses: 'govuk-label--l',
    rows: actions
      .filter((action) => { return !action.eligible })
      .map((action) => {
        return [
          { text: `${action.id}: ${action.description}` },
          { text: action.reason }
        ]
      })
  }

  if (errorMessage) {
    selectModel.errorMessage = {
      text: errorMessage
    }
  }
  return { selectModel, ineligibleModel }
}

module.exports = actionsModel
