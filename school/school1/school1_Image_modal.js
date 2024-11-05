const slides = document.querySelector(".slides");
const leftbtn = document.querySelector(".toleft");
const rightbtn = document.querySelector(".toright");
let slideNo = 0;
rightbtn.addEventListener("click", function goSlide() {
  // 이미지가 총 6개라면 아래 4를 6으로 수정해야 합니다.
  if (slideNo < 4) {
    slideNo += 1;

    //직접 슬라이드를 해보고, 사진이 오른쪽 왼쪽으로 조금씩 삐뚤어지는지 확인한 뒤
    //100.7 부분의 크기를 늘이거나 줄이면 됩니다.
    document.querySelector(`#slide${slideNo}`).style.transform = `translateX(${
      -100.32 * slideNo
    }%)`;
  }
});
leftbtn.addEventListener("click", function goSlide() {
  if (slideNo > 0) {
    slideNo -= 1;
    const whatwillchange = document.querySelector(`#slide${slideNo + 1}`).style;
    whatwillchange.transform = `translateX(0%)`;
  }
});
