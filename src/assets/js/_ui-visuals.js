import { $loading } from './_html-templates.js'

export function animateSending(element, staging) {
  if (!staging) {
    element.setAttribute('disabled', true)
    element.innerText = ' Sending...'
    $('.form-save').prepend($loading)
  } else {
    element.removeAttribute('disabled', false), $loading.remove()
    element.innerText = 'Send Data'
  }
}
