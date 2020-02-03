const actionsInputsModel = require('../../server/models/action-inputs-model')
const allParcels = [{ ref: 'AAA', description: 'Test parcel', totalPerimeter: 10, totalArea: 1 }]

describe('actions inputs model', () => {
  test('if error provided, should populate errorMessage', () => {
    const error = 'sample error message'
    const { model } = actionsInputsModel('', {}, error)
    expect(model.errorMessage).toEqual(
      expect.objectContaining({ text: error })
    )
  })

  test('if error isn\'t provided, errorMessage should be omitted', () => {
    const { model } = actionsInputsModel('', {})
    expect(model.errorMessage).toBeUndefined()
  })

  test('label class set to govuk-label--xl', () => {
    const { model } = actionsInputsModel('', {})
    expect(model.label.classes).toBe('govuk-label--xl')
  })

  test('label isPageHeading is true', () => {
    const { model } = actionsInputsModel('', {})
    expect(model.label.isPageHeading).toBeTruthy()
  })

  test('id is actionInput', () => {
    const { model } = actionsInputsModel('', {})
    expect(model.id).toBe('actionInput')
  })

  test('name is actionInput', () => {
    const { model } = actionsInputsModel('', {})
    expect(model.label.classes).toBe('govuk-label--xl')
  })

  test('title and hint refers to fencing for Action ID FG1', () => {
    const parcelRef = 'AB1234'
    const { model } = actionsInputsModel(parcelRef, { id: 'FG1' })
    expect(model.label.text).toBe('Enter a fence length in metres')
    expect(model.hint.text.trim()).toBe(`How long is the fence you want to claim on in metres for ${parcelRef}?`)
  })

  test('title and hint refers to acres for Action ID SW6', () => {
    const parcelRef = 'AB1234'
    const { model } = actionsInputsModel(parcelRef, { id: 'SW6' })
    expect(model.label.text).toBe('Enter the area in hectares')
    expect(model.hint.text.trim()).toBe(`What is the area you wish to claim on in hectares for ${parcelRef}?`)
  })

  test('Parcel data is included in the model when a parcel is included', () => {
    const { parcelModel } = actionsInputsModel('AAA', { id: 'FG1' }, '', allParcels)
    expect(parcelModel.caption).toBe('Parcel Information')
  })

  test('Parcel data is not included in the model when a parcel is not included', () => {
    const { parcelModel } = actionsInputsModel('AAA', { id: 'FG1' }, '', allParcels)
    expect(parcelModel).toMatchObject({})
  })
})
