// 개발자도구창의 토글디바이스툴바 사용하지 않았을때
// 테스트 상황(윈도우 넓이 조절)에서 생기는 오류를 해결하기 위한 코드


var deviceSize = 1024
function scrollOX(status){
    $('html').css({
        overflowY:status
    })
    return $('html').width()
}
// 토글디바이스툴바가 켜져 있으면 scX와 scO는 같은 값이 되므로
// 아래 if 문을 들어가지 않아서 deviceSize는 원래 값임
var scX = scrollOX('hidden')
var scO = scrollOX('scroll')
var scD = scX - scO
// 토글디바이스툴바가 꺼져 있으면 스크롤바가 생성되므로
// 스크롤바 넓이 17px을 deviceSize에서 빼야 함
if (scD>0) {
    deviceSize = deviceSize - scD
}
var ww = $(window).width()
if (ww>deviceSize ) {
    $('html').addClass('pc')
} else {
    $('html').addClass('mobile')
}

$(window).on('resize', function(){
    let ww = $(window).width()
    if (ww>deviceSize && !$('html').hasClass('pc') ) {
        $('html').addClass('pc').removeClass('mobile')
        location.reload()
    } else if (ww<=deviceSize && !$('html').hasClass('mobile')) {
        $('html').addClass('mobile').removeClass('pc')
        location.reload()
    }
})
// 여기까지 토글디바이스툴바 유무에 따른 테스트 오류 코드 끝


$(window).on('load', function(){
    
    if ( !sessionStorage.getItem('refresh') ) {
        sessionStorage.setItem('refresh', 'yes')
        $('.introAni').addClass('on')
        let count = 0;
        let timer = setInterval(add, 25)
        function add() {
            count++
            if (count>=100) { 
                clearInterval(timer) 
                $('.introAni').animate({
                    left:'-100%'
                }, 500, function(){
                    $(this).removeClass('on')
                })
            }
            $('.introAni div').eq(1).text(count+'%')
        }
    } 

    $('html').animate({
        scrollTop:0
    }, 100)

    let imgh = ($('.slide .img').height() / 2) - 35
    $('.article1 .slick-arrow').css({
        top:'0%',
        transform:`translateY(${imgh}px)`,
    })


    let objString = localStorage.getItem('objkey') 
    if ( objString ) {
        const obj = JSON.parse(objString)
        if ( Date.now()>obj.expire ) {
            $('.popup').addClass('on')
            localStorage.removeItem('objkey')
        } else {
            $('.popup').removeClass('on')
        }
    } else {
        $('.popup').addClass('on')
    }


})



// pc화면용 네비게이션 액션
// $('#header #nav .depth1 > li').on('mouseover mouseout', function(){
//     if ( $('html').hasClass('pc') ) {
//         $(this).find('.depth2').stop().slideToggle()
//     }
// })

$('#header #nav .depth1 > li').on('mouseover', function(){
    if ( $('html').hasClass('pc') ) {
        $(this).find('.depth2').stop().slideDown()
    }
})
$('#header #nav .depth1 > li').on('mouseout', function(){
    if ( $('html').hasClass('pc') ) {
        $(this).find('.depth2').stop().slideUp()
    }
})


// 위의 코드 결과와 같음
// $('#header #nav .depth1 > li').hover(
//     function(){
//         if ( $('html').hasClass('pc')) {
//             $(this).find('.depth2').stop().slideDown()
//         }
//     },
//     function(){
//         if ( $('html').hasClass('pc')) {
//             $(this).find('.depth2').stop().slideUp()
//         }
//     }
// )





$('#header .open').on('click', function(){
    $(this).parents('#header').addClass('on')
})

$('#header .close').on('click', function(){
    $(this).parents('#header').removeClass('on')
})

$('#header #nav .depth1 > li > a').on('click', function(){
    if ( $('html').hasClass('mobile') && $(this).next().is('.depth2') ) {
        // $(this).parent().toggleClass('on')
        $(this).next().stop().slideToggle()
        return false
    }
})


$(window).scroll(function(){
    let sct = $(this).scrollTop()
    if (sct>100) {
        $('#gotop').fadeIn(300)
    } else {
        $('#gotop').fadeOut(300)
    }
})

$('#gotop a').click(function(){
    $('html').animate({
        scrollTop:'0'
    }, 500)
    return false
})

$('.fam').on('click', function(){
    $(this).find('ul').slideToggle()
})


$('.close button').on('click', function(){
    if ( $(this).prev().prop('checked') ) {
        let tts = Date.now()+(100000)   // 하루는 (24*60*60*1000)ms
        const obj = {
            check : 'yes',
            expire : tts
        }
        localStorage.setItem('objkey', JSON.stringify(obj))
    } 
    $('.popup').removeClass('on')
})

