const actionsInputsModel = require('../../server/models/action-inputs-model')
const allParcels = [{ ref: 'SD74445738', description: 'Test parcel', totalPerimeter: 10, totalArea: 1 }]

describe('actions inputs model', () => {
  const actions = {
    fg6: {
      id: 'FG1',
      input: {
        unit: 'metres',
        description: 'fence length'
      }

    },
    sw6: {
      id: 'SW6',
      input: {
        unit: 'hectares',
        description: 'winter crops area'
      }

    }
  }
  test('if error provided, should populate errorMessage', () => {
    const error = 'sample error message'
    const { model } = actionsInputsModel('SD74445738', actions.fg6, error)
    expect(model.errorMessage).toEqual(
      expect.objectContaining({ text: error })
    )
  })

  test('if error isn\'t provided, errorMessage should be omitted', () => {
    const { model } = actionsInputsModel('SD74445738', actions.fg6)
    expect(model.errorMessage).toBeUndefined()
  })

  test('label class set to govuk-label--xl', () => {
    const { model } = actionsInputsModel('SD74445738', actions.fg6)
    expect(model.label.classes).toBe('govuk-label--xl')
  })

  test('label isPageHeading is true', () => {
    const { model } = actionsInputsModel('SD74445738', actions.fg6)
    expect(model.label.isPageHeading).toBeTruthy()
  })

  test('id is actionInput', () => {
    const { model } = actionsInputsModel('SD74445738', actions.fg6)
    expect(model.id).toBe('actionInput')
  })

  test('name is actionInput', () => {
    const { model } = actionsInputsModel('SD74445738', actions.fg6)
    expect(model.label.classes).toBe('govuk-label--xl')
  })

  test('title and hint refers to fencing for Action ID FG1', () => {
    const parcelRef = 'AB1234'
    const { model } = actionsInputsModel(parcelRef, actions.fg6)
    expect(model.label.text).toBe('Enter the fence length in metres')
    expect(model.hint.text.trim()).toBe(`What is the fence length you wish to claim for in metres for ${parcelRef}?`)
  })

  test('title and hint refers to acres for Action ID SW6', () => {
    const parcelRef = 'AB1234'
    const { model } = actionsInputsModel(parcelRef, actions.sw6)
    expect(model.label.text).toBe('Enter the winter crops area in hectares')
    expect(model.hint.text.trim()).toBe(`What is the winter crops area you wish to claim for in hectares for ${parcelRef}?`)
  })

  test('Parcel data is included in the model when a parcel is included', () => {
    const parcelModel = actionsInputsModel('SD74445738', actions.fg6, '', allParcels).parcelModel
    expect(parcelModel.caption).toBe('Parcel Information')
  })

  test('Parcel data is not included in the model when a parcel is not included', () => {
    const { parcelModel } = actionsInputsModel('', actions.fg6, '', allParcels)
    expect(parcelModel).toMatchObject({})
  })
})
