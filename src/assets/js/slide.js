window.addEventListener("load", function() {
  const slider = document.querySelector("#image-comparison-slider");
  const sliderImgWrapper = document.querySelector("#image-comparison-slider .img-wrapper");
  const sliderHandle = document.querySelector("#image-comparison-slider .handle");

  slider.addEventListener("mousemove", sliderMouseMove);
  slider.addEventListener("touchmove", sliderMouseMove);

  function sliderMouseMove(event) {

    if(isSliderLocked) return;

    const sliderLeftX = slider.offsetLeft;
    const sliderWidth = slider.clientWidth;
    const sliderHandleWidth = sliderHandle.clientWidth;

    let mouseX = (event.clientX || event.touches[0].clientX) - sliderLeftX;
    if(mouseX < 0) mouseX = 0;
    else if(mouseX > sliderWidth) mouseX = sliderWidth;

    sliderImgWrapper.style.width = `${((1 - mouseX/sliderWidth) * 100).toFixed(4)}%`;
    sliderHandle.style.left = `calc(${((mouseX/sliderWidth) * 100).toFixed(4)}% - ${sliderHandleWidth/2}px)`;
  }

  let isSliderLocked = false;

  slider.addEventListener("mousedown", sliderMouseDown);
  slider.addEventListener("touchstart", sliderMouseDown);
  slider.addEventListener("mouseup", sliderMouseUp);
  slider.addEventListener("touchend", sliderMouseUp);
  slider.addEventListener("mouseleave", sliderMouseLeave);

  function sliderMouseDown(event) {
    if(isSliderLocked) isSliderLocked = false;
    sliderMouseMove(event);
  }

  function sliderMouseUp() {
    if(!isSliderLocked) isSliderLocked = true;
  }

  function sliderMouseLeave() {
    if(isSliderLocked) isSliderLocked = false;
  }

});

/******************************************************************************************************/
window.addEventListener("load", function() {
  const slider2 = document.querySelector("#image-comparison-slider2");
  const sliderImgWrapper2 = document.querySelector("#image-comparison-slider2 .img-wrapper");
  const sliderHandle2 = document.querySelector("#image-comparison-slider2 .handle");

  slider2.addEventListener("mousemove", sliderMouseMove);
  slider2.addEventListener("touchmove", sliderMouseMove);

  function sliderMouseMove(event) {

    if(isSliderLocked2) return;

    const sliderLeftX2 = slider2.offsetLeft;
    const sliderWidth2 = slider2.clientWidth;
    const sliderHandleWidth2 = sliderHandle2.clientWidth;

    let mouseX2 = (event.clientX || event.touches[0].clientX) - sliderLeftX2;
    if(mouseX2 < 0) mouseX2 = 0;
    else if(mouseX2 > sliderWidth2) mouseX2 = sliderWidth2;

    sliderImgWrapper2.style.width = `${((1 - mouseX2/sliderWidth2) * 100).toFixed(4)}%`;
    sliderHandle2.style.left = `calc(${((mouseX2/sliderWidth2) * 100).toFixed(4)}% - ${sliderHandleWidth2/2}px)`;
  }

  let isSliderLocked2 = false;

  slider2.addEventListener("mousedown", sliderMouseDown);
  slider2.addEventListener("touchstart", sliderMouseDown);
  slider2.addEventListener("mouseup", sliderMouseUp);
  slider2.addEventListener("touchend", sliderMouseUp);
  slider2.addEventListener("mouseleave", sliderMouseLeave);

  function sliderMouseDown(event) {
    if(isSliderLocked2) isSliderLocked2 = false;
    sliderMouseMove(event);
  }

  function sliderMouseUp() {
    if(!isSliderLocked2) isSliderLocked2 = true;
  }

  function sliderMouseLeave() {
    if(isSliderLocked2) isSliderLocked2 = false;
  }

});


