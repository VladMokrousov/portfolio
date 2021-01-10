export default () => {
  const arrow = document.querySelector('.project-preview__arrow-bottom');
  arrow.addEventListener('click', () => {
    document.querySelector('.project-description').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
};
