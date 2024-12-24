


      

document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        // Open the first section by default
        const firstContent = accordionHeaders[0].nextElementSibling;
        if (firstContent) {
            firstContent.classList.add('active');
            firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
            accordionHeaders[0].classList.add('active');
        }

        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;

                if (content) {
                    if (content.classList.contains('active')) {
                        // Close the content
                        content.classList.remove('active');
                        content.style.maxHeight = null;
                        header.classList.remove('active');
                    } else {
                        // Open the content
                        content.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 'px';
                        header.classList.add('active');
                    }
                }
            });
        });
    }
});

/** footer js **/
document.addEventListener('DOMContentLoaded', () => {
    const accHeaders = document.querySelectorAll('.accordion-header-footer');

    // Function to handle click events on accordion headers
    function toggleAccordion() {
        const accContent = this.nextElementSibling;

        if (accContent.classList.contains('active')) {
            // Close the content
            accContent.classList.remove('active');
            accContent.style.maxHeight = null;
            this.classList.remove('active');
        } else {
            // Close all other contents
            document.querySelectorAll('.accordion-content-footer').forEach(accItem => {
                accItem.classList.remove('active');
                accItem.style.maxHeight = null;
            });

            document.querySelectorAll('.accordion-header-footer').forEach(header => {
                header.classList.remove('active');
            });

            // Open the clicked content
            accContent.classList.add('active');
            accContent.style.maxHeight = accContent.scrollHeight + 'px';
            this.classList.add('active');
        }
    }

    function setupAccordion() {
        // Open the first section by default
        const firstAccContent = accHeaders[0].nextElementSibling;
        if (firstAccContent) {
            firstAccContent.classList.add('active');
            firstAccContent.style.maxHeight = firstAccContent.scrollHeight + 'px';
            accHeaders[0].classList.add('active');
        }

        // Add click event listener to each accordion header
        accHeaders.forEach(accHeader => {
            accHeader.addEventListener('click', toggleAccordion);
        });
    }

    // Check the screen size and apply accordion functionality for screens smaller than 767px
    if (window.innerWidth < 767 && accHeaders.length > 0) {
        setupAccordion();
    }

    // Listen for window resize events to apply/remove accordion functionality dynamically
    window.addEventListener('resize', () => {
        if (window.innerWidth < 767 && accHeaders.length > 0) {
            setupAccordion();
        } else {
            // Remove accordion functionality for larger screens
            document.querySelectorAll('.accordion-content-footer').forEach(accItem => {
                accItem.classList.remove('active');
                accItem.style.maxHeight = null;
            });

            document.querySelectorAll('.accordion-header-footer').forEach(header => {
                header.classList.remove('active');
                header.removeEventListener('click', toggleAccordion);
            });
        }
    });
});

/*** javascript for showing the sidebar list read more ***/
// document.addEventListener('DOMContentLoaded', function() {
//     const listItems = document.querySelectorAll('.category-list li');
//     const showMoreBtn = document.getElementById('show-more-btn');

//     if (listItems.length > 12 && showMoreBtn) {
//         showMoreBtn.style.display = 'block';

//         showMoreBtn.addEventListener('click', function() {
//             listItems.forEach(item => {
//                 item.style.display = 'list-item';
//             });
//             this.style.display = 'none';
//         });
//     }
// });
document.addEventListener('DOMContentLoaded', function() {
    const listItems = document.querySelectorAll('.category-list li');
    const showMoreBtn = document.getElementById('show-more-btn');
    const readLessBtn = document.getElementById('read-less-btn');
    const initialItemsToShow = 12;

    // Initially show only the first 12 items
    listItems.forEach((item, index) => {
        if (index >= initialItemsToShow) {
            item.style.display = 'none';
        }
    });

    if (listItems.length > initialItemsToShow && showMoreBtn && readLessBtn) {
        showMoreBtn.style.display = 'block';
        readLessBtn.style.display = 'none';

        showMoreBtn.addEventListener('click', function() {
            listItems.forEach(item => {
                item.style.display = 'list-item';
            });
            this.style.display = 'none';
            readLessBtn.style.display = 'block';
        });

        readLessBtn.addEventListener('click', function() {
            listItems.forEach((item, index) => {
                if (index >= initialItemsToShow) {
                    item.style.display = 'none';
                }
            });
            this.style.display = 'none';
            showMoreBtn.style.display = 'block';
        });
    }
});


/*** javascript for showing the sidebar list read more end ***/

/*** javascript for mobile menu ***/
function initMenu() {
    const hamburger = document.querySelector('.hamburger');
    const rightColumn = document.querySelector('.right-column');
    const bodyMenu = document.querySelector('body');
    const firstSubMenu = document.querySelector('.has-sub-menu:first-of-type .sub-menu');

    if (hamburger &&  rightColumn) {
        hamburger.addEventListener('click', function() {
             rightColumn.classList.toggle('open'); 
             hamburger.classList.toggle('active');
             bodyMenu.classList.toggle('menu-open');
        });

     }

    if (firstSubMenu) {
        firstSubMenu.style.display = 'block';
    }

   document.querySelectorAll('.has-sub-menu > a').forEach((anchor, index) => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        const subMenu = this.nextElementSibling; // Select the next sibling element
        if (subMenu && subMenu.classList.contains('sub-menu')) {
            const isVisible = subMenu.style.display === 'block';
            // Hide all sub-menus and remove active class from all links
            document.querySelectorAll('.sub-menu').forEach(menu => {
                menu.style.display = 'none';
            });
            document.querySelectorAll('.has-sub-menu > a').forEach(link => {
                link.classList.remove('active');
            });
            // Toggle the clicked sub-menu and add/remove active class
            subMenu.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                this.classList.add('active');
            }
        }
    });


if (window.innerWidth < 767) {

const accountLink = document.querySelector('.account-link');
    const accountLogin = document.querySelector('.account-login');
   accountLogin.addEventListener('click', (e) => {
              e.preventDefault();  // Prevent the default link behavior
                accountLink.classList.toggle('active');
                });
}


    // Set the first link as active and its sub-menu visible by default
    if (index === 0) {
        anchor.classList.add('active');
        const firstSubMenu = anchor.nextElementSibling;
        if (firstSubMenu && firstSubMenu.classList.contains('sub-menu')) {
            firstSubMenu.style.display = 'block';
        }
    }
});


}

function checkScreenWidth() {
    if (window.innerWidth < 767) {
        initMenu();
    }
}

// Initial check
checkScreenWidth();

// Check on resize
window.addEventListener('resize', checkScreenWidth);

/*** javascript for mobile menu end ***/

/***** javascript for homepage column marquee animation ****/
window.onload = function() {
    if (window.innerWidth > 767) { // Check if the screen width is above 767px
        const columnsUp = document.querySelectorAll('.grid-column.scroll-up');
        const columnsDown = document.querySelectorAll('.grid-column.scroll-down');

        columnsUp.forEach(column => {
            column.innerHTML += column.innerHTML;
            let position = 0;
            const speed = 0.6; // Adjust this value to control the speed

            function scroll() {
                position -= speed; // Adjust this value to control the speed
                column.style.transform = `translateY(${position}px)`;
                // Reset to the start to create an infinite loop
                if (Math.abs(position) >= column.scrollHeight / 2) {
                    position = 0;
                }
                requestAnimationFrame(scroll);
            }
            scroll();
        });

        columnsDown.forEach(column => {
            column.innerHTML += column.innerHTML;
            let position = 0;
            const speed = 0.6; // Adjust this value to control the speed

            function scroll() {
                position += speed; // Adjust this value to control the speed
                column.style.transform = `translateY(${position}px)`;
                // Reset to the start to create an infinite loop
                if (position >= column.scrollHeight / 2) {
                    position = 0;
                }
                requestAnimationFrame(scroll);
            }
            scroll();
        });
    }
};


        /***** javascipt for homepage column marquee animation end ****/


        /*** slick jqery for homepage partner slider ***/

        $('.partners-slider').slick({
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 6000,
            infinite: true,
            slidesToShow: 6,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }]
        });
        /*** slick jqery for homepage partner slider end ***/



        /*** slick jqery for homepage other 3 sliders ****/

        $('.week-slider').slick({
            dots: false,
            arrows: false,
            autoplay: true,
            speed: 15000,
            autoplaySpeed: 0,
            cssEase: 'linear',
            infinite: true,
            slidesToShow: 3,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });



        $('.story-slider-top').slick({
            speed: 15000,
            autoplay: true,
            autoplaySpeed: 0,
            cssEase: 'linear',
            pauseOnHover: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            initialSlide: 1, // Set initialSlide to 0 to start from the left edge
            arrows: false,
            buttons: false,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }]
        });

 if (window.innerWidth < 767) {
  $('.scroll-up').slick({
    speed: 9000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    initialSlide: 1, // Set initialSlide to 0 to start from the left edge
    arrows: false,
    buttons: false
  });
   
}


        $('.story-slider-bottom').slick({
            speed: 20000,
            autoplay: true,
            autoplaySpeed: 0,
            cssEase: 'linear',
            slidesToShow: 1,
             pauseOnHover: true,
            slidesToScroll: 1,
            infinite: true,
            initialSlide: 1, // Set initialSlide to 0 to start from the left edge
            arrows: false,
            buttons: false,
            rtl: true,
            responsive: [{
                breakpoint:767,
                settings: {
                    slidesToShow: 1
                }
            }]
        });


        /*** slick jqery for homepage other 3 sliders  end****/





        /**** slick jqery for for  category main slider ****/

        $(document).ready(function() {
            // Initialize each instance of the Slick slider
            $('.latest-collections-slider').each(function() {
                var $slider = $(this);

                $slider.slick({
                    dots: false,
                    arrows: false,
                    autoplay: false,
                    autoplaySpeed: 3000,
                    infinite: false,
                    slidesToShow: 4,
                    responsive: [{
                           breakpoint: 1760,
                settings: {
                slidesToShow: 3, // show 4 items above 1780px
                slidesToScroll: 1,
               }
               }, {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            autoplay:true,
                             infinite: true,
                            autoplaySpeed: 9000,
                             dots: true,
                            slidesToScroll: 1
                        }
                    }]
                });

                // Custom navigation buttons for this slider instance
                $slider.closest('.latest-collections').find('.prev-btn').click(function() {
                    $slider.slick("slickPrev");
                });

                $slider.closest('.latest-collections').find('.next-btn').click(function() {
                    $slider.slick("slickNext");
                });

                // Function to update button states
                function updateButtonStates() {
                    let currentSlide = $slider.slick('slickCurrentSlide');
                    let slickObject = $slider.slick('getSlick');
                    let totalSlides = slickObject.slideCount - slickObject.options.slidesToShow;

                    $slider.closest('.latest-collections').find('.prev-btn').toggleClass("slick-disabled", currentSlide === 0);
                    $slider.closest('.latest-collections').find('.next-btn').toggleClass("slick-disabled", currentSlide >= totalSlides);
                }

                // Initial state update
                updateButtonStates();

                // Update button states after each slide change
                $slider.on('afterChange', function(event, slick, currentSlide) {
                    updateButtonStates();
                });

                // Update button states on initialization
                $slider.on('init', function(event, slick) {
                    updateButtonStates();
                });
            });
        });

        /**** end ****/





        /**** slick jqery for  category main second slider we have same html for both slider just need to be change a slider class only ****/


        $(document).ready(function() {
            // Initialize the Slick sliders
            $('.collections-slider').each(function(index, element) {
                let $slider = $(element);

                $slider.slick({
                    dots: false,
                    arrows: false,
                    autoplay: false,
                    autoplaySpeed: 3000,
                    infinite: false,
                    slidesToShow: 4.4,
                    responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 3.4,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,
                                 autoplay:true,
                             infinite: true,
                            autoplaySpeed: 9500,
                                 dots: true,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });

                // Custom navigation buttons for each slider
                $slider.closest('.latest-collections').find('.prev-btn').click(function() {
                    $slider.slick('slickPrev');
                });

                $slider.closest('.latest-collections').find('.next-btn').click(function() {
                    $slider.slick('slickNext');
                });

                // Function to update button states
                function updateButtonStates() {
                    let currentSlide = $slider.slick('slickCurrentSlide');
                    let slickObject = $slider.slick('getSlick');
                    let totalSlides = slickObject.slideCount - slickObject.options.slidesToShow;

                    $slider.closest('.latest-collections').find('.prev-btn').toggleClass('slick-disabled', currentSlide === 0);
                    $slider.closest('.latest-collections').find('.next-btn').toggleClass('slick-disabled', currentSlide >= totalSlides);
                }

                // Initial state update
                updateButtonStates();

                // Update button states after each slide change
                $slider.on('afterChange', function(event, slick, currentSlide) {
                    updateButtonStates();
                });

                // Update button states on initialization
                $slider.on('init', function(event, slick) {
                    updateButtonStates();
                });
            });
        });


        /****** end *****/





        
document.addEventListener('DOMContentLoaded', function() {
    // Common functionality
    const searchField = document.querySelector('.search-form__field');
    const searchPopupForm = document.querySelector('.search-popup-form');
    const clearButton = document.querySelector('.search-clear');

    if (searchField && searchPopupForm && clearButton) {
        // Function to toggle clear button visibility based on input field value
        function toggleClearButton() {
            if (searchField.value.trim() !== '') {
                clearButton.style.display = 'block';
            } else {
                clearButton.style.display = 'none';
            }
        }

        // Show search popup form on input field click
        searchField.addEventListener('click', function() {
            searchPopupForm.style.display = 'block';
        });

        // Optionally, hide the popup when clicking outside of it
        document.addEventListener('click', function(event) {
            if (!searchField.contains(event.target) && !searchPopupForm.contains(event.target)) {
                searchPopupForm.style.display = 'none';
            }
        });

        // Toggle clear button visibility on input
        searchField.addEventListener('input', toggleClearButton);

        // Clear the input field when the clear button is clicked
        clearButton.addEventListener('click', function(event) {
            searchField.value = '';
            toggleClearButton();
            event.preventDefault();
        });

        // Initialize clear button visibility
        toggleClearButton();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Dropdown functionality for search form select box
    const toggleBtn = document.getElementById('search-form__toggle-button');
    const optionsList = document.getElementById('search-form__options-list');

    if (toggleBtn && optionsList) {
        const toggleBtnText = toggleBtn.querySelector('span');
        let selectedOption = null;

        // Toggle dropdown visibility when button is clicked
        toggleBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling up
            event.preventDefault();

            // Toggle height of optionsList
            if (optionsList.style.height === '0px' || optionsList.style.height === '') {
                optionsList.style.height = optionsList.scrollHeight + 'px';
                toggleBtn.classList.add('active'); // Add 'active' class to button
            } else {
                optionsList.style.height = '0px';
                toggleBtn.classList.remove('active'); // Remove 'active' class from button
            }

            // Clear active state from previous selection if exists
            if (selectedOption) {
                selectedOption.classList.remove('active');
            }
        });

        // Handle click on an option in the dropdown list
        const items = optionsList.querySelectorAll('.search-form__category-item');
        items.forEach(item => {
            item.addEventListener('click', function() {
                items.forEach(item => {
                    item.classList.remove('active'); // Remove 'active' class from all items
                });

                this.classList.add('active'); // Add 'active' class to clicked item
                toggleBtnText.textContent = this.textContent; // Update button text
                selectedOption = this; // Set selected option

                // Close dropdown after selection
                optionsList.style.height = '0px';
                toggleBtn.classList.remove('active'); // Remove 'active' class from button
            });
        });

        // Close dropdown when clicking outside of it
        document.addEventListener('click', function(event) {
            if (!toggleBtn.contains(event.target) && !optionsList.contains(event.target)) {
                optionsList.style.height = '0px';
                toggleBtn.classList.remove('active'); // Remove 'active' class from button
            }
        });
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('sortby__toggle-button');
    const optionsList = document.getElementById('sortby__options-list');
    let selectedOption = null;

    if (toggleButton && optionsList) {
        const toggleButtonText = toggleButton.querySelector('span');
        const listItems = optionsList.querySelectorAll('li');

        toggleButton.addEventListener('click', function(event) {
            event.stopPropagation();

            if (optionsList.style.height === '0px' || optionsList.style.height === '') {
                optionsList.style.height = optionsList.scrollHeight + 'px';
                toggleButton.classList.add('active');
            } else {
                optionsList.style.height = '0px';
                toggleButton.classList.remove('active');
            }

            if (selectedOption) {
                listItems.forEach(item => {
                    item.classList.remove('active');
                });
                selectedOption.classList.add('active');
            }
        });

        listItems.forEach(item => {
            item.addEventListener('click', function() {
                listItems.forEach(item => {
                    item.classList.remove('active');
                });

                this.classList.add('active');
                toggleButtonText.textContent = this.textContent;
                selectedOption = this;

                optionsList.style.height = '0px';
                toggleButton.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            if (!toggleButton.contains(event.target) && !optionsList.contains(event.target)) {
                optionsList.style.height = '0px';
                toggleButton.classList.remove('active');
            }
        });
    } 
});


        /**** js end ****/





        /*** search switch button animation ***/
       document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.switch-btn');
    const bgAnimation = document.querySelector('.bg-animation');

    if (buttons.length > 0 && bgAnimation) {
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                switchActive(button);
            });
        });

        function switchActive(activeBtn) {
            buttons.forEach(btn => btn.classList.remove('active'));
            activeBtn.classList.add('active');
            updateBgAnimation(activeBtn);
        }

        function updateBgAnimation(activeBtn) {
            const left = activeBtn.offsetLeft;
            const width = activeBtn.offsetWidth;
            bgAnimation.style.left = `${left}px`;
            bgAnimation.style.width = `${width}px`;
        }

        // Initialize the animation position
        const initialActiveBtn = document.querySelector('.switch-btn.active');
        if (initialActiveBtn) {
            updateBgAnimation(initialActiveBtn);
        } else {
            console.warn('No initially active button found.');
        }
    } 
});

        /*** end *****/


        document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const body = document.body;
    const filterOverlays = document.querySelectorAll('.popup-modal-fillter-ovarlay'); // Note the plural 's' for clarity

    function openModal() {
        const modal = document.querySelector('.popup-modal');
        if (modal) {
            modal.classList.add('open');
            body.classList.add('modal-open');
            filterOverlays.forEach(overlay => overlay.classList.add('modal-open'));

            const closeButton = modal.querySelector('.close-modal');
            if (closeButton) {
                closeButton.addEventListener('click', closeModal);
            } else {
                console.warn('Close button not found.');
            }

            // Add event listener to overlays to close the modal when clicked
            filterOverlays.forEach(overlay => {
                overlay.addEventListener('click', closeModal);
            });
        }
    }

    function closeModal() {
        const modal = document.querySelector('.popup-modal');
        if (modal) {
            modal.classList.remove('open');
            body.classList.remove('modal-open');
            filterOverlays.forEach(overlay => overlay.classList.remove('modal-open'));
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
});



     document.addEventListener('DOMContentLoaded', function() {
        var videoBlocks = document.querySelectorAll('.video-block');

        videoBlocks.forEach(function(videoBlock) {
            var video = videoBlock.querySelector('.video-tag');
            var videoTime = videoBlock.querySelector('.video-time');

            function updateVideoDuration() {
                var duration = video.duration;
                var minutes = Math.floor(duration / 60);
                var seconds = Math.floor(duration % 60);
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                videoTime.textContent = minutes + ':' + seconds;
            }

            video.addEventListener('loadedmetadata', updateVideoDuration);

            videoBlock.addEventListener('mouseenter', function() {
                if (video.readyState >= 1) {  // Check if metadata is loaded
                    updateVideoDuration();
                }
                video.play();
            });

            videoBlock.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0; // Reset video to the beginning
            });
        });
    });

     /*** checkout select js ***/

      document.addEventListener('DOMContentLoaded', () => {
    let zIndexCounter = 1;
    document.querySelectorAll('.select').forEach(select => {
        const selectBtn = select.querySelector('.selectBtn');
        const selectDropdown = select.querySelector('.selectDropdown');
        
        selectBtn.addEventListener('click', () => {
            const isOpen = selectDropdown.classList.toggle('toggle');
            selectDropdown.style.zIndex = zIndexCounter++;
            selectBtn.classList.toggle('active', isOpen); // Toggle 'active' class based on the dropdown state
        });
        
        selectDropdown.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => {
                selectDropdown.classList.remove('toggle');
                selectBtn.classList.remove('active'); // Remove 'active' class when an option is selected
                selectBtn.setAttribute('data-type', option.getAttribute('data-type'));
                selectBtn.innerText = option.innerText;
            });
        });
    });
    });
        /*** checkout select js end***/

document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.querySelector('.next-btn');
    const editButton = document.querySelector('.edit-profile');
    const orderButton = document.querySelector('.order-btn');
    const editcardButton = document.querySelector('.edit-card');
    
    const customerForm = document.getElementById('customer-form');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');
    const step5 = document.getElementById('step-5');

    // Add checks to ensure elements are found
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (customerForm) customerForm.style.display = 'none';
            if (step1) step1.style.display = 'block';
            if (step2) step2.style.display = 'block';
        });
    }

    if (editButton) {
        editButton.addEventListener('click', function() {
            if (customerForm) customerForm.style.display = 'block';
            if (step1) step1.style.display = 'none';
            if (step2) step2.style.display = 'none';
            if (step5) step5.style.display = 'none';
        });
    }

    if (orderButton) {
        orderButton.addEventListener('click', function() {
            if (step3) step3.style.display = 'none';
            if (step4) step4.style.display = 'block';
            if (step5) step5.style.display = 'block';
        });
    }

    if (editcardButton) {
        editcardButton.addEventListener('click', function() {
            if (step3) step3.style.display = 'block';
            if (step4) step4.style.display = 'none';
            if (step5) step5.style.display = 'none';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const paymentButtons = document.querySelectorAll('.payment-btn');
    const forms = document.querySelectorAll('.payment-form-content');

    if (paymentButtons.length && forms.length) {
        paymentButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                // Prevent the default form validation behavior
                event.preventDefault();

                // Remove active class from all buttons
                paymentButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                this.classList.add('active');

                // Hide all forms
                forms.forEach(form => form.classList.remove('active'));
                forms.forEach(form => form.style.display = 'none');
                
                // Show the target form
                const targetForm = document.querySelector(this.dataset.target);
                if (targetForm) {
                    targetForm.classList.add('active');
                    targetForm.style.display = 'block';
                }
            });
        });

        // Initially display the first form
        forms[0].style.display = 'block';
    }
});



// Function to show the sign-in popup
function showSignInPopup() {
    removeClass('#sign-up-popup'); // Remove classes from sign-up popup
    document.querySelector('#sign-in-popup').classList.add('login-popup-modal');
    document.body.classList.add('login-popup-modal-body');
}

// Function to show the sign-up popup
function showSignUpPopup() {
    removeClass('#sign-in-popup'); // Remove classes from sign-in popup
    document.querySelector('#sign-up-popup').classList.add('login-popup-modal');
    document.body.classList.add('login-popup-modal-body');
}

// Function to remove the modal classes from a specific element
function removeClass(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.remove('login-popup-modal');
    }
    document.body.classList.remove('login-popup-modal-body');
}

// Add click event listener to all elements with the 'sign-link' class
document.querySelectorAll('.sign-link').forEach(function(element) {
    element.addEventListener('click', showSignInPopup);
});

// Add click event listener to all elements with the 'sign-up' class
document.querySelectorAll('.sign-up').forEach(function(element) {
    element.addEventListener('click', showSignUpPopup);
});

// Add event listener for elements with the 'login-close' class
document.querySelectorAll('.login-close').forEach(function(element) {
    element.addEventListener('click', function() {
        removeClass('#sign-in-popup');
        removeClass('#sign-up-popup');
    });
});


/** for card loading btn***/
     document.addEventListener("DOMContentLoaded", function() {
      // Function to add the 'loading-btn' class on click and remove it after 2 seconds
      function addLoadingClass(event) {
        const element = event.currentTarget;
        console.log('Anchor clicked:', element); // Debugging
        element.classList.add('loading-btn');
        setTimeout(function() {
          element.classList.remove('loading-btn');
        }, 2000);
      }

      // Attach the event listener to all elements with the class 'add-hl-button'
      const buttons = document.querySelectorAll('.add-hl-button');
      if (buttons.length === 0) {
        console.log('No elements found with class .add-hl-button'); // Debugging
      } else {
        buttons.forEach(function(button) {
          button.addEventListener('click', addLoadingClass);
        });
      }
    });





     // Select all elements with the class 'add-wl-button'
const buttons = document.querySelectorAll('.add-wl-button');

// Function to toggle the class
function toggleClass(event) {
    event.target.classList.toggle('filled-btn');
}

// Add the event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', toggleClass);
});


//** info popup****/
// Open the popup
document.addEventListener('DOMContentLoaded', function() {
    var infoPopupBtn = document.querySelector('.info-popup-btn');
    var infoPopup = document.querySelector('.info-popup');
    var closeButtons = document.querySelectorAll('.info-close');

    if (infoPopupBtn && infoPopup) {
        infoPopupBtn.addEventListener('click', function() {
            infoPopup.classList.add('info-active');
            document.body.classList.add('info-active'); // Add overlay class to body
        });
    }

    if (closeButtons.length > 0 && infoPopup) {
        closeButtons.forEach(function(closeButton) {
            closeButton.addEventListener('click', function() {
                infoPopup.classList.remove('info-active');
                document.body.classList.remove('info-active'); // Remove overlay class from body
            });
        });
    }
});





document.addEventListener('DOMContentLoaded', function () {
    const collectionNameElement = document.querySelector('.collection-name');
    const inputEditNameElement = document.querySelector('.input-edit-name');
    const editCollectionButtons = document.querySelectorAll('.edit-collection');
    const clearInputButton = document.querySelector('.clear-input');

    if (collectionNameElement && inputEditNameElement && clearInputButton) {
        editCollectionButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                collectionNameElement.style.display = 'none';
                inputEditNameElement.style.display = 'flex';
            });
        });

        clearInputButton.addEventListener('click', function () {
            collectionNameElement.style.display = 'flex';
            inputEditNameElement.style.display = 'none';
        });
    }
});


// Add click event listeners to all .delete-collection elements if they exist
const deleteCollectionElements = document.querySelectorAll('.delete-collection');
if (deleteCollectionElements.length > 0) {
    deleteCollectionElements.forEach(function(element) {
        element.addEventListener('click', function() {
            document.querySelector('#delete-popup-collection').classList.add('info-active');
            document.querySelector('body').classList.add('info-active');
        });
    });
}

// Add click event listeners to all .info-close elements within the delete popup if they exist
const deletePopupCloseElements = document.querySelectorAll('#delete-popup-collection .info-close');
if (deletePopupCloseElements.length > 0) {
    deletePopupCloseElements.forEach(function(element) {
        element.addEventListener('click', function() {
            document.querySelector('#delete-popup-collection').classList.remove('info-active');
            document.querySelector('body').classList.remove('info-active');
        });
    });
}




// Add click event listeners to all other .info-close elements if they exist
const infoCloseElements = document.querySelectorAll('.info-close');
if (infoCloseElements.length > 0) {
    infoCloseElements.forEach(function(element) {
        element.addEventListener('click', function() {
            var popup = element.closest('.info-active');
            if (popup) {
                popup.classList.remove('info-active');
            }
            document.querySelector('body').classList.remove('info-active');
        });
    });
}

// Function to toggle the edit-dropdown-popup
function toggleDropdown(event) {
    event.stopPropagation(); // Prevent click event from propagating to the document
    document.querySelector('.edit-dropdown-popup').classList.toggle('open');
}

// Function to close the edit-dropdown-popup
function closeDropdown() {
    var dropdown = document.querySelector('.edit-dropdown-popup');
    if (dropdown) {
        dropdown.classList.remove('open');
    }
}

// Add click event listener to all .mobile-edit-popup elements if they exist
const mobileEditPopupElements = document.querySelectorAll('.mobile-edit-popup');
if (mobileEditPopupElements.length > 0) {
    mobileEditPopupElements.forEach(function(element) {
        element.addEventListener('click', toggleDropdown);
    });
}

// Add click event listener to the document to close the dropdown when clicking outside
document.addEventListener('click', function(event) {
    const isClickInside = event.target.closest('.mobile-edit-popup') !== null;
    if (!isClickInside) {
        closeDropdown();
    }
});






document.addEventListener('DOMContentLoaded', function() {
    // Select all wishlist buttons
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');

    // Function to handle adding/removing classes
    function handleClassChanges() {
        // Add 'info-active' class to #add-collection-popup
        document.querySelector('#add-collection-popup').classList.add('info-active');
                document.querySelector('body').classList.add('info-active');

        // Remove 'info-close' class from #add-collection-popup and body
        document.querySelector('body').classList.remove('info-close');
        document.body.classList.remove('info-close');
    }

    // Add click event listeners to all wishlist buttons
    wishlistButtons.forEach(function(button) {
        button.addEventListener('click', handleClassChanges);
    });
});







        /**** slick jqery for   product page slider and other functions ****/
       /**** slick jqery for   product page slider and other functions ****/ 
     /**** slick jqery for   product page slider and other functions ****/

        $(document).ready(function() {
            // Initialize each instance of the Slick slider
            $('.latest-collections-slider-product').each(function() {
                var $slider = $(this);

                $slider.slick({
                    dots: false,
                    arrows: false,
                    autoplay: false,
                    autoplaySpeed: 3000,
                    infinite: false,
                    slidesToShow: 3.7,
                    responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2.5,
                            slidesToScroll: 1,
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            autoplay:true,
                             infinite: true,
                            autoplaySpeed: 9000,
                             dots: true,
                            slidesToScroll: 1
                        }
                    }]
                });

                // Custom navigation buttons for this slider instance
                $slider.closest('.latest-collections-product').find('.prev-btn').click(function() {
                    $slider.slick("slickPrev");
                });

                $slider.closest('.latest-collections-product').find('.next-btn').click(function() {
                    $slider.slick("slickNext");
                });

                // Function to update button states
                function updateButtonStates() {
                    let currentSlide = $slider.slick('slickCurrentSlide');
                    let slickObject = $slider.slick('getSlick');
                    let totalSlides = slickObject.slideCount - slickObject.options.slidesToShow;

                    $slider.closest('.latest-collections-product').find('.prev-btn').toggleClass("slick-disabled", currentSlide === 0);
                    $slider.closest('.latest-collections-product').find('.next-btn').toggleClass("slick-disabled", currentSlide >= totalSlides);
                }

                // Initial state update
                updateButtonStates();

                // Update button states after each slide change
                $slider.on('afterChange', function(event, slick, currentSlide) {
                    updateButtonStates();
                });

                // Update button states on initialization
                $slider.on('init', function(event, slick) {
                    updateButtonStates();
                });
            });
        });

        /**** end ****/



        /*** gallery slider*****/

         $(document).ready(function(){
        $('.gallery-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.gallery-thumb'
        });

        $('.gallery-thumb').slick({
            slidesToShow: 4,
             arrows: false,
            slidesToScroll: 1,
            asNavFor: '.gallery-slider',
            dots: false,
            focusOnSelect: true
        });
    });




if (window.innerWidth < 767) {
   $(document).ready(function(){
        $('.mobile-slider').slick({
            dots: true,
            infinite: true,
            arrows:false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1        
        });
    });
   
}




         document.addEventListener('DOMContentLoaded', function () {
  const accordionHeaders = document.querySelectorAll('.product-accordion-header');
  const openByDefault = document.querySelector('.product-accordion-box.open-by-default .product-accordion-content');

  // Open the default accordion
  if (openByDefault) {
    openByDefault.style.display = 'block';
    openByDefault.previousElementSibling.classList.add('active');
  }

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isOpen = content.style.display === 'block';

      // Close all accordion contents and remove active class from headers
      document.querySelectorAll('.product-accordion-content').forEach(content => {
        content.style.display = 'none';
      });
      document.querySelectorAll('.product-accordion-header').forEach(header => {
        header.classList.remove('active');
      });

      // Toggle the current accordion content and add active class to the header
      if (!isOpen) {
        content.style.display = 'block';
        this.classList.add('active');
      }




    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const moreLinks = document.querySelectorAll(".count-key");
  moreLinks.forEach(function(moreLink) {
    const topicList = moreLink.closest(".list-keyword-box").querySelector(".keylist");
    

    if (moreLink && topicList) {
      moreLink.addEventListener("click", function(event) {
        event.preventDefault();
         topicList.classList.add("expanded");
        moreLink.style.display = "none"; // Hide the "More" link after expanding
      });
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Get the radio buttons
  var allPackRadio = document.querySelector('input[name="pack"][value="All Pack"]');
  var specificSubPackRadio = document.querySelector('input[name="pack"][value="Specific Sub-Pack"]');
  
  // Get the subpack selection div
  var subpackSelection = document.getElementById('subpackselection');
  
  // Function to toggle the subpack selection display
  function toggleSubpackSelection() {
    if (specificSubPackRadio.checked) {
      subpackSelection.style.display = 'block';
    } else {
      subpackSelection.style.display = 'none';
    }
  }
  
  // Add event listeners to the radio buttons
  if (allPackRadio && specificSubPackRadio && subpackSelection) {
    allPackRadio.addEventListener('change', toggleSubpackSelection);
    specificSubPackRadio.addEventListener('change', toggleSubpackSelection);

    // Initialize the display based on the default checked radio button
    toggleSubpackSelection();
  }
});



   document.addEventListener('DOMContentLoaded', function () {
    const productKeywordsContainers = document.querySelectorAll('.product-keywords');

    productKeywordsContainers.forEach((container) => {
        const showListButton = container.querySelector('.show-list-btn');
        const bottomWrapper = container; // since the button is within its own container

        if (showListButton && bottomWrapper) {
            console.log('Elements found:', showListButton, bottomWrapper);

            showListButton.addEventListener('click', function () {
                console.log('Button clicked:', showListButton);
                console.log('Bottom wrapper before toggle:', bottomWrapper.classList);

                bottomWrapper.classList.toggle('show-all-list');

                console.log('Bottom wrapper after toggle:', bottomWrapper.classList);

                if (bottomWrapper.classList.contains('show-all-list')) {
                    showListButton.textContent = 'Show less -';
                } else {
                    showListButton.textContent = 'Show more +';
                }
            });
        } else {
            console.log('One or both elements not found in container:', container);
        }
    });
});






 $(document).ready(function() {
  $('.popup-slider').slick({
    draggable: true,
    arrows: true,
    dots: false,
    fade: true,
    speed: 900,
    infinite: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100
  })
});

document.addEventListener('DOMContentLoaded', function() {
    // When clicking on .product-popup-btn
    document.querySelectorAll('.product-popup-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelector('.product-popup').classList.add('open');
            document.querySelector('body').classList.add('open');
        });
    });

    // When clicking on .product-popup-close
    document.querySelectorAll('.product-popup-close').forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.querySelector('.product-popup').classList.remove('open');
            document.querySelector('body').classList.remove('open');
        });
    });

    // Close popup when clicking outside the .product-popup-wrapper
    document.addEventListener('click', function(event) {
        const productPopup = document.querySelector('.product-popup');
        const productPopupWrapper = document.querySelector('.product-popup-wrapper');
        if (productPopup.classList.contains('open') && !productPopupWrapper.contains(event.target)) {
            productPopup.classList.remove('open');
            document.querySelector('body').classList.remove('open');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var infoPopupBtndownload = document.querySelector('.download-popup-button');
    var infoPopupdownload = document.querySelector('.info-popup');
    var closeButtonsdownload = document.querySelectorAll('.info-close');

    if (infoPopupBtndownload && infoPopupdownload) {
        infoPopupBtndownload.addEventListener('click', function() {
            infoPopupdownload.classList.add('info-active');
            document.body.classList.add('info-active'); // Add overlay class to body
        });
    }

    if (closeButtonsdownload.length > 0 && infoPopupdownload) {
        closeButtonsdownload.forEach(function(closeButton) {
            closeButton.addEventListener('click', function() {
                infoPopupdownload.classList.remove('info-active');
                document.body.classList.remove('info-active'); // Remove overlay class from body
            });
        });
    }
});




 $(document).ready(function() {
            // Initialize the Slick sliders
            $('.review-slider').each(function(index, element) {
                let $slider = $(element);

                $slider.slick({
                    dots: false,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    infinite: false,
                    slidesToShow: 3,
                    responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,
                                 autoplay:true,
                             infinite: true,
                            autoplaySpeed: 9500,
                                 dots: false,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });

                // Custom navigation buttons for each slider
                $slider.closest('.review-section').find('.prev-btn').click(function() {
                    $slider.slick('slickPrev');
                });

                $slider.closest('.review-section').find('.next-btn').click(function() {
                    $slider.slick('slickNext');
                });

                // Function to update button states
                function updateButtonStates() {
                    let currentSlide = $slider.slick('slickCurrentSlide');
                    let slickObject = $slider.slick('getSlick');
                    let totalSlides = slickObject.slideCount - slickObject.options.slidesToShow;

                    $slider.closest('.review-section').find('.prev-btn').toggleClass('slick-disabled', currentSlide === 0);
                    $slider.closest('.review-section').find('.next-btn').toggleClass('slick-disabled', currentSlide >= totalSlides);
                }

                // Initial state update
                updateButtonStates();

                // Update button states after each slide change
                $slider.on('afterChange', function(event, slick, currentSlide) {
                    updateButtonStates();
                });

                // Update button states on initialization
                $slider.on('init', function(event, slick) {
                    updateButtonStates();
                });
            });
        });


document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(el => el.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });

    });
});


