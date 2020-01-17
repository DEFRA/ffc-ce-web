function actionsInputsModel (parcelRef, actionId, error) {
  const model = {
    hint: {
      text: `Enter the proposed fence length to apply action ${actionId} to parcel ${parcelRef}`
    },
    label: {
      classes: 'govuk-label--xl',
      isPageHeading: true,
      text: 'Enter a fence length'
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
