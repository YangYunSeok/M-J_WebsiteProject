// 모달 열기 함수
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// 모달 닫기 함수
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  let modal = document.getElementById("myModal");
  if (event.target == modal) {
    closeModal();
  }
};
