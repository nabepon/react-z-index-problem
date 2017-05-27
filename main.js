const $ = (e) => {
  const el = typeof e === 'string' ? document.querySelector(e) : e;
  return {
    addEvent: (ev, cb) => el.addEventListener(ev, cb, false),
    addClass: (name) => el.classList.add(name),
    removeClass: (name) => el.classList.remove(name),
    hasClass: (name) => el.classList.contains(name),
    el: el,
  }
};

const $btnInfoList = $('.btnInfoList');
const $infoList = $('.infoList');
$btnInfoList.addEvent('click', ()=>{
  $infoList.hasClass('isOpen')
    ? $infoList.removeClass('isOpen')
    : $infoList.addClass('isOpen');
});
$infoList.addEvent('click', ()=>$infoList.removeClass('isOpen'));

const $btn$drawerMenu = $('.btnDrawerMenu');
const $drawerMenu = $('.drawerMenu');
$btn$drawerMenu.addEvent('click', ()=>$drawerMenu.addClass('isOpen'));
$drawerMenu.addEvent('click', ()=>{
  $drawerMenu.addClass('isOpening');
  $drawerMenu.removeClass('isOpen');
  setTimeout(()=>$drawerMenu.removeClass('isOpening'), 400);
});

const $btnModal = $('.btnModal');
const $modal = $('.modal');
$btnModal.addEvent('click', ()=>$modal.addClass('isOpen'));
$modal.addEvent('click', ()=>{
  $modal.addClass('isOpening');
  $modal.removeClass('isOpen');
  setTimeout(()=>$modal.removeClass('isOpening'), 400);
});

const $header = $('.header');
$(window).addEvent('scroll', ()=>{
  window.scrollY < 150
    ? (()=>{ $header.removeClass('isFixed'); $header.removeClass('isReady'); })()
    : window.scrollY >= 150 && window.scrollY < 200
    ? $header.addClass('isReady')
    : $header.addClass('isFixed');
});

const $modalComponent = $('.modalComponent');
const $btnNext = $('.btnNext');
let currentSequence = 0;
$btnNext.addEvent('click', ()=>{
  [
    ()=>{ $header.el.style.zIndex = 20; },
    ()=>{ $modal.el.style.zIndex = 30; },
    ()=>{ $modalComponent.el.style.zIndex = 'initial'; },
    ()=>{ $drawerMenu.el.style.zIndex = 40; },
  ][currentSequence]();
  currentSequence += 1;
  $btnNext.el.innerHTML = 'Next ' + currentSequence;
});