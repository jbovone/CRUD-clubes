/// <reference types= "jquery" />

let listActionsCache = {
  deletedIds: [],
  newEntries: [],
  setDeletion(id = 'list-0') {
    this.deletedIds.push(id);
  },
  retrieveQuery() {
    if (!this.deletedIds) {
    }
  },
};

let $targetContainer;
$('.delete').on('click', (e) => {
  $targetContainer = e.target.closest('.media');
});
$('#delete-confirm').on('click', () => {
  $targetContainer.remove();
  listActionsCache.setDeletion($targetContainer.id);
});

$('.read, .update').on('click', (e) => {
  $('#viewer-pop-up .modal-body').empty();
  $targetContainer = e.target.closest('.media');

  const $appendContent = ((viewer, form) => {
    if (e.target.classList.contains('update')) {
      $('#form-save').removeClass('invisible');
      return form;
    }
    $('#form-save').addClass('invisible');
    return viewer;
  })(appendViewer, appendForm);

  Object.entries($targetContainer.dataset).forEach((map) => {
    if (map[0] !== 'id' && map[0] !== 'seedlist') $appendContent(map);
  });
});
function appendForm(map) {
  $('#viewer-pop-up .modal-title').text('Edit Team');
  const $label = $(`<label for="${map[0]}">${map[0]}</label>`);
  const $input = $(`<input id="${map[0]}">`);
  $('#viewer-pop-up .modal-body').append($label, $input);
  $input.val(`${map[1]}`);
}
function appendViewer(map) {
  $('#viewer-pop-up .modal-title').text('Overview Team');
  const $name = $(`<div>${map[0]}:</div>`);
  const $value = $(`<div>${map[1]}</div>`);
  $('#viewer-pop-up .modal-body').append($name, $value);
}

$('#form-save').on('click', () => {
  $('#update-pop-up .modal-body').children('input').each(function(i) {
    $targetContainer.dataset[$(this)[0].id] = $(this)[0].value;
  });
  listActionsCache.newEntries.push($targetContainer.dataset);
});
