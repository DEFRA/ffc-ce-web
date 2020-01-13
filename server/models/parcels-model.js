const parcelRef = 'parcelRef'

function parcelsModel (parcels, errorMessage) {
  const items = parcels.map(parcel => {
    return { value: parcel.ref, text: parcel.ref }
  })
  return {
    idPrefix: parcelRef,
    name: parcelRef,
    fieldset: {
      legend: {
        text: 'Select a parcel',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--xl'
      }
    },
    hint: {
      text: 'Select a parcel of land for the scheme'
    },
    items,
    errorMessage: {
      text: errorMessage
    }
  }
}

module.exports = parcelsModel
