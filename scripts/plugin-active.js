$(document).ready(function () {
  // Closes the sidebar menu
  $(".menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass(
      "fa-bars fa-times"
    );
    $(this).toggleClass("active");
  });
  // Smoothscroll script

  // Closes responsive menu when a scroll trigger link is clicked
  $("#sidebar-wrapper").click(function () {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass(
      "fa-bars fa-times"
    );
  });
  if ($(window).width() > 991) {
    $(window).on("load", function (e) {
      $("body").addClass("active");
    });
  }

  // 웹에서는 전화연결 막기
  if (window.outerWidth > 768) {
    $("a[href^=tel").each(function (e) {
      $(this).removeAttr("href");
    });
  }
});
