export default () => {
  window.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.project-preview');

    const setFullscreenHeight = () => {
      section.style.minHeight = document.documentElement.clientHeight + 'px';
    };
    setFullscreenHeight();
    window.addEventListener('resize', setFullscreenHeight);
  });
};
