"use strict";
(function(){
//Этот модуль нужен для разворачивания и сворачивания списка "Технологии и особенности"
var btn = document.querySelector('.project-description__btn-for-ul');
var li = document.querySelectorAll('.project-description__item--technologies');

btn.addEventListener('click', function(){
for(let i = 0; i < li.length; i++){
  if(li[i].classList.contains('project-description__item--temporarily-hidden')){
    li[i].classList.remove('project-description__item--temporarily-hidden');
    li[i].classList.add('project-description__item--temporarily-show');
    btn.classList.add('project-description__btn-for-ul--ul-show');
    btn.textContent = "Свернуть";
  }
  else if(li[i].classList.contains('project-description__item--temporarily-show')){
    li[i].classList.remove('project-description__item--temporarily-show');
    li[i].classList.add('project-description__item--temporarily-hidden');
    btn.classList.remove('project-description__btn-for-ul--ul-show');
    btn.textContent = "Показать все";
  }
}
});


})();