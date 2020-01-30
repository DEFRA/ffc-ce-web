const parcelRef = 'parcelRef'

function parcelsModel (parcels, errorMessage) {
  const items = parcels.map(parcel => {
    return {
      value: parcel.ref,
      text: `${parcel.ref} (${parcel.description})`
    }
  })
  const model = {
    idPrefix: parcelRef,
    name: parcelRef,
    hint: {
      text: 'Select a parcel of land for the application'
    },
    items
  }
  if (errorMessage) {
    model.errorMessage = { text: errorMessage }
  }
  return model
}

module.exports = parcelsModel
