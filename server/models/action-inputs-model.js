function getTitle (actionId) {
  return actionId === 'FG1' ? 'Enter a fence length in metres' : 'Enter the area in hectares'
}

function getHint (actionId, parcelRef) {
  // TODO: Unsafe use of potentially unvalidated user input.
  return actionId === 'FG1' ? 'How long is the fence you want to claim on in metres for ?' : 'What is the area you wish to claim on in hectares for ?'
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

function actionsInputsModel (parcelRef, action, error, parcels) {
  console.log({ action })
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
