var Dino = $('.Dino');
var SpriteDino = $('#SpriteDino');
var Saltar;
var CancelFalling;

var Timer;
var TimerOff;
var TiempoDia;
var Cactus = $('.Cactus');
var EntrarAlColision = true;

$(document).ready(function() {
  $('body').css('display', 'block');
  
 
  //Animaciones de entrada
  $('#BtnIniciar').css('animation',  'ButtonIniciar 3s linear');
  $('.DinoAnimate').css( 'animation',  'DinoLlegar 3s linear');

 
  
  setTimeout(() => {
    $('.DinoAnimate').css('animation', 'DinoSalir 3s linear');
  }, 3300);
  setTimeout(() => {
    $('.DinoAnimate').css('display', 'none');
    $('#DinoAnimateImg').attr('src', 'img/Dino_run_right.gif');
    $('#BtnIniciar').attr('disabled', false);
  }, 6000);


  $('#BtnIniciar').on('click', function() {
    $('.clickToStart').show();
    $('.Juego').css('display', 'block');
    $('#Menu').css('display', 'none');
    $('.Rank').css('display', 'none');
    Timer = 0;
    TiempoDia = 0;
    $('.Juego').css('animation', 'none');
    $('#scoreH1').html('SCORE: '+Timer);
    TimerOff = false;
    Saltar = true;
    CancelFalling = false;

    $('#SoundRun')[0].play();
    $('#SoundRun')[0].volume = 0.2;

    Dino.css('bottom', '0');
    SpriteDino.attr('src', 'img/Dino_run.gif');

  })
  
  //Juego
  $('.clickToStart').on('click', function() {
    $(this).hide();
    $('.Score').show();
    //Timer
    setInterval(() => {
      if (TimerOff == false) {
        Timer = Timer + 1;
        TiempoDia = TiempoDia + 1;
        $('#scoreH1').html('SCORE: '+Timer);
  
        if (TiempoDia == 15) {
          $('.Juego').css('animation', 'Noche 3s linear');
          setTimeout(() => {
            $('.Juego').css('filter', 'brightness(30%)');
          }, 3000);
        }
        if(TiempoDia == 30){
          $('.Juego').css('animation', 'none');
          $('.Juego').css('animation', 'Dia 3s linear');
          setTimeout(() => {
          $('.Juego').css('filter', 'brightness(100%)');
          }, 3000);
          TiempoDia = 0;
        }
       
      }
    }, 1000);
    
    //PC
    if (screen.width > 920) {
      setTimeout(() => {
        Cactus.css({'animation': 'Cactus 2s linear infinite', 'display':'block'});
      }, 800);
      //Colisión
      setInterval(() => {
        var Cactus_left = Cactus.css('left');
        Cactus_left = Cactus_left.slice(0, -2);
        Cactus_left = parseInt(Cactus_left);
  
        var Cactus_right = Cactus.css('right');
        Cactus_right = Cactus_right.slice(0, -2);
        Cactus_right = parseInt(Cactus_right);
      
        var Dino_bottom = Dino.css('bottom');
        Dino_bottom = Dino_bottom.slice(0, -2);
        Dino_bottom = parseInt(Dino_bottom);
        
        //Colisión
        if ( SpriteDino.attr('src') == 'img/Dino_jump.png' && Cactus_left > 0 && Cactus_left <= 110 && Dino_bottom < 120 && EntrarAlColision == true || SpriteDino.attr('src') == 'img/Dino_falling.png' && Cactus_left > -30 && Cactus_left <= 110 && Dino_bottom < 120 && EntrarAlColision == true || Cactus_left > 1 && Cactus_left <= 188 && Dino_bottom == 0 && EntrarAlColision == true) {
          EntrarAlColision = false;
          TimerOff = true;
          Saltar = false;
          CancelFalling = true;
          $('#SoundDead')[0].play();
          $('#SoundRun')[0].pause();
          $('.Juego').css('filter', 'brightness(100%)');
          setTimeout(() => {
            $('.Juego').css('filter', 'brightness(100%)');
          }, 3200);
          Cactus.css('animation', 'none');
          Cactus.css('right', Cactus_right);
          Dino.css('bottom', Dino_bottom);
          Dino.css('animation', 'none');
          $('.Rank').css('display', 'block');
  
          if ( Dino_bottom == 0) {
            SpriteDino.attr('src', 'img/Dino_stop.png');
          }
  
          
  
          //MENU DE GAMEOVER
          $('.GameOver').css({'display':'block', 'animation': 'FondoGameOver 2s linear'});
          $('.TituloGameOver').css({'animation': 'TituloGameOver 2s linear'});
          $('.BotonesGameOver').css({'animation': 'BotonesGameOver 2s linear'});
          $('#DivBtnSaveScore').css({'display':'block','animation': 'MostrarBtnSaveScore 2s linear'});
          $('.Puntuacion').css({'animation': 'Puntuacion 2s linear'});
          $('.Puntuacion').html('Puntuación: '+Timer);
      
        }
        
      
      }, 1);  
  
      //Volver a Jugar
      //Boton Reload
      $('#BTNReload').on('click', function() {
        $('#BtnSaveScore').attr('disabled', false);
        $('.GameOver').css('display', 'none');
        $('.Rank').css('display', 'none');
        $('.Juego').css('animation', 'none');
        $('#scoreH1').html('SCORE: '+Timer);
        $('#DivBtnSaveScore').css('display','none');

        $('#SoundDead')[0].pause();
        $('#SoundDead')[0].currentTime = 0;
        $('#SoundRun')[0].play();
        EntrarAlColision = true;
        Timer = 0;
        TiempoDia = 0;
        TimerOff = false;
        Saltar = true;
        CancelFalling = false;
        Cactus.css({'right': '0', 'display':'none'});
        setTimeout(() => {
          Cactus.css({'animation': 'Cactus 2s linear infinite', 'display':'block'});
        }, 800);
        $('.Juego').css('filter', 'brightness(100%)');
        
        
        Dino.css('bottom', '0');
        SpriteDino.attr('src', 'img/Dino_run.gif');
      })
  
  
      //Saltar
      $(document).keydown(function (tecla) {
        if (tecla.keyCode == 32 && Saltar == true) { //SPACE
          SpriteDino.attr('src', 'img/Dino_jump.png');
          $('#Soundjumping')[0].play();
          $('#SoundRun')[0].pause();
          Saltar = false;
          Dino.css('animation', 'DinoSaltar 0.8s linear alternate');
      
          setTimeout(() => {
            if (CancelFalling == false) {
              SpriteDino.attr('src', 'img/Dino_falling.png');
            }
          }, 520);
      
          setTimeout(() => {
            if (CancelFalling == false) {
              $('#Soundfalling')[0].play();
              Dino.css('animation', 'none');
              SpriteDino.attr('src', 'img/Dino_run.gif');
              Saltar = true;
              $('#SoundRun')[0].play();
            }
          }, 800);
          
        }
      });
    }
  
    //Mobile
    if (screen.width  <= 920) {
      setTimeout(() => {
        Cactus.css({'animation': 'Cactus 3s linear infinite', 'display':'block'});
      }, 800);
      //Colisión
      setInterval(() => {
        var Cactus_left = Cactus.css('left');
        Cactus_left = Cactus_left.slice(0, -2);
        Cactus_left = parseInt(Cactus_left);
  
        var Cactus_right = Cactus.css('right');
        Cactus_right = Cactus_right.slice(0, -2);
        Cactus_right = parseInt(Cactus_right);
          
        var Dino_bottom = Dino.css('bottom');
        Dino_bottom = Dino_bottom.slice(0, -2);
        Dino_bottom = parseInt(Dino_bottom);
            
        //Colisión
        
  
        if (SpriteDino.attr('src') == 'img/Dino_jump.png' && Cactus_left >= 0 && Cactus_left <= 53 && Dino_bottom <= 60 && EntrarAlColision == true || SpriteDino.attr('src') == 'img/Dino_falling.png' && Cactus_left >= -35 && Cactus_left <= 53 && Dino_bottom <= 60 && EntrarAlColision == true || Cactus_left > 0 && Cactus_left <= 60 && Dino_bottom == 0 && EntrarAlColision == true) {
          EntrarAlColision = false;
          TimerOff = true;
          Saltar = false;
          CancelFalling = true;
          $('#SoundDead')[0].play();
          $('#SoundRun')[0].pause();
          $('.Rank').css('display', 'block');
          $('.Juego').css('filter', 'brightness(100%)');
          setTimeout(() => {
            $('.Juego').css('filter', 'brightness(100%)');
          }, 3200);
          Cactus.css('animation', 'none');
          Cactus.css('right', Cactus_right);
          Dino.css('bottom', Dino_bottom);
          Dino.css('animation', 'none');
          if ( Dino_bottom == 0) {
            SpriteDino.attr('src', 'img/Dino_stop.png');
          }
  
          //MENU DE GAMEOVER
          $('.GameOver').css({'display':'block', 'animation': 'FondoGameOver 2s linear'});
          $('.TituloGameOver').css({'animation': 'TituloGameOverMobile 2s linear'});
          $('.BotonesGameOver').css({'animation': 'BotonesGameOver 2s linear'});
          $('#DivBtnSaveScore').css({'display':'block','animation': 'MostrarBtnSaveScore 2s linear'});
          $('.Puntuacion').css({'animation': 'Puntuacion 2s linear'});
          $('.Puntuacion').html('Puntuación: '+Timer);
          
        }  
      
      }, 200); 
       //Volver a Jugar
      //Boton Reload
      $('#BTNReload').on('click', function() {
        $('#BtnSaveScore').attr('disabled', false);
        $('.GameOver').css('display', 'none');
        $('.Rank').css('display', 'none');
        $('.Juego').css('animation', 'none');
        $('#scoreH1').html('SCORE: '+Timer);
        $('#DivBtnSaveScore').css('display','none');
        EntrarAlColision = true;
        Timer = 0;
        TiempoDia = 0;
        TimerOff = false;
        Saltar = true;
        CancelFalling = false;
        $('#SoundDead')[0].pause();
        $('#SoundRun')[0].play();
        $('#SoundDead')[0].currentTime = 0;

        Cactus.css({'right': '0', 'display':'none'});
        Dino.css('bottom', '0');
        SpriteDino.attr('src', '../img/Dino_run.gif');
        setTimeout(() => {
          Cactus.css({'animation': 'Cactus 2s linear infinite', 'display':'block'});
        }, 800);
        
      })
  
      $('body').click(function() {
        //Saltar
        if (Saltar == true) {
          SpriteDino.attr('src', 'img/Dino_jump.png');
          $('#Soundjumping')[0].play();
          $('#SoundRun')[0].pause();
          Saltar = false;
          Dino.css('animation', 'DinoSaltar2 1s linear alternate');
      
          setTimeout(() => {
            if (CancelFalling == false) {
              SpriteDino.attr('src', 'img/Dino_falling.png');
            }
          }, 650);
      
          setTimeout(() => {
            if (CancelFalling == false) {
              $('#Soundfalling')[0].play();
              Dino.css('animation', 'none');
              SpriteDino.attr('src', 'img/Dino_run.gif');
              Saltar = true;
              $('#SoundRun')[0].play();
             
            }
          }, 1000);
          
        }
      })
    }
  
    $('#BtnSaveScore').on('click', function () {
     Swal.fire({
      title:'Guardar Puntuación:',
      html:'<label> Ingrese su Nombre: </label><input id="InpNombrePuntuacion" type="text" class="form-control"><button type="button" class="btn btn-primary mt-3" id="Btn2SaveScore"> Guardar </button>',
      showConfirmButton:false,
      showCloseButton:true
     });
     $('#Btn2SaveScore').on('click', function() {
        var Nombre = $('#InpNombrePuntuacion').val();
        var Score = Timer;
        if (Nombre == '') {
          $('#InpNombrePuntuacion').css('border', '1px solid red');
        }
        else{
          $.ajax({
            url:'assets/Ajax.php',
            type:'POST',
            data:{'GuardarPunto':1, 'Nombre': Nombre, 'Score': Score},
          }).done(function(res) {
            swal.close();
            if (res == 1) {
              Swal.fire({
                icon:'success',
                text:'Guardado!',
                toast:true,
                timer: 2500,
                timerProgressBar: true,
                showConfirmButton:false,
                position:'top-end',
              });
              //Animacion de Dino que lleva el boton
              $('#BtnSaveScore').attr('disabled', true);
              $('.DinoAnimate').css({'z-index':'8','transform':'translate(-50%, -50px)', 'bottom':'20px','display':'block', 'animation':  'DinoSalir 3s linear reverse'});
              setTimeout(() => {
                $('.DinoAnimate').css({'display':'block', 'animation':  'DinoLlegar 3s linear reverse'});
                $('#DivBtnSaveScore').css({'animation':  'LlevarsBtnSaveScore 3s linear'});

                
              }, 3400);
              setTimeout(() => {
                $('.DinoAnimate').css('display', 'none');
                $('#DivBtnSaveScore').css('display', 'none');
                $('#DinoAnimateImg').attr('src', 'img/Dino_run_right.gif');
               
              }, 6000);
             
            }
            if (res == 2) {
              Swal.fire({
                icon:'danger',
                text:'Error al guardar!',
                toast:true,
                timer: 2500,
                timerProgressBar: true,
                showConfirmButton:false,
                position:'top-end',
              });
            }
           
          });
        }
  
     })
    })
  
    /* MENU GAME OVER */
    $('#BTNHome').on('click', function() {
     window.location.reload();
    })
  
  });

  //Ranking
  $('#BtnRank').on('click', function() {
    $.ajax({
      url:'assets/Ajax.php',
      type:'POST',
      data:{'BuscarRank':1},
    }).done(function(res) {
      var datosUsers = res;
      Swal.fire({
        title:'<h4><i class="fa-solid fa-ranking-star"></i> Ranking  <i class="fa-solid fa-ranking-star"></i></h4>',
        html : '<div class="container">'+datosUsers+'</div>',
        showConfirmButton: false,
        showCloseButton: true
  
      })
    });
  })
})

