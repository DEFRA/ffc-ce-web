function getParcels () {
  const parcels = [
    { ref: 'ref1' },
    { ref: 'ref2' }
  ]
  return Promise.resolve(parcels)
}

module.exports = { getParcels }
