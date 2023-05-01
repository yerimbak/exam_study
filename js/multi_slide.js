window.addEventListener("DOMContentLoaded", function() {



const slides = document.querySelector('.slides');
let slide = document.querySelectorAll('.slides li');
let currentIdx = 0;
let slideCount = slide.length;
let slideWidth = document.querySelector('.slides li').offsetWidth;
let slideMargin = 30;
let moveAmt = slideWidth + slideMargin;
let responsiveMargin = 20;
const pager = document.querySelector('.pager');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');


makeClone();
// 슬라이드 개수에 따라 앞 뒤로 복제시키는 함수
function makeClone(){
  for(let i = 0; i<slideCount; i++){
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add('clone');
    slides.appendChild(cloneSlide);
  }
  for(let i = slideCount-1; i>=0; i--){
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add('clone');
    slides.prepend(cloneSlide);
  }

  updateWidth();
  setInitialPos();
  setTimeout(() => {
    slides.classList.add('animated');
    pagination[0].classList.add('active');
  }, 100);
}

function updateWidth(){ //가로배열
  newslide = document.querySelectorAll('.slides li');
  let newSlideCount = newslide.length;

  let newWidth = moveAmt*newSlideCount - slideMargin + 'px';
  slides.style.width = newWidth;

}

// page 수만큼 pageBox 추가
function pageBox() {
  for(let i = 0; i<slideCount; i++) {
    pager.innerHTML += `<div class="pagination" data-idx="${i}">${i + 1}</div>`;
  };
};
pageBox();
let pagination = document.querySelectorAll('.pagination');

// pager 로 슬라이드 이동
function pageMove(){
  for(let x = 0; x<pagination.length;x++){
    pagination[x].addEventListener('click',function(){
      let pagerNum = pagination[x].getAttribute('data-idx');
      // let pagerNum = event.target.innerText - 1;
      moveSlide(pagerNum);

    });
  }
}
pageMove();


function setInitialPos(){ // 중앙배치
  let initialTranslateValue = -moveAmt*slideCount + 'px';
  slides.style.transform = `translateX(${initialTranslateValue})`;
}

function moveSlide(num){
  slides.style.left = -num * moveAmt + 'px';
  currentIdx = num;

  // pagination[pagerNum].classList.add('active');
  // let pagerNum = pagination[currentIdx].getAttribute('data-idx');
  // for(let m = 0; m < pagination.length; m++){
  //   pagination[m].classList.remove('active');
  // }
  // pagination[pagerNum].classList.add('active');
  // console.log(pagerNum, slideCount)
    for(let y = 0; y <pagination.length; y++){
      pagination[y].classList.remove('active');
    }
    pagerNum = currentIdx;
    console.log(currentIdx)

  if(currentIdx === slideCount || currentIdx === -slideCount){
    setTimeout(function() {
      slides.classList.remove('animated');
      slides.style.left = '0px';
      currentIdx = 0;

      for(let y = 0; y <pagination.length; y++){
        pagination[y].classList.remove('active');
      }

    }, 500);
    setTimeout(function() {
      slides.classList.add('animated');
      
      pagination[0].classList.add('active');
    }, 600);
  }
  pagination[pagerNum].classList.add('active');
}


prevBtn.addEventListener('click',function(){
  moveSlide(currentIdx - 1);
});
nextBtn.addEventListener('click',function(){
  moveSlide(currentIdx + 1);
});

//clearInterval(timer);
let timer = undefined; // timer undefined를 잡아주지 않으면 마우스 올리고 뺄 때 timer 값이 숫자로 잡히는데 숫자가 잡히면 내가 정한 시간보다 빠르게 왔다갔다하는 이상한 현상이 일어남.
function autoSlide(){
  if(timer === undefined){
    timer = setInterval(function(){
      moveSlide(currentIdx + 1);
    },3000);
  }
}
autoSlide();
function stopSlide(){
  clearInterval(timer);
  timer = undefined;
}
slides.addEventListener('mouseenter', function(){
  stopSlide();
});
slides.addEventListener('mouseleave', function(){
  autoSlide();
});







});