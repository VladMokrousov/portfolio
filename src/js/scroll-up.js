export default () => {
  window.addEventListener('DOMContentLoaded', () => {
    let btnUp = document.querySelector('.btn-up');

    const scrollTop = () => {
      let top = window.pageYOffset;

      if (top > 0) {
        window.scrollTo(0, Math.floor(top / 1.3));
        // Равномерная прокрутка window.scrollBy(0,-70);
        let timerId = setTimeout(scrollTop, 15);
      }
    };

    const checkScrollHeight = () => {
      if (window.pageYOffset > document.documentElement.clientHeight * 2) {
        btnUp.style.opacity = 1;
        btnUp.style.cursor = 'pointer';
        btnUp.disabled = false;
      } else {
        btnUp.style.opacity = 0;
        btnUp.style.cursor = 'auto';
        btnUp.disabled = true;
      }
    };

    window.addEventListener('scroll', checkScrollHeight);
    btnUp.addEventListener('click', scrollTop);
  });
};
