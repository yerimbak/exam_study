let slides = document.querySelector('.slides');
let slide = document.querySelectorAll('.slides li');
let currentIdx = 0;
let slideCount = slide.length; //length는 1부터 세니까
let slideWidth = 200;
let slideMargin = 30;
let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');

let pageBox = document.querySelector('.scrollbar_inner');
let pagination = document.querySelectorAll('.page');
let boxWidth = pageBox.offsetWidth;




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
  let initialTranslateValue = -(slideWidth + slideMargin)/1.28*slideCount;
  slides.style.transform = 'translateX(' + initialTranslateValue +'px)';
}

nextBtn.addEventListener('click', function(){
  moveSlide(currentIdx+1);
});
prevBtn.addEventListener('click',function(){
  moveSlide(currentIdx-1);
});

function addPage(){
  for(let y = 0; y<slideCount; y++){
    pageBox.innerHTML += `<span class="page"></span>`;
  }
let newpage = document.querySelectorAll('.page');
let newpageLen = newpage.length;
let newpageWidth = pageBox.offsetWidth / newpageLen;
  for(let x=0; x<newpageLen; x++){
    newpage[x].style.width = newpageWidth+'px';
    if(x === currentIdx){
      newpage[x].classList.add('animated')
    }
  }

}


function aa(){
addPage();

}
aa();




function moveSlide(num){
  slides.style.left = -num * (slideWidth + slideMargin) + 'px';
  currentIdx = num;
  if(currentIdx === slideCount || currentIdx === -slideCount){
    setTimeout(function(){
      slides.classList.remove('animated');
      slides.style.left = '0px';
      currentIdx = 0;
    }, 500);
    setTimeout(function(){
      slides.classList.add('animated');
    }, 600);
  }

}

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
  // autoslide();
});
