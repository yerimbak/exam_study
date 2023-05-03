let slides = document.querySelector('.slides');
let slide = document.querySelectorAll('.slides li');
let currentIdx = 0;
let slideCount = slide.length; //length는 1부터 세니까
let slideWidth = 200;
let slideMargin = 30;
let responsiveMargin = 20;
let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');

let scrollBox = document.querySelector('.scrollbar_inner');
let boxWidth = scrollBox.offsetWidth;

scrollBox.innerHTML += `<span class="rod"></span>`;
let scrollBar = document.querySelector('.rod');
let scrollBarWidth = boxWidth/slideCount;
scrollBar.style.width = scrollBarWidth + 'px';
// 페이지 박스 안에 숫자로 나타내는 박스
const pageBox = document.querySelector('.pageBox');
function pageBoxArea() {
  for(let i = 1; i<=slideCount; i++) {
    pageBox.innerHTML += `<div class="page" data-idx="${i - 1}">${i}</div>`;
  };
};
pageBoxArea();
let pageNum = document.querySelectorAll('.page');
// 각 pagebox 클릭하면 할 일
  for(let o = 0; o<slide.length; o++){
    pageNum[o].addEventListener('click',function(e){
      e.preventDefault();
      let pageIdx = Number(this.getAttribute('data-idx'));
      //innerText는 내용 반환 A.innerText / A.innerText = 'B';
      //innerHTML 의 태그를 반환 A.innerHTML / A.innerHTML = 'B';
      // let pageIdx = event.target.innerText - 1;
      moveSlide(pageIdx);
      // 클릭 이벤트
      // for(let y=0; y<slide.length; y++){
      //   pageNum[y].classList.remove('animated');
      // }
      // pageNum[o].classList.add('animated');
    });
  }


// 페이지 1/1 이런 식으로 나타내는 함수
let nowPage = document.querySelector('.pagelocation .nowpage');
function pageLocation(){
  const totalPage = document.querySelector('.pagelocation .totalpage');
  totalPage.innerText = slideCount;
}
pageLocation();

makeClone();

function makeClone(){
  for(let i = 0; i<slideCount; i++){
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add('clone');
    slides.appendChild(cloneSlide);
  }
  for(let i = slideCount -1; i>=0; i--){
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add('clone');
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPos();
  
  setTimeout(function(){
    slides.classList.add('animated');

  },100);
}

function updateWidth(){
  let currentSlides = document.querySelectorAll('.slides li');
  let newSlideCount = currentSlides.length;

  let newWidth = (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';
  slides.style.width = newWidth;
}

function setInitialPos(){
  let initialTranslateValue = -(slideWidth + slideMargin)/1.28*slideCount +'px';
  slides.style.transform = `translateX(${initialTranslateValue})`;
}

function moveSlide(num){
  slides.style.left = -num * (slideWidth + slideMargin) + 'px';
  scrollBar.style.left = num * scrollBarWidth +'px';
  
  currentIdx = num;

  for(let i = 0; i <slideCount; i++){
    pageNum[i].classList.remove('animated');
  }
  if(currentIdx === slideCount || currentIdx === -slideCount){
    setTimeout(function(){
      slides.classList.remove('animated');
      scrollBar.style.transition='none';
      slides.style.left = '0px';
      scrollBar.style.left = '0px';
      currentIdx = 0;
      for(let i = 0; i <slideCount; i++){
        pageNum[i].classList.remove('animated');
      }
      pageNum[0].classList.add('animated');
    }, 500);
    setTimeout(function(){
      slides.classList.add('animated');
      scrollBar.style.transition='0.5s';
      // pageNum[0].classList.add('animated');
    }, 600);
  }

  pageNum[(currentIdx === slideCount) ? 0 : currentIdx].classList.add('animated');

  console.log(currentIdx, slideCount, num);
  nowPage.innerText = pageNum[(currentIdx === slideCount) ? 0 : currentIdx].innerText;
}
moveSlide(0);

nextBtn.addEventListener('click', function(){
  moveSlide(currentIdx+1);
});
prevBtn.addEventListener('click',function(){
  moveSlide(currentIdx-1);
});



let timer = undefined;
function autoSlide(){
  if(timer === undefined){
    timer = setInterval(function(){
      moveSlide(currentIdx+1);
    },3000)
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

// 반응형 슬라이드
window.addEventListener('resize',function(){
  let currentWidth = document.querySelector('body').offsetWidth;
  console.log(currentWidth);
  if(currentWidth < 700){
    let slidesWidth = slides.offsetWidth;
  }
});