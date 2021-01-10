export default () => {
  window.addEventListener('DOMContentLoaded', () => {
    let btnMenu = document.querySelector('.btn-menu');
    const minTabletWidth = 768;
    const topForMenuMobile = 52;
    const topForMenuTablet = 62;

    const checkScrollHeight = () => {
      if (
        (document.documentElement.clientWidth < minTabletWidth &&
          window.pageYOffset >= document.documentElement.clientHeight - topForMenuMobile) ||
        (document.documentElement.clientWidth >= minTabletWidth &&
          window.pageYOffset >= document.documentElement.clientHeight - topForMenuTablet)
      ) {
        btnMenu.classList.add('scrolled');
      } else {
        btnMenu.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', checkScrollHeight);
  });
};
