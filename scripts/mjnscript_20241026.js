// 웹상 온라인 문의

const modal = document.querySelector(".modal");
const modalOpen = document.querySelector(".modalbtn");
const modalClose = document.querySelector(".close_btn");

function showModal() {
  // 화면의 너비가 768px보다 클 경우에만 모달창을 실행
  if (window.innerWidth > 768) {
    modalOpen.addEventListener("click", function () {
      //'on' class 추가
      modal.classList.add("on");
    });

    modalClose.addEventListener("click", function () {
      //'on' class 제거
      modal.classList.remove("on");
    });
  }
}

// 윈도우가 리사이즈될 때도 모달 실행 조건을 체크하고 싶다면 추가
window.addEventListener("resize", showModal);

// 페이지 로드 시 모달을 실행할 때
window.addEventListener("load", showModal);
