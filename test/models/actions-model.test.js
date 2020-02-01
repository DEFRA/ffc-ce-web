const actionModel = require('../../server/models/actions-model')

describe('actionsModel', () => {
  test('actions model should set items value and text, and error message', () => {
    const badAction = {
      id: 'id1',
      description: 'description',
      eligible: false,
      reason: 'bad action'
    }

    const goodAction = {
      id: 'id2',
      description: 'description',
      eligible: true
    }

    const parcelRef = 'ref1'
    const errorMessage = 'error'
    const model = actionModel([goodAction, badAction], parcelRef, errorMessage)

    expect(model).toBeDefined()
    expect(model.selectModel).toBeDefined()
    expect(model.selectModel.items.length).toEqual(1)
    expect(model.selectModel.items[0].value).toEqual(goodAction.id)
    expect(model.selectModel.items[0].text).toEqual(`${goodAction.id}: ${goodAction.description}`)
    expect(model.selectModel.errorMessage.text).toEqual(errorMessage)
    expect(model.selectModel.hint.text).toEqual(`Select an action to apply to parcel ${parcelRef}`)

    expect(model.ineligibleModel).toBeDefined()
    expect(model.ineligibleModel.rows.length).toEqual(1)
    expect(model.ineligibleModel.rows[0][0].text).toEqual(`${badAction.id}: ${badAction.description}`)
    expect(model.ineligibleModel.rows[0][1].text).toEqual(badAction.reason)
  })

  test('actions model should omit errorMessage if no error is provided', () => {
    const model = actionModel([{ id: 'id1', description: 'desc' }], 'ref1')
    expect(model.errorMessage).toBeUndefined()
  })
})
