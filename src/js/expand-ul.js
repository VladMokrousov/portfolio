export default () => {
  const btn = document.querySelector('.project-description__btn');
  const liArr = document.querySelectorAll('.project-description__item--technologies');

  btn.addEventListener('click', function () {
    for (let i = 0; i < liArr.length; i++) {
      if (liArr[i].classList.contains('project-description__item--temporarily-hidden')) {
        liArr[i].classList.remove('project-description__item--temporarily-hidden');
        btn.style.display = 'none';
      }
    }
  });
};
