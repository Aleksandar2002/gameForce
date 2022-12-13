$(document).ready(function(){

    let counter = 0; 
    let countInterval = setInterval(()=>{
        counter++;
        $('.our-business-history h2').each(function(){
            let dataContentVal = $(this).attr('data-content');
            if(counter <= +dataContentVal){
                $(this).text(counter + '+');
            }
        })
        if(counter === 500)clearInterval(countInterval); 
    } ,20);

    $('.to-top').hide();
    $(window).scroll(function () { 
        if($(this).scrollTop() > 620){
            $('.to-top').fadeIn();
        }else{
            $('.to-top').fadeOut();
        }
    });

    $('.to-top button').click(()=>{
        $(window).scrollTop(0);
    })

    $('.gallery .image-box .layer').each(function(){
        $(this).hide();
    })

    $('.gallery .image-box').each(function(){
        $(this).hover(
            function () {
                $(this).children('div').stop(true , true).fadeIn(500);
            }, 
            function () {
                $(this).children('div').stop(true).fadeOut(500);
            }
        );
    })
    // $('.gallery .image-box').click(function (e) { 
    //     e.preventDefault();
    //     $(this).children('img').colorbox({    
    //         rel:'images',
    //         transition:"fade",
    //         opacity:0.5 ,
    //         rel:'group1'})   
    //     console.log($(this).children('img'));
    // });

    // SLIDER IMAGES
    $('.slide').each(function(ind){
        $(this).css('backgroundImage' , `url("assets/img/slider/slideImg${ind+1}.jpg")`)
    })

    $('#nextBtn').click(function(){
        let $active = $('.slider .active');
        $('.slider .active').stop(true).fadeOut('slow');
        if($active.next('.slide').length){
            $active.next('.slide').stop(true).fadeIn('slow').addClass('active');
        }else{
            $('.slider .slide:first').stop(true).fadeIn('slow').addClass('active');
        }
        $active.removeClass('active')
    })

    
    $('#previousBtn').click(function(){
        let $active = $('.slider .active');
        $('.slider .active').stop(true).fadeOut('slow');
        if($active.prev('.slide').length){
            $active.prev('.slide').stop(true).fadeIn('slow').addClass('active');
        }else{
            $('.slider .slide:last').stop(true).fadeIn('slow').addClass('active');
        }
        $active.removeClass('active')
    })

})