
'use strict';

var $slides = document.getElementsByTagName('slide');
var currentSlide = parseInt(location.hash.slice(1)) || 0;
var currentReveal = 0;

if ($slides[currentSlide]) {
  $slides[currentSlide].setAttribute('current', '');
} else {
  $slides[0].setAttribute('current', '');
}

for (var i = 0; i < $slides.length; i++) {
  var $pagenum = document.createElement('pagenum');

  $pagenum.textContent = i + 1;
  $pagenum.setAttribute('reveal', '');

  $slides[i].appendChild($pagenum);
}

function forward () {
  var $currentSlide = $slides[currentSlide];
  var $reveals = $currentSlide.querySelectorAll('*[reveal]');

  var $nextSlide = $slides[currentSlide + 1];
  var $reveal = $reveals[currentReveal];

  if ($reveal) {
    $reveal.setAttribute('visible', '');
    currentReveal++;
  } else if ($nextSlide) {
    currentReveal = 0;
    $currentSlide.setAttribute('fadeout', '');
    setTimeout(function () {
      $currentSlide.removeAttribute('fadeout', '');
      $currentSlide.removeAttribute('current');
      $nextSlide.setAttribute('current', '');
      for (var i = 0; i < $reveals.length; i++) {
        $reveals[i].removeAttribute('visible');
      }
    }, 500);

    location.hash = ++currentSlide || '';
  }
}

function revealAll () {
  var $currentSlide = $slides[currentSlide];
  var $reveals = $currentSlide.querySelectorAll('*[reveal]');

  if (currentReveal === $reveals.length) {
    currentReveal = 0;
  } else {
    currentReveal = $reveals.length;
  }

  for (var i = 0; i < $reveals.length; i++) {
    if (i < currentReveal) {
      $reveals[i].setAttribute('visible', '');
    } else {
      $reveals[i].removeAttribute('visible');
    }
  }
}

function backward () {
  var $currentSlide = $slides[currentSlide];
  var $reveals = $currentSlide.querySelectorAll('*[reveal]');

  var $prevSlide = $slides[currentSlide - 1];
  var $reveal = $reveals[currentReveal - 1];

  if ($reveal) {
    $reveal.removeAttribute('visible', '');
    currentReveal--;
  } else if ($prevSlide) {
    $currentSlide.removeAttribute('current');
    $prevSlide.setAttribute('current', '');

    $reveals = $prevSlide.querySelectorAll('*[reveal]');
    currentReveal = $reveals.length;

    for (var i = 0; i < $reveals.length; i++) {
      $reveals[i].setAttribute('visible', '');
    }

    location.hash = --currentSlide || '';
  }
}

window.addEventListener('keydown', function (e) {
  if (e.which === 39) {
    forward();
  } else if (e.which === 37) {
    backward();
  } else if (e.which === 32) {
    revealAll();
  }
});
