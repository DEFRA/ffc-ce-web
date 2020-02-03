const wreck = require('@hapi/wreck')
jest.mock('@hapi/wreck')
const config = require('../../server/config')
jest.mock('../../server/config', () => ({ paymentUrl: 'paymentUrl' }))
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

    test('queries correct endpoint with given parcel ref and action id', () => {
      const parcelRef = 'AA12345678'
      const actionId = 'aaa111'
      actionsService.getActionWithInput(parcelRef, actionId)
      expect(wreck.get).toHaveBeenCalledWith(
        `${config.paymentUrl}/parcels/${parcelRef}/actions/${actionId}`,
        expect.objectContaining({ json: true })
      )
    })

    test('returns action data from payload', async () => {
      const payload = {
        action: {
          id: 'action-1',
          description: 'action',
          input: {
            unit: 'parsecs',
            description: 'Parsecs',
            lowerbound: 0.1,
            upperbound: 2
          }
        }
      }
      wreck.get.mockResolvedValue({ payload })
      const actionWithInput = await actionsService.getActionWithInput('AA12345678', 'aaa111')
      expect(actionWithInput).toEqual(
        expect.objectContaining(payload)
      )
    })
  })
})
