const parcelModel = require('../../server/models/parcels-model')

describe('parcelModel', () => {
  test('parcels model should set items value and text, and error message', () => {
    const parcel = { ref: 'ref1', description: 'testParcel' }
    const errorMessage = 'error'
    const model = parcelModel([parcel], errorMessage)
    expect(model).toBeDefined()
    expect(model.items).toBeDefined()
    expect(model.items.length).toEqual(1)
    expect(model.items[0].value).toEqual(parcel.ref)
    expect(model.items[0].text).toEqual(`${parcel.ref} (${parcel.description})`)
    expect(model.errorMessage.text).toEqual(errorMessage)
  })

  test('parcels model should omit errorMessage if no error is provided', () => {
    const model = parcelModel([{ ref: 'ref1' }])
    expect(model.errorMessage).toBeUndefined()
  })
})
