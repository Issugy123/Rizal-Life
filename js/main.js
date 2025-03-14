const responsive = {
    0: {
        items: 1
    },
    320: {
        items: 1
    },
    560: {
        items: 2
    },
    960: {
        items: 3
    }
}

$(document).ready(function () {

    $nav = $('.nav');
    $toggleCollapse = $('.toggle-collapse');

    /** click event on toggle menu */
    $toggleCollapse.click(function () {
        $nav.toggleClass('collapse');
    })

    // owl-crousel for blog
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: false,
        autoplayTimeout: 3000,
        dots: false,
        nav: true,
        navText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')],
        responsive: responsive
    });


    // click to scroll top
    $('.move-up span').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    })

    // AOS Instance
    AOS.init();

    $(document).ready(function() {
        // When the "Members" link is clicked
        $('.nav-link a[href^="#"]').on('click', function(e) {
            e.preventDefault(); // Prevent the default action
    
            var target = this.hash; // Get the target hash (e.g., #blog-sites)
    
            // Animate the scroll
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000); // Scroll duration in milliseconds (1000ms = 1 second)
        });
    });
    let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})
let player = document.getElementById('video_player'); 
let play_pause_btn = document.getElementById('play_pause_btn');
let current_duration = document.getElementById('current_duration');
let total_duration = document.getElementById('total_duration');
let progress_bar = document.getElementById('progress_bar');
let skip_backward = document.getElementById('skip_backward');
let skip_forward = document.getElementById('skip_forward');

/*player_status is zero means video is paused & player_status is 1 means video is playing*/
let player_status = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function play_pause() {
    if (player_status === 0) {
        player.play();
        player_status = 1;
        timer = setInterval(update_player, 1000);
        play_pause_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    } else {
        player.pause();
        player_status = 0;
        play_pause_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }
}
play_pause_btn.addEventListener('click', play_pause);

/*function update every second*/
function update_player() {
    current_duration.innerHTML = formatTime(player.currentTime);
    const percent = (player.currentTime / player.duration) * 100;
    progress_bar.style.width = `${percent}%`;

    if (player.ended) {
        player_status = 0;
        play_pause_btn.innerHTML = '<i class="fa fa-repeat" aria-hidden="true"></i>';
    }
}

/*skip_forward*/
function skip() {
    player.currentTime += parseFloat(this.dataset.skip);
    update_player();
}
skip_forward.addEventListener('click', skip);

/*skip_backward*/
function skip2() {
    player.currentTime += parseFloat(this.dataset.skip);
    update_player();
}
skip_backward.addEventListener('click', skip2);

window.onload = function() {
    total_duration.innerHTML = formatTime(player.duration);
}

});