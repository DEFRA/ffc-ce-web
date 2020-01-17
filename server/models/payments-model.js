
function getPanelValues (eligible, parcelRef, actionId, payment) {
  if (eligible) {
    return {
      titleText: 'You\'re entitled to a payment',
      html: `You are entitled to a payment of <br><strong>£${payment}</strong><br> for carrying out action ${actionId} on parcel ${parcelRef}`
    }
  } else {
    return {
      titleText: 'You\'re not entitled to a payment',
      html: `You are not entitled to a payment for action ${actionId} on parcel ${parcelRef}`
    }
  }
}

function paymentsModel (eligible, parcelRef, actionId, payment) {
  return {
    eligible,
    panel: getPanelValues(eligible, parcelRef, actionId, payment)
  }
}

module.exports = paymentsModel
