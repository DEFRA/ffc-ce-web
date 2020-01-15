
function paymentsModel (entitled, payment) {
  if (entitled && payment === undefined) {
    throw new Error('payment should be provided if entitled is true')
  }
  return {
    entitled,
    payment: payment || 0
  }
}

module.exports = paymentsModel
