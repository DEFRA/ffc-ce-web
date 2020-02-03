const wreck = require('@hapi/wreck')
jest.mock('@hapi/wreck')
wreck.defaults.mockImplementation(() => wreck)
const actionsService = require('../../server/services/actions-service')

describe('actionService', () => {
  describe('getActions', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('get actions return JSON', async () => {
      const mockActions = { payload: { actions: [{ id: '1', description: 'an action' }] } }
      wreck.get.mockResolvedValue(mockActions)
      const result = await actionsService.getActions('AB12345678')
      expect(result).toBeDefined()
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual(mockActions.payload.actions[0])
    })

    test('get actions returns empty array for empty payload', async () => {
      wreck.get.mockResolvedValue({})
      const result = await actionsService.getActions('AB12345678')
      expect(result).toBeDefined()
      expect(result.length).toEqual(0)
    })
  })

  describe('getActionWithInput', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
  })
})
