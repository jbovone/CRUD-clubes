
import {headerControler, bodyController, footerController} from './_html-templates.js'
import {animateSending, showcaseNewEntrie, updateStatus} from './_ui-visuals.js'
/// <reference types= "jQuery" />

let listActionsCache = { //quiza una clase o un proto sea mejor
  deletedIds: [],
  newEntries: [],
  setDeletion(id) {
    this.deletedIds.push(id);
    updateStatus()
  },
  setNewEntrie(entrie) {
    this.newEntries.push(entrie)
    updateStatus()
  }
};

let changesStaged = false
let $targetContainer;
let tagName = ''

$('.Read, .Update, .Create, .Delete').on('click',function(e) {
  tagName = this.className.match(/[CRUD].+/)[0];
  $targetContainer = e.target.closest('.media') || createContainer()
  createModal($targetContainer.dataset) 
});

function createModal(props){
  $('#viewer-pop-up .modal-dialog').empty()
  delete props.seedlist
  delete props.id
  const {cresturl, name } = props 
  const $newModal = $(`<div class="modal-content pop-up">
  ${headerControler(tagName, name, cresturl)}
  ${bodyController(tagName, props)}
  ${footerController(tagName)}
  </div>`)

  $('#viewer-pop-up .modal-dialog').append($newModal)

  $('.modal-cross-close').on('click', () => {
    console.log('clicked')
    changesStaged = false; 
  });
  $('.form-save').on('click', () => {
    console.log(changesStaged, 'clicked')
    changesStaged = true; 
  });
  $('.close-modal').on('click', () => {
    console.log('clicked')
    if (tagName === 'Read') return
    if (changesStaged === true) {
      console.log(listActionsCache.newEntries)
      crudActions[tagName]()
      changesStaged = false
    }
  })
}

const crudActions = {
  Create() {
    document.querySelector('.media').before($targetContainer)
    $targetContainer.dataset.id = 'PRE_TAG_NEW_ITEM'
    $targetContainer.id = ''
    this.Update()
  },
  Update() {
    dumpNewDataInDataset()
    showcaseNewEntrie($targetContainer)
    listActionsCache.setNewEntrie($targetContainer.dataset);
  },
  Delete() {
    $targetContainer.remove();
    listActionsCache.setDeletion($targetContainer.id);
  },
}
function createContainer() {
  const $newMedia = $('.media').clone(true)[0] //true~attach listeners
  Object.keys($newMedia.dataset).forEach(key => $newMedia.dataset[key] = '')
  return $newMedia
}
function dumpNewDataInDataset() {
  $('#viewer-pop-up .modal-body').children('input').each(function() {
    $targetContainer.dataset[$(this)[0].id] = $(this)[0].value || 
    document.querySelector('input[type=file]').getAttribute('value');
    console.log(document.querySelector('input[type=file]'), 'FILE')
    console.log( document.getElementById("cresturl").files)

  });
}
$('#send-data-button').on('click', function() {
  animateSending(this)
  $.ajax({
    'method': 'POST',
    'url': 'http://localhost:8080/posteam',
    'contentType': 'application/json',
    'data': JSON.stringify(listActionsCache)
  }).done((serverResponse, param2, param3)=>{
      listActionsCache.deletedIds = []
      listActionsCache.newEntries = []
      setTimeout(()=>{
      animateSending(this, true)
      updateStatus(true, serverResponse)
      },500)
  })
})


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
