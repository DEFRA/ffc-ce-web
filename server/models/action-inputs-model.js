function getTitle (actionId) {
  return actionId === 'FG1' ? 'Enter a fence length in metres' : 'Enter the area in hectares'
}

function getHint (actionId) {
  // TODO: Unsafe use of potentially unvalidated user input.
  return actionId === 'FG1' ? 'How long is the fence you want to claim for in metres?' : 'What is the area you wish to claim for in hectares?'
}

function actionsInputsModel (parcelRef, actionId, error, parcels) {
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
  let parcelModel = {}
  if (Array.isArray(parcels)) {
    const parcel = parcels.find(x => x.ref === parcelRef)
    if (parcel) {
      parcelModel = {
        caption: 'Parcel Information',
        captionClasses: 'govuk-label--l',
        firstCellIsHeader: true,
        rows: [
          [{
            text: 'Parcel Ref'
          },
          {
            text: parcel.ref
          }
          ],
          [{
            text: 'Description'
          },
          {
            text: parcel.description
          }
          ],
          [{
            text: 'Total Perimeter (m)'
          },
          {
            text: parcel.totalPerimeter.toFixed(2)
          }],
          [{
            text: 'Total Area (ha)'
          },
          {
            text: parcel.totalArea.toFixed(3)
          }

          ]
        ]
      }
    }
  }

  const retModel = { model, parcelModel }

  return retModel
}

module.exports = actionsInputsModel
