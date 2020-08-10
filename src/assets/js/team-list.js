
import { headerControler, bodyController, footerController } from './_html-templates.js'
import { animateSending } from './_ui-visuals.js'
import {validateInputEvent, validateAllFields as allFieldsGreen } from './_form-validation.js'
/// <reference types= "jQuery" />


let tagName = ''
let $targetContainer;
$('.Read, .Update, .Create, .Delete').on('click',function(e) {
  tagName = this.className.match(/[CRUD].+/)[0];
  $targetContainer = e.target.closest('.media') || createContainer()
  createModal($targetContainer.dataset)
});

function createModal(props){
  $('#viewer-pop-up .modal-dialog').empty()
  const { id, seedlist, ...publicValues} = props
  const { name, cresturl } = props

  const $newModal = $(`<div class="modal-content pop-up">
  ${headerControler(tagName, name, cresturl)}
  ${bodyController(tagName, publicValues)}
  ${footerController(tagName)}
  </div>`)
  $('.modal-body').text('')
  $('#viewer-pop-up .modal-dialog').append($newModal)
  $('input').on('change', validateInputEvent)
  $('.form-save').on('click', () => {
    if(!allFieldsGreen()) return
    const { dataset }  = $targetContainer
    $('input').each(function () {dataset[this.id] = this.value || $('input[type=file]').attr('value')}) 
    console.log(dataset, 'DATASET')
    dataset.action = tagName
    let request = new FormData();
    let file;  
    try { file = $('#cresturl')[0].files[0] } catch { file = null }
    if(file) request.append('avatar', file);
    request.append('entries', JSON.stringify(dataset));
    animateSending($('.form-save')[0])

    $.ajax({
      'method': 'POST',
      'url': '/postTeam',
      'data': request,
      'contentType': false,
      'processData': false,
      'enctype': 'multipart/form-data',

    }).done((serverResponse, param2, param3)=>{
      $('#status-bar').text(serverResponse)
      setTimeout(()=>{
      animateSending($('.form-save')[0], true)
      $('.close-modal').on('click', ()=> location.reload())
      $('.close-modal').text('Refresh Page') 
      },500)
    })
  });
}

function createContainer() {
  const $newMedia = $('.media').clone()[0]
  Object.keys($newMedia.dataset).forEach(key => $newMedia.dataset[key] = '')
  return $newMedia
}

/* paginator logics */

function setPage(paginate, element) {
  const pageNumber = Number(String(window.location).split('=')[1])
  const valid = $('.pagination a').text().match(/\d/g).includes(String(pageNumber + paginate))
  if (valid) {
    return `/teams?page=${pageNumber + paginate}`
  }
  else {
    element.addClass('disabled')
    return ''
  }
}

document.querySelector('.Next').setAttribute('href', setPage(1, $('.Next')))
document.querySelector('.Previous').setAttribute('href', setPage(-1, $('.Previous')))
