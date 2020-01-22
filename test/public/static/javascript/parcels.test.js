const ParcelsPage = require('../../../../server/public/static/javascript/parcels')

const $dom = document.createElement('div')
const inputEvent = new Event('input')

describe('parcels page', () => {
  beforeEach(() => {
    $dom.innerHTML = '' +
      '<input id="parcel-ref-filter" type="text">' +
      '<div class="govuk-radios">' +
        '<div class="govuk-radios__item"><input name="parcelRef" type="radio" value="AB182874871"></div>' +
        '<div class="govuk-radios__item"><input name="parcelRef" type="radio" value="AB182894871"></div>' +
        '<div class="govuk-radios__item"><input name="parcelRef" type="radio" value="EH182358711"></div>' +
        '<div class="govuk-radios__item"><input name="parcelRef" type="radio" value="AB532342134"></div>' +
        '<div class="govuk-radios__item"><input name="parcelRef" type="radio" value="YG823112311"></div>' +
        '<div class="govuk-radios__item"><input name="parcelRef" type="radio" value="ZX393934844"></div>' +
      '</div>'

    new ParcelsPage($dom).init()
  })

  test('hides all parcels if parcel references do not match filter', () => {
    const $filter = $dom.querySelector('#parcel-ref-filter')

    $filter.value = 'FA'
    $filter.dispatchEvent(inputEvent)

    expect($dom.querySelectorAll('.govuk-radios__item:not(.hidden)').length).toBe(0)
  })

  test('does not hide parcels which match filter at beginning of parcel reference', () => {
    const $filter = $dom.querySelector('#parcel-ref-filter')

    $filter.value = 'AB'
    $filter.dispatchEvent(inputEvent)

    expect($dom.querySelectorAll('.govuk-radios__item:not(.hidden)').length).toBe(3)
  })

  test('does not hide parcels which match filter in the middle of parcel reference', () => {
    const $filter = $dom.querySelector('#parcel-ref-filter')

    $filter.value = '828'
    $filter.dispatchEvent(inputEvent)

    expect($dom.querySelectorAll('.govuk-radios__item:not(.hidden)').length).toBe(2)
  })
})
