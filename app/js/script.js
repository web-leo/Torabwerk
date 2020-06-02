$(document).ready(function () {
   // Слайдер в первом экране
   $(".first_slider").slick({
      dots: true,
      speed: 300,
      prevArrow: '<div class="slick_prev"></div>',
      nextArrow: '<div class="slick_next"></div>',
   });

   // Слайдер популярных товаров
   $(".popular_slider").slick({
      dots: true,
      speed: 300,
      slidesToShow: 4,
      prevArrow: '<div class="slick_prev"></div>',
      nextArrow: '<div class="slick_next"></div>',
      responsive: [
         {
            breakpoint: 1360,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 3,
               centerPadding: "140px",
            },
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   });

   // Слайдер популярных товаров
   $(".popular_solutions_slider").slick({
      dots: true,
      speed: 300,
      slidesToShow: 3,
      prevArrow: '<div class="slick_prev"></div>',
      nextArrow: '<div class="slick_next"></div>',
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
               infinite: true,
               dots: true,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
            },
         },
      ],
   });

   // Слайдер портфолио
   $(".portfolio_slider").slick({
      dots: true,
      speed: 300,
      prevArrow: '<div class="slick_prev"></div>',
      nextArrow: '<div class="slick_next"></div>',
   });

   // Кастомный скролл бар
   (function ($) {
      $(window).on("load", function () {
         $(".first_slide_text").mCustomScrollbar({
            theme: "my-theme",
         });
         $(".portfolio_slide_text").mCustomScrollbar({
            theme: "my-theme",
         });
      });
   })(jQuery);

   // Вкладки на странице подкатегории
   $(".tabs_menu a").click(function (e) {
      e.preventDefault();
      $(".tabs_menu .active").removeClass("active");
      $(this).addClass("active");
      var tab = $(this).attr("href");
      $(".tab").not(tab).css({ display: "none" });
      $(tab).fadeIn(1000);
   });

   // Стилизация input[type="number"]
   $(".product_number").number_plugin({
      width: "111px",
      height: "45px",
      animate: true,
      style: "line",
   });

   // Модальные окна
   $(".popup").magnificPopup({
      type: "inline",
   });

   var $uiAccordion = $(".js-ui-accordion");

   $uiAccordion.accordion({
      collapsible: true,
      heightStyle: "content",

      activate: function activate(event, ui) {
         var newHeaderId = ui.newHeader.attr("id");

         if (newHeaderId) {
            history.pushState(null, null, "#" + newHeaderId);
         }
      },

      create: function create(event, ui) {
         var $this = $(event.target);
         var $activeAccordion = $(window.location.hash);

         if ($this.find($activeAccordion).length) {
            $this.accordion(
               "option",
               "active",
               $this
                  .find($this.accordion("option", "header"))
                  .index($activeAccordion)
            );
         }
      },
   });

   $(window).on("hashchange", function (event) {
      var $activeAccordion = $(window.location.hash);
      var $parentAccordion = $activeAccordion.parents(".js-ui-accordion");

      if ($activeAccordion.length) {
         $parentAccordion.accordion(
            "option",
            "active",
            $parentAccordion
               .find($uiAccordion.accordion("option", "header"))
               .index($activeAccordion)
         );
      }
   });

   // Переход к регистрации
   $(".registration_btn1").click(function () {
      $(".registration_box2").css("display", "block");
      $(".registration_box1").css("display", "none");
      $(".registration_wrap").css("align-items", "flex-start");
   });
});

$(document).ready(function () {
   // Гамбургер
   $("#sandwich").click(function () {
      $(".menu").addClass("active");
   });
   $(document).mouseup(function (e) {
      // событие клика по веб-документу
      var div = $(".menu"); // тут указываем ID элемента
      if (
         !div.is(e.target) && // если клик был не по нашему блоку
         div.has(e.target).length === 0
      ) {
         // и не по его дочерним элементам
         div.removeClass("active"); // скрываем его
      }
   });
});
