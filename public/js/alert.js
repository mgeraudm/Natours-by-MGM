/*eslint-disable*/
export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

//type is either success or error for CSS catching it
export const showAlert = (type, msg, time = 5) => {
  hideAlert();
  //console.log('success alert');
  const markup = `<div class="alert alert--${type}>${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};
