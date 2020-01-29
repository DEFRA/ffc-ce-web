
function paymentsModel (eligible, parcelRef, actionId, payment) {
  return {
    panel: {
      titleText: 'Application complete',
      html: `${eligible ? 'You\'re' : 'You\'re not'} eligible for a payment`
    },
    eligible,
    parcelRef,
    actionId,
    payment: payment ? payment.toFixed(2) : ''
  }
}

module.exports = paymentsModel
