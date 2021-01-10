export default () => {
  const btnOpen = document.querySelector('.btn-menu');
  btnOpen.addEventListener('click', () => {
    document.querySelector('.navigation').style.right = '0';
    document.querySelector('body').style.overflowY = 'hidden';
  });
  const btnClose = document.querySelector('.navigation__close');
  btnClose.addEventListener('click', () => {
    document.querySelector('.navigation').style.right = '-100%';
    document.querySelector('body').style.overflowY = 'visible';
  });
};
