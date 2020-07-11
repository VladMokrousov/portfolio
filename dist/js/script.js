window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    //Scroll up
    let buttonUp = document.querySelector('.page-footer__btn');
        
    function scrollTop() {
        
        let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop),
            timerId;
        if(top > 0) {
            window.scrollTo(0,Math.floor(top/1.3)); 
       // Равномерная прокрутка window.scrollBy(0,-70);
        timerId = setTimeout(scrollTop,15);
        } else {
            clearTimeout(timerId);
        }
            
    }
    
    buttonUp.addEventListener("click", scrollTop);
});