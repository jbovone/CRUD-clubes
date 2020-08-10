export const required = ['name', 'venue', 'founded']
const statusErrors = {
  maxLength: 'Field max-length of 40 characters.\n',
  requiredField: 'Field Required.\n'
}  
export function validateInputEvent(e){
  const errors = validateField(e.target.id, e.target.value.length)
  let errorReport = ''
  
  Object.keys(errors).forEach(error =>{
    if(errors[error]) errorReport+=statusErrors[error]
  })

  if(!errorReport) toogleSuccess(e.target)
  else toogleDanger(e.target)
  
  const $statusField = document.querySelector(`#${e.target.id} + span`);  
  $statusField.textContent = errorReport;
} 
function validateField(elementId, fieldLength){
  const maxLength = Boolean(fieldLength >= 50) 
  const requiredField = Boolean(required.includes(elementId) && fieldLength === 0)
  return { maxLength, requiredField }
}
 
export function validateAllFields(){
  let valid = true; 
  const $inputs = document.querySelectorAll('input');
  for (let i = 0; i < $inputs.length; i++) {
    const errors = validateField($inputs[i].id, $inputs[i].value.length);
    const errorKeys = Object.keys(errors)
    for (let j = 0; j < errorKeys.length; j++) {
      if(errors[errorKeys[j]]) {
        valid = false;
        break;
      }     
    }
    if (!valid) break;
  }  
  return valid
}
function toogleSuccess(input){
  input.classList.remove('border-danger');
  input.classList.add('border-success');
}
function toogleDanger(input){
  input.classList.add('border-danger');
  input.classList.remove('border-success');
}
