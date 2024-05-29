$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    infinite: true,
                    speed: 1000,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  adaptiveHeight: false,
                }
              }
            ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
    });

    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('fast');
      });
    });

    $('[data-modal=buttonsubmit]').on('click', function(){
      $('.overlay #thanks').fadeIn('fast');
      $('#order, #consultation').fadeOut('fast');
      setTimeout(function(){
        $('.feed-form').find("input").val("");
      },4000);
    });

    $('#send').on('submit', function () {
      var validation = true;
      if (validation) {
          $('.overlay, #thanks').fadeIn('fast');
          $('.feed-form').find("input").val("");
          return true;
      }
      else {
          return false;
      }
    });

    
    //scroll and pageup
    
    $(window).scroll(function(){
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href^='#up']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();

});


// accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 30 + "px";
    } 
  });
}


//burger 
var acc = document.getElementById("menu");


//filter

document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('.elem_filter_select');
  const catalogContent = document.querySelector('.catalog__content_active');

  // Store the initial order of items
  const initialItems = Array.from(catalogContent.querySelectorAll('.catalog-item.filtered_item'));

  selectElement.addEventListener('change', (event) => {
      if (event.target.value === 'price') {
          sortItemsByPrice();
      } else if (event.target.value === '') {
          resetItems();
      }
  });

  function sortItemsByPrice() {
      const items = Array.from(catalogContent.querySelectorAll('.catalog-item.filtered_item'));
      items.sort((a, b) => parseInt(a.getAttribute('data-finished')) - parseInt(b.getAttribute('data-finished')));

      // Remove existing items
      catalogContent.innerHTML = '';

      // Append sorted items
      items.forEach(item => catalogContent.appendChild(item));
  }

  function resetItems() {
      // Clear the current items
      catalogContent.innerHTML = '';

      // Append items in their original order
      initialItems.forEach(item => catalogContent.appendChild(item));
  }
});
