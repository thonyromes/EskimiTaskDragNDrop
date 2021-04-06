var isDragging = false;
var previousX = 0;

function onDrop() {
  $('.drop').attr('src', './static/img/bongo-bondhu-after.png');
  window.setTimeout(function () {
    $('.drop').attr('src', './static/img/map-unfilled.jpg');
    $('.writing').removeClass('bye');
  }, 15000);
}

function isColliding(x, y, element2) {
  var e2 = {};
  e2.top = $(element2).offset().top;
  e2.left = $(element2).offset().left;
  e2.right =
    parseFloat($(element2).offset().left) + parseFloat($(element2).width());
  e2.bottom =
    parseFloat($(element2).offset().top) + parseFloat($(element2).height());

  if (x > e2.left && x < e2.right && y < e2.bottom && y > e2.top) {
    return true;
  }
}

$('.drag').on('mousedown', function (e) {
  var isDragging = true;
  var drag = $(this).clone().addClass('dragged').appendTo('.wrapper');
  var dropZone = $(this).data('target');
  var originalPosX = $(this).offset().left;
  var originalPosY = $(this).offset().top;
  var startX = e.clientX - originalPosX;
  var startY = e.clientY - originalPosY;
  drag.css({ left: e.clientX - startX, top: e.clientY - startY });
  drag.css({
    'transform-origin':
      Math.round((startX / drag.outerWidth()) * 100) +
      '% ' +
      Math.round((startY / drag.outerHeight()) * 100) +
      '%',
  });
  drag.addClass('beginDrag');

  $(window).on('mousemove', function (event) {
    if (isDragging) {
      drag.css({ left: event.clientX - startX, top: event.clientY - startY });
      if (isColliding(event.clientX, event.clientY, '.drop')) {
        drag.removeClass('beginDrag');
        drag.addClass('readyDrop');
      } else {
        drag.removeClass('readyDrop');
      }
    }
  });
  $(window).on('mouseup', function (event) {
    if (isDragging) {
      $(window).off('mousemove');
      if (isColliding(event.clientX, event.clientY, '.drop')) {
        drag.removeClass('readyDrop').addClass('bye');
        $('.writing').addClass('bye');

        window.setTimeout(function () {
          onDrop();
          drag.remove();
        }, 400);
      } else {
        drag.animate(
          { top: originalPosY, left: originalPosX, opacity: 0 },
          400,
          function () {
            drag.remove();
          },
        );
      }
      isDragging = false;
    }
  });
});
