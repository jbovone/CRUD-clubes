export function appendForm(name, value, tag) {
  $('#form-save').removeClass('invisible');
  $('#viewer-pop-up .modal-title').text(`${tag} Team`);
  const $label = $(`<label for="${name}">${name}</label>`);
  const $input = $(`<input id="${name}">`);
  $('#viewer-pop-up .modal-body').append($label, $input);
  $input.val(`${value}`);
}
export function appendViewer(name, value) {
  $('#form-save').addClass('invisible');
  $('#viewer-pop-up .modal-title').text('Overview Team');
  const $name = $(`<div>${name}</div>`);
  const $value = $(`<div>${value}</div>`);
  $('#viewer-pop-up .modal-body').append($name, $value);
}
