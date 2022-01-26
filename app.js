

// bg
const list_video = document.querySelectorAll('.video')
const list = document.getElementsByClassName('video_in')

// morning and evening
const btn_check = document.querySelector('.knot')
const btn_day = document.querySelector('.day_night')


// city rain 
const btn_rain = document.querySelector('.lofi_rain')

// control 
const lofi_control= document.querySelector('.lofi_control')
const control_volum = document.querySelector('.bx-slider')
const control_bg = document.querySelector('.bxs-book-reader')
const volum_set = document.querySelector('.control_volum')
    // ------
const bg_set = document.querySelector('.control_background')
const img_01 = document.querySelector('.img_1')
const img_02 = document.querySelector('.img_2')

// play_audio
// const bg_noise = document.querySelectorAll('.noises_song') // danh sach bg_nosi
const song_chill = document.querySelector('.song_chill') // song chill
const volum_chil = document.querySelector('.volum_chil') // thanh volum chill song

const one = document.querySelector('.onee')
const two = document.querySelector('.twoo')
const three = document.querySelector('.threee')
const list_noise_volum = document.querySelectorAll('.noise_volum') // thanh volum bg_nosi


const btn_next = document.querySelector('.next') 
const btn_play = document.querySelector('.play')
const btn_previous = document.querySelector('.previous')
const pause = 'bx-pause-circle'
const play = 'bx-play-circle'


var check_rain = false; //check troi mua
var check_play = false; // kiem tra play music
var check_day = true;   // check ngay dem.
var current_indext = 0;
var current_song = 0;



const lofi_chill = {
    background_one: 
        [
            './video/1/Day-sunny.mp4',
            './video/1/Day-rainny.mp4',
            './video/1/Night-clear.mp4',
            './video/1/Night-rainny.mp4',
        ],
    background_two: 
        [
            './video/2/Day-sunny.mp4',
            './video/2/Day-rainny.mp4',
            './video/2/Night-clear.mp4',
            './video/2/Night-rainny.mp4',
        ],
    audio: 
        [
            './amtham/chill/chill1.mp3',
            './amtham/chill/chill2.mp3',
            './amtham/chill/chill3.mp3',
            './amtham/chill/LateNight.mp3',
        ],
    // doi bg_video
    swap_bg: function  (){
        img_01.addEventListener('click',function(){
            for (let i = 0; i < list.length; i++) {
                list[i].src = lofi_chill.background_one[i]   
            }
        })
        img_02.addEventListener('click',function (){
            for (let i = 0; i < list.length; i++) {
                list[i].src = lofi_chill.background_two[i]   
            }
        })     
    },
    // check_video_bg
    day:function (){
        list_video[current_indext].classList.remove('show')
        if(check_rain == false && check_day == true  ){
            current_indext = 0 
        }

        if(check_rain ==true && check_day== true ){
            current_indext = 1
        }

        if(check_rain==false && check_day == false){
            current_indext = 2;
        }
        
        if(check_rain == true && check_day == false  ){
            current_indext = 3
        }  
        
        list_video[current_indext].classList.add('show')
    },
    rain: function(){
        if(check_rain){
            one.volume = 0.5
            list_noise_volum[0].value = 50
        }else {
            one.volume = 0
            list_noise_volum[0].value = 0
        }  
    },
    
    // lam am thanh tang giam bg_noise
    noise_song: function(){
        one.volume = 0
        two.volume = 0
        three.volume = 0
        
        list_noise_volum[0].onchange = function (){
            if(list_noise_volum[0].value > 1){
                check_rain = true
                lofi_chill.day()
            }
            else {
                check_rain = false
                lofi_chill.day()
            }
            one.volume =  list_noise_volum[0].value/100; 
            one.play()
        }
        list_noise_volum[1].onchange = function (){
            two.volume =  list_noise_volum[1].value/100; 
            two.play()
        }
        list_noise_volum[2].onchange = function (){
            three.volume =  list_noise_volum[2].value/100; 
            three.play()
        }

        
    },
 
    song_chillll: function(){
        song_chill.onplay = function(){
            check_play= true;
            btn_play.classList.add(pause);
            btn_play.classList.remove(play);
        }
        song_chill.onpause = function(){
            check_play = false;
            btn_play.classList.add(play);
            btn_play.classList.remove(pause);
        }
        btn_play.addEventListener('click', function(){
            if(check_play){
                song_chill.pause();
            }
            else {
                song_chill.play()
            }
        })
        // next 
        btn_next.addEventListener('click',function(){
            current_song ++;
            if(current_song >= lofi_chill.audio.length){
                current_song = 0
            }
            song_chill.src = lofi_chill.audio[current_song]
            song_chill.play();
        })

        // previous
        btn_previous.addEventListener('click',function(){
            current_song--;
            if(current_song < 0){
                current_song = lofi_chill.audio.length-1
            }
            song_chill.src = lofi_chill.audio[current_song]
            song_chill.play();
        })
        // volume
        song_chill.volume = volum_chil.value /100;
        volum_chil.onchange = function (e) {
            song_chill.volume = e.target.value /100;
        }

        // one.volume =0
        

    },
    // sử lý sự kiện chung;
    event_handling: function(){
        
        lofi_chill.swap_bg();
        lofi_chill.noise_song();
        lofi_chill.song_chillll();  
        
        // su ly rain
        btn_rain.addEventListener('click',function(){
            if(check_rain == false){
                check_rain = true;
            }
            else {
                check_rain = false;
            }
            lofi_chill.rain()
            lofi_chill.day();
            one.play();
        })  
        // su ly morning and evening
        btn_day.addEventListener('click', function(){
            if(btn_check.classList.toggle('move') == true){
                check_day = false;
            }
            else {
                check_day = true;
            } 
            lofi_chill.day();
        })
        // show control volum & bg_video
        control_volum.addEventListener('click',function (){
            volum_set.classList.toggle('hide')
            lofi_control.classList.toggle('control_click')
        })

        control_bg.addEventListener('click',function (){
            bg_set.classList.toggle('hide')
            lofi_control.classList.toggle('control_click')
        })
        //
        

    },
}

lofi_chill.event_handling();