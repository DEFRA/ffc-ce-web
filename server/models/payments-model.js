function paymentsModel (eligible, parcelRef, actionTitle, payment, errors) {
  return {
    panel: {
      titleText: 'Application complete',
      html: 'You\'re eligible for a payment'
    },
    error: {
      titleText: 'Application unsuccessful',
      errorList: errors ? errors.map((error) => ({ text: error })) : []
    },
    eligible,
    parcelRef,
    actionTitle,
    payment: payment ? payment.toFixed(2) : ''
  }
}

module.exports = paymentsModel
