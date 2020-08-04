/// <reference types= "jQuery" />

document.querySelector('.Next').setAttribute('href',  setPage(1, $('.Next')))
document.querySelector('.Previous').setAttribute('href', setPage(-1, $('.Previous')))

let listActionsCache = {
  deletedIds: [],
  newEntries: [],
  setDeletion(id = 'list-0') {
    this.deletedIds.push(id);
    updateStatus()
  },
  setNewEntrie(entrie){
   this.newEntries.push(entrie)
   updateStatus()
  }
};

let changesStaged = false
let $targetContainer;
let tagName = ''

$('.Read, .Update, .Delete, .Create').on('click', async function(e) {
  cleanModal();
  tagName = this.classList.match(/[CRUD].+/)
  $targetContainer = e.target.closest('.media') || getNewMediaContainer()
  const assingModal = ((viewer, form) => {
    if (isEditable(tagName)) {
      return form;
    }
    return viewer;
  })(appendViewer, appendForm);
  dumpDataset($targetContainer.dataset, assingModal)
});
$('#form-save').on('click', () => {
  changesStaged = true 
});
$('#close-modal').on('click', ()=>{
  if(changesStaged  === true){
    crudActions[tagName]
    changesStaged  = false
  }
}) 
const crudActions = {
  Create(){
    document.querySelector('.media').before($targetContainer)
    $targetContainer.dataset.id = 'PRE_TAG_NEW_ITEM' 
    listActionsCache.setNewEntrie($targetContainer.dataset);
  },
  Update(){
    listActionsCache.setNewEntrie($targetContainer.dataset);
    dumpNewDataInContainer()
    showcaseNewEntrie()
  },
  Delete(){
    $targetContainer.remove();
    listActionsCache.setDeletion($targetContainer.id);
  },
}

function dumpDataset(containerDataset){
  Object.entries(containerDataset).forEach((map) => {
    if (map[0] !== 'id' && map[0] !== 'seedlist') assingModal(map[0], map[1], tagName);
  });
}
function getNewMediaContainer(){
  stateCreatingTeam = true
  const $newMedia = $('.media').clone()[0]
  $newMedia.dataset = $('#team-list')[0].dataset //this one is empty
  return $newMedia
}
function appendForm(name, value, tag) {
  $('#form-save').removeClass('invisible');
  $('#viewer-pop-up .modal-title').text(`${tag} Team`);
  const $label = $(`<label for="${name}">${name}</label>`);
  const $input = $(`<input id="${name}">`);
  $('#viewer-pop-up .modal-body').append($label, $input);
  $input.val(`${value}`);
}
function appendViewer(name, value, title = 'Overview Team') {
  $('#form-save').addClass('invisible');
  $('#viewer-pop-up .modal-title').text(title);
  const $name = $(`<div>${name}</div>`);
  const $value = $(`<div>${value}</div>`);
  $('#viewer-pop-up .modal-body').append($name, $value);
}
function isEditable(modal){
 return ['Update', 'Create'].includes(modal)
}
function cleanModal(){
  $('#viewer-pop-up .modal-body').empty()
}

$('#send-data-button').on('click', function(){
  animateSending(this)
  $.ajax({
    "method": "POST",
    "url": "http://localhost:8080/posteam",
    "contentType": "application/json",
    "data": JSON.stringify(listActionsCache)
  }).done((serverResponse, param2, param3)=>{
    console.log(param2, param3)
    updateStatus(true, serverResponse)
  })
})
function animateSending(element, staging){
  if(!staging){
    element.setAttribute('disabled', true)
    element.innerText =' Sending...'
    $('#send-data-button').prepend($loading)
  } else{
    element.removeAttribute('disabled', false),
    $loading.remove()
    element.innerText ='Send Data'
  }
}
function dumpNewDataInContainer(){
  $('#viewer-pop-up .modal-body').children('input').each(function() {
    $targetContainer.dataset[$(this)[0].id] = $(this)[0].value;
  });
}
function showcaseNewEntrie(){
  const updateMedia = [$targetContainer.dataset.name, $targetContainer.dataset.founded, $targetContainer.dataset.venue]
  $targetContainer.querySelectorAll('h4, p').forEach((element, i) => element.innerText = updateMedia[i]);
  $targetContainer.querySelector('img').setAttribute('src', $targetContainer.dataset.crestUrl)
}
function setPage(paginate, element){
  const pageNumber = Number(String(window.location).split('=')[1]) 
  const valid = $('.pagination a').text().match(/\d/g).includes(String(pageNumber + paginate))
  if(valid){
    return `/teams?page=${pageNumber + paginate}` 
  } else {
    element.addClass('disabled')
    return ''
  }
}
function updateStatus(cancel = false, message){
  $('#status-bar').text('Unsaved Changes')
  $('#status-bar').addClass('active-changes')
  if(cancel){
    $('#status-bar').text(message)
    $('#status-bar').removeClass('active-changes')
  }
}