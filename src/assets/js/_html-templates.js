import { required } from './_form-validation.js'

export function bodyController(tagName, props){
  if(tagName === 'Delete') {
    return `<div class="modal-body">Are You Sure?</div>`  
  } 
  const appendBody = (() =>{
      if(isEditable(tagName)) return appendForm
      return appendViewer  
  })()
  let $bodyContents = ''
  Object.entries(props).forEach((map) => {  
    $bodyContents+=appendBody(map[0], map[1])
  });
  return`<div class="modal-body">${$bodyContents}</div>`
}
export function footerController(tagName) {
  const type = getStyle(tagName)
  if(tagName === 'Read') return modalFooter(type)
  return modalFooter(type, saveButton(type))
}
export function headerControler(tagName = 'Team', name, href = ''){ 
  const type = getStyle(tagName)
  let icon = ''  
  if(href) icon = `<img src='${href}'/>`
  return modalHeader(`${icon} ${tagName} ${name}`, type)
}
function isEditable(tagName){
    return ['Update', 'Create'].includes(tagName)
 }
function getStyle(tagName){
    if(tagName === 'Delete') return 'danger'
    else return 'primary'
}
function modalHeader(title, type){
  return (
   `<div class="modal-header border-${type}">
     <h5>${title}</h5>
     <button type="button" class="close modal-cross-close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
     </button>
   </div>`
  )
}
function appendViewer(name, value){
  if (name === 'cresturl') return ''
    return (
        `<div>${formatName(name)}</div><div>${value}</div>`  
    )
 }
 function appendForm(name, value){
    const type = ((tag)=>{
     if(tag === 'cresturl') return'file'
     else return'text'
    })(name)    
  let placeholder = ''  
  if(required.includes(name)) placeholder = 'Required Field.' 
  else  placeholder = 'Optional Field.'

   return (
    `<label for="${name}">${formatName(name)}</label> 
     <input id="${name}" placeholder="${placeholder}" type="${type}" value="${value}">
     <span class="text-danger" style="font-size: 12px;"></span>
     `
   )
}
function formatName(name){
   const capitalize = name[0].toUpperCase()
   return name.replace(/\w/,capitalize) + ':' 
}
function modalFooter(type, saveBtn = ''){
    return (
        `<div class="modal-footer border-${type}">
          <div id="status-bar"></div>
         <button type="button" class="btn btn-secondary close-modal" data-dismiss="modal">Close</button> 
         ${saveBtn}
        </div>`
    )
}
function saveButton(type) {
    return `<button type="button" class="btn btn-${type} form-save">Save changes</button>`
}

export const $loading = $('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>')
