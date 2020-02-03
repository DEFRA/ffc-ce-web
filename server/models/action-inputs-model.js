function getTitle (action) {
  return `Enter the ${action.inputs[0].description} in ${action.inputs[0].units}`
}

function getHint (action, parcelRef) {
  // TODO: Unsafe use of potentially unvalidated user input.
  return `What is the ${action.inputs[0].description} you wish to claim for in ${action.inputs[0].units} for ${parcelRef}?`
}

function boundsValid (action) {
  return action && action.input && action.input.upperbound && action.input.lowerbound
}

function getBounds (action) {
  return boundsValid(action) ? action.input : undefined
}

function boundsMessage (bounds) {
  return `Please choose a value between ${bounds.lowerbound} and ${bounds.upperbound}.`
}

function getBoundsHint (action) {
  const bounds = getBounds(action)
  return bounds ? boundsMessage(bounds) : ''
}

function actionsInputsModel (parcelRef, action, error, parcels) {
  if (!action.id) {
    throw new Error('Missing action id')
  }

  const model = {
    hint: {
      text: `${getHint(action, parcelRef)} ${getBoundsHint(action)}`
    },
    label: {
      classes: 'govuk-label--xl',
      isPageHeading: true,
      text: getTitle(action)
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
