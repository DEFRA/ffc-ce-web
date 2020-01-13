const actionModel = require('../../server/models/actions-model')

describe('actionsModel', () => {
  test('actions model should set items value and text, and error message', () => {
    const action = {
      id: 'id1',
      description: 'description'
    }
    const parcelRef = 'ref1'
    const errorMessage = 'error'
    const model = actionModel([action], parcelRef, errorMessage)
    expect(model).toBeDefined()
    expect(model.items).toBeDefined()
    expect(model.items.length).toEqual(1)
    expect(model.items[0].value).toEqual(action.id)
    expect(model.items[0].text).toEqual(`${action.id}: ${action.description}`)
    expect(model.errorMessage.text).toEqual(errorMessage)
    expect(model.hint.text).toEqual(`Select an action to apply to parcel ${parcelRef}`)
  })
})
