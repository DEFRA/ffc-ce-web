function ParcelsPage ($module) {
  this.$module = $module
}

ParcelsPage.prototype.init = function () {
  const $module = this.$module
  if (!$module) {
    return
  }

  $filter = $module.querySelector('#parcel-ref-filter')
  $parcels = $module.getElementsByClassName('govuk-radios__item')

  $filter.addEventListener('input', event => filterParcels(event.target, $parcels))
}

function filterParcels ($filter, $parcels) {
  const filterIsEmpty = $filter.value.length === 0

  for (let parcelIndex in $parcels) {
    if ($parcels.hasOwnProperty(parcelIndex)) {
      const $parcel = $parcels[parcelIndex]
      const parcelRef = $parcel.querySelector('input[name=parcelRef]').value

      const parcelMatchesInput = new RegExp($filter.value).test(parcelRef)

      if (filterIsEmpty || parcelMatchesInput) {
        $parcel.classList.remove('hidden')
      } else {
        $parcel.classList.add('hidden')
      }
    }
  }
}

new ParcelsPage(document).init()
