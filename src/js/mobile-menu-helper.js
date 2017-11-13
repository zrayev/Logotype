$(document).ready(function () {
  var breakpoint = 768;
  var overlay = $('.overlay');
  var menu = $('.block--mobile-menu');
  var $openMenu = $('a.mobile-menu-open');
  var $closeMenu = $('a.mobile-menu-close');

  function openMenu() {
    if (window.innerWidth <= breakpoint) {
      menu.css('display', 'block');
      overlay.css('display', 'block');
      $('body').addClass('modal-open');
    } else {
      $('body').removeClass('modal-open');
    }
  }

  function removeNotScroll() {
    if (window.innerWidth > breakpoint) {
      $('body').removeClass('modal-open');
    }
  }

  function closeMenu() {
    menu.css('display', 'none');
    overlay.css('display', 'none');
    $('body').removeClass('modal-open');
  }

  $openMenu.click(function () {
    openMenu();
  });

  $closeMenu.click(function () {
    closeMenu();
  });

  var resizeHelperTimer;
  /**
   * Function call on windows resize.
   * Do not call the function when scrolling.
   */
  $(window).resize(function () {
    clearTimeout(resizeHelperTimer);
    resizeHelperTimer = setTimeout(function () {
      removeNotScroll();
    }, 50);
  });
});
