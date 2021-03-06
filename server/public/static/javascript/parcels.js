function ParcelsPage ($module) {
  this.$module = $module
}

ParcelsPage.prototype.init = function () {
  const $module = this.$module
  if (!$module) {
    return
  }

  const $filter = $module.querySelector('#parcel-ref-filter')
  const $parcels = $module.querySelectorAll('.govuk-radios__item')

  $filter.addEventListener('input', event => filterParcels(event.target, $parcels))
}

function filterParcels ($filter, $parcels) {
  const filterIsEmpty = $filter.value.length === 0
  const filter = $filter.value.toUpperCase()

  $parcels.forEach($parcel => {
    const parcelRef = $parcel.querySelector('input[name=parcelRef]').value
    const parcelMatchesInput = new RegExp(filter).test(parcelRef.toUpperCase())

    if (filterIsEmpty || parcelMatchesInput) {
      $parcel.classList.remove('hidden')
    } else {
      $parcel.classList.add('hidden')
    }
  })
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParcelsPage
}
