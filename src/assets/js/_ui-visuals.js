import {$loading} from './_html-templates.js'
export function showcaseNewEntrie(container) {
    const { name, founded, venue, cresturl } = container.dataset
    const updateMedia = [name, founded, venue]
    container.querySelectorAll('h4, p').forEach((element, i) => element.innerText = updateMedia[i]);    
    container.querySelector('img').setAttribute('src', cresturl)
}
export function animateSending(element, staging) {
  if (!staging) {
    element.setAttribute('disabled', true)
    element.innerText = ' Sending...'
    $('#send-data-button').prepend($loading)
  } else {
    element.removeAttribute('disabled', false), $loading.remove()
    element.innerText = 'Send Data'
  }
}
export function updateStatus(cancel = false, message) {
  $('#status-bar').text('Unsaved Changes')
  $('#status-bar').addClass('active-changes')
  if (cancel) {
    $('#status-bar').text(message)
    $('#status-bar').removeClass('active-changes')
  }
}
