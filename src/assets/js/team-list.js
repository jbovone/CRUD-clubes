/// <reference types= "jquery" />

let listActionsCache = {
  deletedIds: [],
  newEntries: [],
  setDeletion(id = 'list-0') {
    this.deletedIds.push(id);
    $('#status-bar').text('Unsaved Changes')
  },
  setNewEntrie(entrie){
   this.newEntries.push(entrie)
    $('#status-bar').text('Unsaved Changes')
  }
};
let stateCreatingTeam = false

let $targetContainer;
$('.Read, .Update, .Delete').on('click', function(e) {
  const tagName = setTagName(this)
  $targetContainer = e.target.closest('.media')
  if(tagName === 'Delete') return
  const assingModal = ((viewer, form) => {
    if (isEditable(tagName)) {
      return form;
    }
    return viewer;
  })(appendViewer, appendForm);

  $('#viewer-pop-up .modal-body').empty();
  Object.entries($targetContainer.dataset).forEach((map) => {
    if (map[0] !== 'id' && map[0] !== 'seedlist') assingModal(map[0], map[1], tagName);
  });
});

function setTagName(element){
  return ['Read', 'Update', 'Delete'].filter(tag=>element.classList.contains(tag))[0]
}
$('.Create').on('click', function(e){ // integrar esto a la funcion anterior pordria ser deseable.
  $('#viewer-pop-up .modal-body').empty()
  $targetContainer = $('.media').clone()[0]
  const data = document.querySelector('#team-list').dataset
   Object.keys(data).forEach((key) => {
    if (key !== 'id' && key !== 'seedlist') appendForm(key, '', 'Create');
  })
  stateCreatingTeam = true
})
function appendForm(name, value, tag) {
  $('#form-save').removeClass('invisible');
  $('#viewer-pop-up .modal-title').text(`${tag} Team`);
  const $label = $(`<label for="${name}">${name}</label>`);
  const $input = $(`<input id="${name}">`);
  $('#viewer-pop-up .modal-body').append($label, $input);
  $input.val(`${value}`);
}
function appendViewer(name, value) {
  $('#form-save').addClass('invisible');
  $('#viewer-pop-up .modal-title').text('Overview Team');
  const $name = $(`<div>${name}</div>`);
  const $value = $(`<div>${value}</div>`);
  $('#viewer-pop-up .modal-body').append($name, $value);
}
function isEditable(modal){
  let editable = false
  if (modal === 'Update'){
    editable = true
  }
  return editable
}

$('#form-save').on('click', () => {
  $('#viewer-pop-up .modal-body').children('input').each(function(i) {
    $targetContainer.dataset[$(this)[0].id] = $(this)[0].value;
  });
  const updateMedia = [$targetContainer.dataset.name, $targetContainer.dataset.founded, $targetContainer.dataset.venue]
  $targetContainer.querySelectorAll('h4, p').forEach((element, i) => element.innerText = updateMedia[i]);
  if(stateCreatingTeam === true){
    stateCreatingTeam = false
    document.querySelector('.media').before($targetContainer)
    $targetContainer.dataset.id = document.querySelectorAll('.media').length + 1 
    $targetContainer.querySelector('img').setAttribute('src', $targetContainer.dataset.crestUrl)
  }  
  listActionsCache.setNewEntrie($targetContainer.dataset);
  console.log(listActionsCache)
});


$('#delete-confirm').on('click', () => {
  $targetContainer.remove();
  listActionsCache.setDeletion($targetContainer.id);
});


const $loading = $('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>') 
$('#send-data-button').on('click', function(){
  animateSending(this)
  $.ajax({
    "method": "POST",
    "url": "http://localhost:8080/posteam",
    "contentType": "application/json",
    "data": JSON.stringify(listActionsCache)
  }).done(
    setTimeout(()=>{   
      animateSending(this, true) 
  }, 500)
  )
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
