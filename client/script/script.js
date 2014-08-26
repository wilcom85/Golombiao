jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
$.mobile.defaultPageTransition = "fade"; 
var home="www.golombiao.com";
var server="http://"+home+"/golombiao/server/index.php/";
var imagePath="http://"+home+"/golombiao/server/uploads/";
var values={0:"none",1:"No violencia",2:"Libertad de expresión",3:"No discriminación",4:"Cuidar el entorno",5:"Participación activa",6:"Cuidarse y cuidar el otro",7:"Igualdad"};
var user;
var galeryImages;
var fb_user;

user= {
  email:"ccast2@hotmail.com",
  first_name: 'Andres',
  last_name:'Castellanos',
  username: "Andresc26",
  city: "Bogotá, Colombia",
  birthday:"01/20/1990",
};
var init;
var controlAlert=true;
var connectControl=true;
var privateKey = "-----BEGIN RSA PRIVATE KEY-----"+
"MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ"+
"WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR"+
"aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB"+
"AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv"+
"xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH"+
"m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd"+
"8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF"+
"z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5"+
"rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM"+
"V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe"+
"aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil"+
"psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz"+
"uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876"+
"-----END RSA PRIVATE KEY-----";

$(window).load(function() {

  setInterval(function () {
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    if (connectionStatus=="offline") 
    {  connectControl=false;
      loadingClose();
      if (controlAlert) 
      { controlAlert=false;

        function alertDismissed() {
          controlAlert=true;
        }
        navigator.notification.alert("Por favor revisa tu conexion a internet",
              alertDismissed,
              'Alerta Golombiao',
              'Cerrar'
              );
      }
    }else{
      if (connectControl==false) {
        changePage("#home");


      };
      connectControl=true;

      if(!init)
      {
        init=true;
        FB.init({
          appId:431026877004103,
          nativeInterface: CDV.FB,
          cookie:true,
          status:true,
          xfbml:true
        });
      }
    }
  }, 5000);

  $(".backButton").click(function() {
    window.history.back();
    cleanforms();
  });

  $(".iconsSections a").click(function() {
    cleanforms();
  });

  $( "#galeria .container" ).scroll(function(event) {
    console.log("scroll");
    event.preventDefault();
    var height=$("#galeria .container").scrollTop()+$("#galeria .container")[0].clientHeight;
    var maxHeight=$("#galeria .container")[0].scrollHeight-15;
    if (maxHeight<height||maxHeight==height) 
    {
      if (galeryImages[counter].name) {

        $("#galeria .container").append("<img alt='' src='"+imagePath+galeryImages[counter].name+"'/> <p class='ui-body ui-body-a'>"+galeryImages[counter].description+"<p/>");
        counter=counter+1;

      }
    }
  });
});



function cleanforms(){

 $("form input").each(function(key,value){
  if ($(value).attr("type")=="button" || $(value).attr("type")=="submit")
  {

  }else
  {
    $(value).val(null);
  }
  $("#identf2").hide();
});
 $(".ciudad").html(" ");
 $("select").each(function(index,element) {
  var myselect = $(element);
  myselect[0].selectedIndex = 0;
  myselect.selectmenu("refresh");
});
}


function clear_form (id_page) {
  $(':input','#'+id_page)
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
  $("select",'#'+id_page).selectmenu('refresh');
}



$( document ).on( "pageshow", "#galeria", function() {

  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
  };

  $.post(server+"teams/getImagesNames", post_values, function(response) {

    galeryImages = jQuery.parseJSON(response);
    console.log(galeryImages.length);
    $("#galeria .container").html(
      "<h3>Galeriá de fotos de Golombiao</h3>"+
      "<p>Encuentra aquí las evidencias fotográficas de los encuentros de Golombiao en toda Colombia.</p>"+
      "<img alt='' src='"+
      imagePath+
      galeryImages[0].name+
      "'/><p class='ui-body ui-body-a'>"+
      galeryImages[0].description+
      "</p>"+
      "<img alt='' src='"+
      imagePath+
      galeryImages[1].name+
      "'/><p class='ui-body ui-body-a'>"+
      galeryImages[1].description+
      "</p>"+
      "<img alt='' src='"+
      imagePath+
      galeryImages[2].name+
      "'/><p class='ui-body ui-body-a'>"+
      galeryImages[2].description+
      "</p>"
      );
    counter=3;
  });
});


function verifyData(){

  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };

  $.post(server+"teams/getData", post_values, function(response) {
   response = jQuery.parseJSON(response);
   if (response.message_error=="Usuario no logueado" )
   {
    customAlert("Usuario deslogueado, por favor accede con tu correo y contraseña");
    changePage('#login');
  }
});
}


function deleteData(){

  localStorage.setItem('session_id',"0");
  localStorage.setItem('email',"0");
  localStorage.setItem('id_user',"0");
  cleanforms();

}

function closeSession(){


  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){}else{
    if(confirm('Desea cerrar sesion?'))
      {} else{ return(false);}
  }

 changePage('#login');

  localStorage.setItem('session_id',"0");
  localStorage.setItem('email',"0");
  localStorage.setItem('id_user',"0");
 



}




function closeApp(){
  navigator.app.exitApp();
}

function reloadApp(){
  $( "#internetPopup" ).popup("close");
  location.reload();
}

$( document ).on( "pageshow", function( event, ui) {

  if ($(event.target).attr("id")=="login"||$(event.target).attr("id")=="register"||$(event.target).attr("id")=="olvidarcontrasena") 
  {

  }
  else{
    verifyData();
  }
  var windowHeight=$(window).height();
  var containerHeight=$(event.target).find(".container").height();
  var footerHeight=$(event.target).find('div[data-role="footer"]').height();
  var headerHeight=$(event.target).find('div[data-role="header"]').height();
  $(event.target).find(".container").height(windowHeight-footerHeight-headerHeight+'px');
});


function refreshPage()
{
  jQuery.mobile.changePage(window.location.href, {
    allowSamePageTransition: true,
    transition: 'none',
    reloadPage: true
  });
}

function aceptRequest(element,typeRequest){
  loadingOpen("Aceptando solicitud");
  var direction;

  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_conv:$(element).parent().attr("id"),
  };
  if (typeRequest==1) {
    direction="teams/aceptRequest";
  }else{
    direction="teams/deleteRequest";
  }
  $.post(server+direction, post_values, function(response) {
    response = jQuery.parseJSON(response);
    loadingClose();
    if (!(response.error)&&typeRequest==1) {

      customAlert("Has aceptado la convocatoria");
      changePage("#pre_conv");changePage("#my_conv");

    }else if (!(response.error)&&typeRequest==2) {

      customAlert("Se ha rechazado la convocatoria");
      changePage("#pre_conv");changePage("#my_conv");

    }else{

      customAlert(response.message_error);
    }
  });
}



$( document ).on("click", ".userData", function() {
  loadingOpen("Cargando Datos");

  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_user:$(this).attr("myid"),
  };

  $.post(server+"teams/userData", post_values, function(response) {
    response = jQuery.parseJSON(response);
    if (response.gender==1) {
      response.gender="Hombre";  
    }else{
      response.gender="Mujer";
    }
    $(".myData2 .nameJ").html(response.first_name+" "+response.last_name);
    $(".myData2 .ageJ").html(response.age+" Años");
    $(".myData2 .genderJ").html(response.gender);
    $(".myData2 .pointsJ").html(response.points+" puntos");
    $( "#userData2" ).popup();
    $( "#userData2" ).popup( "open" );
    loadingClose();
  });
});

$( document ).on("click", ".reto_my_team", function() {

  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_conv:$(this).parent().attr("id"),
    id_equipo:$(this).parent().attr("id_equipo")
  };

  $("#conv_result").val($(this).parent().attr("id"));
  $("#results .principio img").attr("src","images/acuerdos/"+$(this).parent().attr("principio")+".png");
  $("#results .principio h2").html(values[$(this).parent().attr("principio")]);
  $("#results #myteam input[name='id_equipo']").val($(this).parent().attr("id_equipo1"));
  $("#results #otherteam input[name='id_equipo']").val($(this).parent().attr("id_equipo2"));

  $.post(server+"teams/existen_resultados", post_values, function(response) {

    response = jQuery.parseJSON(response);
    if (!(response.error)) {

      $.post(server+"teams/resultsRequests", post_values, function(response2) {

        response2 = jQuery.parseJSON(response2);
        if (!(response2.error)) {

          $(".name_team1").html(response2[0].name_team);
          $(".name_team2").html(response2[1].name_team);

          if (response2[0].total==response2[1].total) {

            $("#equipodestacado").parent().html("Equipos destacados: <span id='equipodestacado'>"+response2[0].name_team+" y "+response2[1].name_team+"</span>");

          }else if (response2[0].total>response2[1].total) {

            $("#equipodestacado").html(response2[0].name_team);

          }else{

            $("#equipodestacado").html(response2[1].name_team);

          }

          $.each(response2[0],function(element){

            renderTable(element,response2);

          });

          function renderTable(myClass,data){

            $("#results2 ."+myClass+" td").each(function(key,value){

              $(value).html(data[key][myClass]+'<img src="images/sun-2.gif">');
            });
          }

          changePage( "#results2");

        }else{

          customAlert(response2.message_error);

        }
      });
}
else if(response.message_error=="Aun no has evaluado, por favor hazlo para ver los resultados"){
  customAlert(response.message_error);
  changePage( "#results");
}else{
  customAlert(response.message_error);
}
});
});


function calculate_age(date_string)
{
  var birthday=date_string.split("/");
  var birth_month=parseInt(birthday[0],10);
  var birth_day=parseInt(birthday[1],10);
  var birth_year=parseInt(birthday[2],10);
  var today_date = new Date();
  var today_year = today_date.getFullYear();
  var today_month = today_date.getMonth();
  var today_day = today_date.getDate();
  var age = today_year - birth_year;

  if ( today_month < (birth_month - 1))
  {
    age--;
  }
  if (((birth_month - 1) == today_month) && (today_day < birth_day))
  {
    age--;
  }
  return age;
}



function login(){

  FB.logout();
  FB.login(function(response){
    FB.api('/me', function(fb_user) {

      if (fb_user.id) {
        var post_values={
          fb_id:fb_user.id,
          email:fb_user.email,
        };
        loadingOpen("Cargando");

        $.post(server+"login/verify_registerfb", post_values, function(response_v) {

          loadingClose();
          response_v = jQuery.parseJSON(response_v);

          if (response_v.success=="true") {

            $("#name_user").html(fb_user.name);
            $("#age_user").html(fb_user.birthday);
            photoUrl="https://graph.facebook.com/"+fb_user.username+"/picture?width=300&height=400";
            $("#photo").attr("src",photoUrl);
            $("#location_user").html(fb_user.location.name);
            localStorage.setItem('session_id',response_v.session_id);
            localStorage.setItem('email',response_v.email);
            localStorage.setItem('id_user',response_v.user_id);

            changePage('#home');

          }else{

            var middle_name="";

            if(fb_user.middle_name!==undefined){

              middle_name=fb_user.middle_name;

            }

            $("#register input[name='first_name']").val(fb_user.first_name+" "+middle_name);
            $("#register input[name='last_name']").val(fb_user.last_name);
            $("#register input[name='age']").val(calculate_age(fb_user.birthday));
            $("#register input[name='fb_id']").val(fb_user.id);
            $("#register input[name='email']").val(fb_user.email);

            if (fb_user.gender=="male"){

              $( "select[name=gender]" ).val(1);

            }else{

              $( "select[name=gender]" ).val(2);

            }

            $( "input:text[name=email]" ).val(fb_user.email);

            photoUrl="https://graph.facebook.com/"+fb_user.username+"/picture?width=300&height=400";

            $("#photo").attr("src",photoUrl) ;

            changePage('#register');
          }
        }).fail(function() {
          customAlert( "error" );
        });
      }
    });
},{scope: 'publish_actions,email,user_birthday,user_location'});
}


$( document ).on( "pageshow", "#results", function() {

  $( "#form_results" ).validate({
    rules:{
      barra:{
        required:true,
      },
      cump_acuerdos:{
        required:true,
      },
      faltas:{
        required:true
      },
      meritos:{
        required:true
      },
      no_players_presents:{
        required:true
      },
      no_players:{
        required:true
      },
      autoevaluacion:{
        required:true
      },
      otherTeam:{
        required:true
      },
      asesor:{
        required:true
      }
    },

    submitHandler: function( form ) {

      loadingOpen("Enviando resultados");

      var post_values={
        session_id:localStorage.getItem('session_id'),
        email:localStorage.getItem('email'),
        id_conv:$("#conv_result").val(),
        barra:$("#results #select-choice-custom2").val()
      };

      $(':input', "#results #myteam").each(function(index, input_element) {

       post_values[input_element.name] = $(input_element).val();
     });

      $.post(server+"teams/guardar_resultados", post_values, function(response) {

        response = jQuery.parseJSON(response);

        if (!(response.error)) {

          loadingClose();

         
          customConfirm("Se ha enviado tu calificación. Deseas compartir una imagen del partido",5,2);
          changePage('#my_conv');

        }else{

          loadingClose();
          customAlert(response2.message_error);

        }
      });
    }
  });
});






function send_results(){

  loadingOpen("Enviando resultados");

  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_conv:$("#conv_result").val(),
    barra:$("#results #select-choice-custom2").val()
  };

  $(':input', "#results #myteam").each(function(index, input_element) {

    post_values[input_element.name] = $(input_element).val();
  });

  $.post(server+"teams/guardar_resultados", post_values, function(response) {

    response = jQuery.parseJSON(response);

    if (!(response.error)) {
      loadingClose();
      customAlert("se ha enviado tus resultados");
      changePage('#my_conv');
    }else{
      loadingClose();
      customAlert(response2.message_error);
    }
  });
}



function register_facebook(){

  FB.login(function(response) {
    FB.api('/me', function(response) {

      $( "input:text[name=name]" ).val(response.name);
      if (response.gender=="male"){
        $( "select[name=gender]" ).val(1);
      }else{
        $("select[name=gender]" ).val(2);
      }
      $( "input:text[name=email]" ).val(response.email);
      $( "input:text[name=city]" ).val(response.location.name);
      $( "input:text[name=birthday]" ).val(response.birthday);
      photoUrl="https://graph.facebook.com/"+response.username+"/picture?width=300&height=400";
      $("#photo").attr("src",photoUrl);
    });
  },{scope: 'publish_actions,email,user_birthday,user_location'});
  changePage('#register');
}



function data_server_team(){

  var control=0;

  loadingOpen("Procesando solicitud");


        if ($('#join').find("input:checked").length==0) { customAlert("Debes seleccionar un equipo al cual inscribirte")
          loadingClose();
          return false;
      };

  $('#join').find("input:checked").each(function(e) {




    var team_name =$(this).attr('team_name');
    var post_values= {
      session_id:localStorage.getItem('session_id'),
      email:localStorage.getItem('email'),
      team_id:$(this).val(),
    };

    
    $.post(server+"teams/suscribe", post_values, function(response) {

      response = jQuery.parseJSON(response);

      if (!(response.error)) {
        localStorage.setItem('team_id',response.team_id);
        localStorage.setItem('name_team',response.name_team);
        customAlert("Te has unido al equipo  "+team_name);
        location.reload();
      }else{

        if (response.error_code==2) {

          customAlert(response.message_error+team_name);

        }else

        {

          customAlert(response.message_error);
          changePage('#my_conv');
        }
      }
    });
    loadingClose();
  });
}


function select_own_team(team){

  console.log("asdasd");
  $(team).parent().find("li").addClass("green").removeClass("red");
  $(team).addClass("red").removeClass("green");
}


function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function enviar_email_pass () {
  if(IsEmail($("#email_recuperar").val())){
    loadingOpen("Cargando");
    post_values={
      email:$("#email_recuperar").val()
    };
    $.post(server+"login/recovery_pass", post_values, function(response) {

      event.preventDefault();
      response = jQuery.parseJSON(response);
      if (!(response.error)) {
        customAlert("Te hemos enviado un email por favor ingresa el código acá");
        $("#olvidarcontrasena input").val("");
        $("#popupCode").popup("open");
      }else{
        customAlert(response.message_error);
      }
      loadingClose();
    });
  }else{
    customAlert("email inválido");
  }
}


function enviar_contrasenas (argument) {

  event.preventDefault();
  if ($("#password_recuperar").val()!=$("#ver_password_recuperar").val()) {
    customAlert("Las contraseñas no coinciden");
    return false;
  };
  loadingOpen("Cargando");
  post_values={
    password:$("#password_recuperar").val(),
    ver_password:$("#ver_password_recuperar").val(),
    code:$("#codigo_ver").val()
  };
  $.post(server+"login/recuperar_contra", post_values, function(response) {

    response = jQuery.parseJSON(response);
    if (!(response.error)) {

      customAlert("Hemos actualizado correctamente tu contraseña");
      
      $("#popupCode input").val("");
      $("#olvidarcontrasena input").val("");
      changePage("#login");

    }else{

      customAlert(response.message_error);

    }

    loadingClose();

  });
}

function zone(teams){

  event.preventDefault();

  if ($("#convocate .your_team .activeButton").size()===0) {
    customAlert("Debes seleccionar uno de tus equipos antes de continuar");
    return  false;
  }else if ($("#convocate .vs_team2 .activeButton").size()===0) {
    customAlert("Debes seleccionar un equipo contrincante antes de continuar");
    return  false;
  }else {
    var post_values= {
      session_id:localStorage.getItem('session_id'),
      email:localStorage.getItem('email'),
      id_team:$("#convocate .your_team .activeButton").parent().find("a:nth-child(2)").attr("theId"),
      vs_team:$("#convocate .vs_team2 .activeButton").parent().find("a:nth-child(2)").attr("theId")
    };
    $.post(server+"teams/validate_team", post_values, function(response) {

      response = jQuery.parseJSON(response);

      if ((response.error)) {

        customAlert(response.message_error);
        return(false);

      }else{

        var myTeam=$("#convocate .your_team .activeButton").parent().find("a:nth-child(2)");
        var vsTeam=$("#convocate .vs_team2 .activeButton").parent().find("a:nth-child(2)");
        $(".two_teams").html(" ");
        $(".two_teams").html('<div style="display:none">aqui</div>'+
          '<ul theId="'+
          $(myTeam).attr("theId")+
          '" data-role="listview" data-inset="true"  data-theme="a">'+
          '<li data-icon="false"><a href="#">'+
          $(myTeam).attr("theName")+
          '</a></li>'+
          '</ul>'+
          '<b>V.S.</b>'+
          '<ul theId="'+
          $(vsTeam).attr("theId")+
          '" data-role="listview" data-inset="true" data-theme="a">'+
          '<li data-icon="false"><a href="#">'+
          $(vsTeam).attr("theName")+
          '</a></li>'+
          '</ul>');
        changePage('#convocate2');
      }
    });
}
}





function vs_team(vs_steam){

  loadingOpen("Cargando");
  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_city:vs_steam.value
  };

  $.post(server+"teams/get_fromcity", post_values, function(response) {

    event.preventDefault();
    response = jQuery.parseJSON(response);

    if (!(response.error)) {

      $(".vs_team2").html(" ");
      $(".vs_team2").append('<label>Equipos Contrarios</label><ul id="lista2" data-role="listview" <data-inset="true" ></ul>');
      for (var i = 0; i < response.length  ; i++) {
        var j=i+1;
        $(".vs_team2 #lista2").append('<li><a onclick="selectTeam(this)" href="#">'+
          response[i].name+
          '</a>'+
          '<a onclick="carryDataInfo(this)" theName="'+response[i].name+'" theId="'+response[i].id+'" theDescription="'+response[i].description+'" href="#infoTeam" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>'+
          '</li>');
      }
      $('#lista2').listview();
    }else{

      customAlert(response.message_error);

    }

    loadingClose();

  });

}
function loadingOpen(legend){

  $.mobile.loading( 'show', {
    text: legend,
    textVisible: true,
    theme: 'a',
    html: ""
  });
}

function loadingClose(){

  $.mobile.loading( 'hide' );

}



function sel_city(departamento) {

  loadingOpen("Cargando ciudades");
  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };
  post_values[departamento.name] = departamento.value;
  $(".ciudad").html('<option value="0">Ciudad</option>');
  $.post(server+"login/select_city", post_values , function(response) {

    response = jQuery.parseJSON(response);
    loadingClose();

    for (var i = 0; i < response.length  ; i++) {
      var j=i+1;
      $(".ciudad").append("<option value="+response[i]["idCiudad"]+">"+response[i]["nombre"]+"</option>");
    }
  });
}




function camera(){
  navigator.camera.getPicture(onSuccessCamera, onFailCamera, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    targetWidth: 300,
    targetHeight: 400,
    correctOrientation: true
  });

  function onSuccessCamera(imageURI) {
    var image = document.getElementById('photo');
    localStorage.setItem("photo_"+localStorage.getItem("id_user"),imageURI);
    image.src = localStorage.getItem("photo_"+localStorage.getItem("id_user"));
    console.log("funciono");
  }
  function onFailCamera(message) {
    console.log('Accion Cancelada');
  }

}



$( document ).on( "pageshow", "#home", function() {

  $(".your_team").html(" ");

  $(".vs_team2").html(" ");

  $("#join .teams_city").html("");

  var heightPhoto=$("#photo_container").height();

  $(".dataUser").css("min-height",heightPhoto+10);

  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };

  $.post(server+"teams/getData", post_values, function(response) {
    response = jQuery.parseJSON(response);
    if (response.points==null )
    {
      response.points=0;
    };


    var homeName=response.first_name.split(" ");
    var lastName=response.last_name.split(" ");

    $("#points2").html(response.points);
    $("#name_user").html(homeName[0]+" "+lastName[0]);
    $("#age_user").html(response.age);

    var image = document.getElementById('photo');
    if (localStorage.getItem("photo_"+localStorage.getItem("id_user"))) {
      image.src = localStorage.getItem("photo_"+localStorage.getItem("id_user"));
    }else if(response.fb_id != "0" && response.fb_id != null){
      image.src ="http://graph.facebook.com/"+response.fb_id+"/picture?width=300&height=400";
    }
    else
    {
      image.src ="http://graph.facebook.com/Golombiao/picture?width=300&height=400";
    }
  });
});


function show_teams () {
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };

  event.preventDefault();

  $.post(server+"teams/verify_team", post_values, function(response) {

    event.preventDefault();

    response = jQuery.parseJSON(response);

    if (!(response.error)) {

      $(".your_team").html(" ");
      $(".your_team").append('<label>Tus Equipos</label><ul id="lista" data-role="listview" data-split-icon="delete"  data-inset="true" ></ul>');
      for (var i = 0; i < response.length  ; i++) {
        var j=i+1;
        $(".your_team #lista").append('<li><a onclick="selectTeam(this)" href="#" data-error="'+response[i].error+'" data-message_error="'+response[i].message_error+'" >'+
          response[i].name+
          '</a>'+
          '<a onclick="carryData(this)" theName="'+response[i].name+'" theId="'+response[i].id+'" theDescription="'+response[i].description+'" href="#deleteTeam" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>'+
          '</li>');
      }
      $('#lista').listview();
    }else{
      customAlert("Debes ser el creador de un equipo para poder convocar a juego");
      changePage('#play');
    }
  });
}


$( document ).on( "pageshow", "#convocate", function() {
  clear_form ("convocate");
  $("#convocate select[name='ciudad']").html("<option value=''>Ciudad</option>");

  show_teams ();

});

function selectTeam(element){

  if (!$(element).data("error")) {

    $(element).parents('ul').find('li').find('a').each(function(key,value){
      $(value).removeClass("activeButton");
    });

    $(element).parents('li').find('a:first-child').addClass("activeButton");
  }else{

    customAlert($(element).data("message_error"));

  }
}


function carryData(element){

  $("#deleteTeam h3").html($(element).attr("theName"));
  $("#deleteTeam p").html($(element).attr("theDescription"));
  $("#deleteTeam a").attr("theId",$(element).attr("theId"));
}

function carryDataInfo(element){ 

  $("#infoTeam h3").html($(element).attr("theName"));
  $("#infoTeam p").html($(element).attr("theDescription"));
  $("#infoTeam a").attr("theId",$(element).attr("theId"));

}
function carryDataSubscription(element){

  $("#deleteSubscription h3").html($(element).attr("theName"));
  $("#deleteSubscription a").attr("theId",$(element).attr("theId"));

}


function deleteTeam(team){

  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){

  }else{

    if(confirm('Al eliminar el equipo, se eliminara todas las convocatorias referentes a este equipo;Esta seguro que desea borrar el equipo?')) 
    {

    }else{ 
      return(false);
    }
  }

  loadingOpen("Procesando");

  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_team:$(team).attr("theId"),
  };

  $.post(server+"teams/deleteTeam", post_values, function(response) {

    response = jQuery.parseJSON(response);

    if (!(response.error)) {

      customAlert("Se ha eliminado el equipo exitosamente");

      changePage('#convocate');

      show_teams ();
      loadingClose();
      


    }else{

      customAlert("ha habido un error procesando tu solicitud");
      loadingClose();
      $.mobile.refresh();
    }
  });
}



function deleteSubscription(team){

  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i))
  {
  }else{

    if(confirm('Esta seguro que desea salirse del equipo?'))
    {
    }else{
      return(false);
    }
  }
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_team:$(team).attr("theId"),
  };

  $.post(server+"teams/deleteSubscription", post_values, function(response) {

    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      load_teams();
      customAlert("Se ha eliminado la subscripcion existosamente");
      changePage('#join');
      $("a[onclick='carryDataSubscription(this)'][theid='"+$(team).attr('theId')+"']").parent().hide();

    }else{

      customAlert("ha habido un error procesando tu solicitud");
    }
  });
}






$( document ).on( "pageshow", "#my_conv", function(event) {
  loadingOpen("Consultando convocatorias");
  event.preventDefault();
  $("#myRequest").html("");
  $("#request").html("");
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    tipo_consulta:0
  };
  var emptyPage=false;
  var check;
  var action;
  $.post(server+"teams/conv_team", post_values, function(response) {

    response = jQuery.parseJSON(response);
    console.log(response);
    if (!(response.error)) {
      $("#title_mi_reto").html('<div class="title_my_conv">Mis convocatorias</div><ul id="myRequest" data-role="listview" data-inset="true" data-split-icon="carat-r"></ul>');
      for (var i = 0; i < response.length  ; i++) {
        var j=i+1;
        if (response[i]["acepta_convocatoria"]==="0") {
          check='checkyellow.png';
          action='reto_my_team'
        }else if (response[i]['acepta_convocatoria']==="1") {
          check='check.png';
          action='reto_my_team';
          if (response[i]['results']==="1")
          {
            check='sun-2.gif';
          }

        }else if (response[i]['acepta_convocatoria']==="2") {
          check='uncheck.png';
          action='';

        }else{
          check='checkorange.png';
          action='';
        }

        $("#myRequest").append('<li  id_equipo1="'+
          response[i]["equipo_1"]+
          '" id_equipo2="'+
          response[i]["equipo_2"]+
          '" principio="'+
          response[i]["principio"]+
          '" id="'+response[i]["id"]+
          '" date="'+response[i]["hora"]+' '+response[i]["fecha"]+
          '" principio="'+response[i]["principio"]+
          '" acepta_convocatoria="'+response[i]["acepta_convocatoria"]+
          '">'+
          '<a href="#" class="'+action+'"><img src="images/'+
          check+
          '" alt="" class="ui-li-icon ui-corner-none"><h3>'+
          response[i]["equipo_1_name"]+
          '  V.s. '+
          response[i]["equipo_2_name"]+
          '</h3></a>'+
          '<a href="#infoConv" onclick="carryDataConv(this)" data-rel="popup" data-position-to="window" data-transition="pop" '+

          '>'+
          '</a></li>');

      }
    }else{
      customAlert("En este momento no has convocado ningun Juego");
      emptyPage=true;
    }

    $("#my_conv [data-role='listview']").listview();

  });

post_values= {
  session_id:localStorage.getItem('session_id'),
  email:localStorage.getItem('email'),
  tipo_consulta:1
};
$.post(server+"teams/conv_team", post_values, function(response) {
  response = jQuery.parseJSON(response);
  console.log(response);
  if (!(response.error)) {
    $("#title_mi_reto2").html('<div class="title_my_conv">Me convocaron</div><ul id="request" data-role="listview" data-inset="true" data-split-icon="carat-r"></ul>');
    for (var i = 0; i < response.length  ; i++) {
      var j=i+1;
      if (response[i]["acepta_convocatoria"]==="0") {
        check='checkyellow.png';
        action='reto_my_team'
      }else if (response[i]['acepta_convocatoria']==="1") {
        check='check.png';
        action='reto_my_team';
        if (response[i]['results']==="1")
        {
          check='sun-2.gif';
        }

      }else if (response[i]['acepta_convocatoria']==="2") {
        check='uncheck.png';
        action='';

      }else{
        check='checkorange.png';
        action='';
      }

      $("#request").append('<li  id_equipo1="'+
        response[i]["equipo_2"]+
        '" id_equipo2="'+
        response[i]["equipo_1"]+
        '" principio="'+
        response[i]["principio"]+
        '" id="'+response[i]["id"]+
        '" date="'+response[i]["hora"]+' '+response[i]["fecha"]+
        '" principio="'+response[i]["principio"]+
        '" acepta_convocatoria="'+response[i]["acepta_convocatoria"]+
        '">'+
        '<a href="#" class="'+action+'"><img src="images/'+
        check+
        '" alt="" class="ui-li-icon ui-corner-none"><h3>'+
        response[i]["equipo_1_name"]+
        '  V.s. '+
        response[i]["equipo_2_name"]+
        '</h3></a>'+
        '<a href="#infoConv" onclick="carryDataConv(this)" data-rel="popup" data-position-to="window" data-transition="pop" '+

        '>'+
        '</a></li>');
    }
  }else{
    customAlert("En este momento no te han convocado a ningun Juego");
    if (emptyPage){
      changePage("#pre_conv");
      location.reload();
    }
  }
  $("#my_conv [data-role='listview']").listview();
});
loadingClose();
});


function carryDataConv(element){
  var elmt=element;
  var accept;
  var image=$(element).parent().find("img").attr("src");
  if (image=="images/check.png") {
    accept="Convocatoria aceptada";
    $(".acceptConv").hide();
  }else if (image=="images/checkyellow.png") {

    accept="Convocatoria aun no aceptada";

    if ($(elmt).parent().parent().attr('id')=="request")
    {
      $(".acceptConv").show();
    }else{

      $(".acceptConv").hide();
    }

  }else if (image=="images/sun-2.gif") {
    accept="Convocatoria calificada";
    $(".acceptConv").hide();
    
  }else if (image=="images/uncheck.png") {
    accept="Convocatoria rechazada";
    $(".acceptConv").hide();

  }else if (image=="images/checkorange.png") {
    accept="Convocatoria vencida no aceptada";
    $(".acceptConv").hide();
    
  };

  $("#infoConv h3").html($(element).parent().find("h3").html());
  $("#infoConv h4").html("fecha: "+$(element).parent().attr('date'));
  $("#infoConv p").html(accept);
  $("#infoConv .acceptConv").attr("id",$(element).parent().attr('id'));

}

function stringToHex (s) {
  var r = "0x";
  var hexes = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
  for (var i=0; i<s.length; i++) {r += hexes [s.charCodeAt(i) >> 4] + hexes [s.charCodeAt(i) & 0xf];}
  return r;
}



//login
$( document ).on( "pageshow", "#login", function() {

  $( "#form_login" ).validate({

    rules:{
      email:{
        required:true,
        email:true
      },
      encrypted_password: "required",
    },



    submitHandler: function( form ) {
      loadingOpen("Verificando");
      var post_values={};


      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(privateKey);

      $(':input', "#form_login").each(function(index, input_element) {

        post_values[input_element.name] =$(input_element).val();
      });
      console.log(CryptoJS.SHA256(post_values.encrypted_password).toString(CryptoJS.enc.Base64));
      post_values.encrypted_password=encrypt.encrypt(CryptoJS.SHA256(post_values.encrypted_password).toString(CryptoJS.enc.Base64));
      post_values.email= encrypt.encrypt(post_values.email);


      $.post(server+"login", post_values, function(response) {

        response = jQuery.parseJSON(response);

        if (!(response.error)) {

          localStorage.setItem('session_id',response.session_id);
          localStorage.setItem('email',response.email);
          localStorage.setItem('id_user',response.user_id);
          var first_name=response.first_name.split(" ");
          var last_name=response.last_name.split(" ");
          $("#name_user").html(first_name[0] +' '+ last_name[0]);
          $("#age_user").html(response.age);
          $("#location_user").html(response.city);
          changePage('#home');
        }else{
          customAlert(response.message_error);
        }
        loadingClose();
      });
    }
  });
});


function level_function(select){

  if($(select).val()==1){
    $("#identf2").show();
  }else{
    $("#identf2").hide();
  }
}


function load_map (position) {
  var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  map  = new google.maps.Map(document.getElementById('geoLocation2'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLocation,
    zoom: 4
  });
}

$( document ).on( "pageshow", "#mapa", function() {

  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };

  $.post(server+"teams/maps_convocatoria", post_values, function(response) {
    response = jQuery.parseJSON(response);
    var colombialatlng = new google.maps.LatLng( 4.127285,-73.696289);
    colombia  = new google.maps.Map(document.getElementById('colombia'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: colombialatlng,
      zoom: 5
    });
    for (var i = response.length - 1; i >= 0; i--) {
      if (response[i].longitud!==0) {
        var latlng= new google.maps.LatLng(response[i].latitud, response[i].longitud);
        console.log(response[i]);
        icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        if(response[i].played==1){
          icon='http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }
        new google.maps.Marker({
         position: latlng,
         map: colombia,
         icon: icon
       });
      }
    }
  });
});

$( document ).on( "pageshow", "#register", function() {
 $( "#form_register" ).validate({
  rules:{
    first_name:{
      required: true
    },
    last_name:{
      required: true
    },
    gender:{
      required: true
    },

    departamento:{
      required: true
    },
    city:{
      required: true
    },
    study:{
      required: true
    },
    email:{
      required: true
    },

    age: {
      required: true,
      number: true
    },
    aceptTerms: {
      required: true
    },
    encrypted_password: {
      required: true,
      minlength: 10
    },
    re_password: {
      equalTo: "#encrypted_password"
    }
  },
  submitHandler: function( form ) {
    loadingOpen("Registrando");
          var encrypt = new JSEncrypt();
      encrypt.setPublicKey(privateKey);
    var post_values= {};
    $(':input', "#form_register").each(function(index, input_element) {
      
      if (input_element.name=="encrypted_password") {
        post_values[input_element.name] = $(input_element).val();

      }else{
        post_values[input_element.name] =encrypt.encrypt($(input_element).val());
      }
      

    });
    post_values.encrypted_password=encrypt.encrypt(CryptoJS.SHA256(post_values.encrypted_password).toString(CryptoJS.enc.Base64));

    

    $.post(server+"login/newuser", post_values, function(response) {
      response = jQuery.parseJSON(response);
      if (!(response.error)) {
        localStorage.setItem('id_user',response.id_user);
        $("#name_user").html(post_values.first_name+" "+post_values.last_name);
        $("#age_user").html(post_values.birthday);
        $("#location_user").html(post_values.city);
        city=post_values.city;
        loadingClose();
        changePage('#login');
        customAlert("Usuario creado exitosamente");
        cleanforms();
      }else{
        customAlert(response.message_error);
        loadingClose();
      }
    });
  }
});
});


var marker;

function placeMarker(location) {

  if ( marker ) {
    marker.setPosition(location);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: geolocation
    });
  }

  var pos=marker.getPosition();
  console.log(pos);
  geolocation.setCenter(pos);
  $("#latitud").val(marker.getPosition().lat());
  $("#longitud").val(marker.getPosition().lng());
}

function load_map_loc (position) {

  var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  geolocation  = new google.maps.Map(document.getElementById('geolocation'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLocation,
    zoom: 18
  });
  google.maps.event.addListener(geolocation,'click',function  (event) {

    placeMarker(event.latLng);
  });
}

function load_map (err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
  if(err.code==1){
    customAlert("por favor habilita tu geolocalización");
  }
  var myLocation = new google.maps.LatLng(4.127285,-73.696289);
  geolocation  = new google.maps.Map(document.getElementById('geolocation'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLocation,
    zoom:4
  });

  google.maps.event.addListener(geolocation,'click',function  (event) {
    placeMarker(event.latLng);
  });
}




$( document ).on( "pageshow", "#convocate2", function() {

  navigator.geolocation.getCurrentPosition(load_map_loc, load_map,{maximumAge:60000, timeout:10000, enableHighAccuracy:true});
  $("#dateConvocate").mobiscroll().date();
  $("#timeConvocate").mobiscroll().time();
  $('#dateConvocate').mobiscroll('option', { lang: 'es',animate:'flip',dateFormat:'yy-mm-dd'});
  $('#timeConvocate').mobiscroll('option', { lang: 'es',animate:'flip' });

  $( "#form_convocate2" ).validate({
    rules:{
      fecha:{
        required:true,
      },
      hora:{
        required:true
      },
      tipo_juego:{
        required:true
      },
      principio:{
        required:true
      }
    },
    submitHandler: function( form ) {

      var longi=$('#latitud').val();
      var lati=$('#longitud').val();

      if (longi!==""&&lati!=="") {

        loadingOpen("Solicitando encuentro");

        var post_values={
          session_id:localStorage.getItem('session_id'),
          email:localStorage.getItem('email'),
          equipo_1:$($("#convocate2 .container ul")[0]).attr("theId"),
          equipo_2:$($("#convocate2 .container ul")[1]).attr("theId"),
        };

        $(':input', "#convocate2").each(function(index, input_element) {
          post_values[input_element.name] = $(input_element).val();
        });

        $.post(server+"teams/guardar_convocatoria", post_values, function(response) {

          response = jQuery.parseJSON(response);

          if (!(response.error)) {

            customAlert("se ha enviado una solicitud al lider del otro equipo");
            changePage('#my_conv');

          }else{

            customAlert(response.message_error);

          }

          loadingClose();
        });
      }else{
        customAlert("Selecciona en el mapa la ubicación del partido");
      }
    }
  });
$(".two_teams ul").listview()
});



$( document ).on( "pageshow", "#create", function() {
  clear_form("create");
  $( "#form_create" ).validate({
    rules:{
      ciudad:{
        required:true
      },
      name:{
        required:true,
      },
      departamento:{
        required:true
      },


      descripcion:{
        required:true
      },
      zone_team:{
        required:true
      },

    },

    submitHandler: function( form ) {
      var post_values= {
        session_id:localStorage.getItem('session_id'),
        email:localStorage.getItem('email')
      };
      $(':input', "#form_create").each(function(index, input_element) {
       post_values[input_element.name] = $(input_element).val();

     });
      $.post(server+"teams/new_team", post_values, function(response) {


        response = jQuery.parseJSON(response);
        if (!(response.error)) {
          localStorage.setItem('team_id',response.team_id);
          localStorage.setItem('name_team',response.name_team);

          customAlert("El equipo se creó exitosamente");
          changePage('#convocate');

        }else{
          customAlert(response.message_error);

          changePage('#play');
        }
      });
    }

  });
});



function load_teams () {
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
  };

  $.post(server+"teams/myTeams", post_values, function(response) {



    response = jQuery.parseJSON(response);

    if (!(response.error)) {
      $(".miJoinTeams").html(" ");
      
      
      $(".miJoinTeams").append('<label>Tus Equipos</label><ul id="listaJoin" data-role="listview" data-split-icon="gear"  data-inset="true" ></ul>');
      for (var i = 0; i < response.length  ; i++) {
        var j=i+1;
        $(".miJoinTeams #listaJoin").append('<li><a onclick="selectTeam(this)" href="#">'+
          response[i]['name_team']+
          '</a>'+
          '<a onclick="carryDataSubscription(this)" theName="'+response[i]['name_team']+'" theId="'+response[i]['id']+'" theDescription="'+response[i]['description']+'" href="#deleteSubscription" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>'+
          '</li>');
      }
      $('#listaJoin').listview();
    }else{

      customAlert("No estas suscrito a ningun equipo");
    }



  });
}






function verifyTeamCity(element){
  loadingOpen("Cargando equipos");
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_city:element.value
  };

  $.post(server+"teams/get_fromcity", post_values, function(response) {
    $("#join .teams_city").html("");
    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      if(response.length===0) {
        customAlert("no hay equipos para esta ciudad o municipio");
      }else{
        for (var i = response.length - 1; i >= 0; i--) {
          var team_div='<div data-role="collapsible team_'+response[i].id+'" team_id="'+response[i].id+'">'+
          '<h3>'+response[i].name+'</h3>'+
          '<div data-role="fieldcontain" class="join_checkbox" >'+
          '<fieldset data-role="controlgroup">'+
          '<input data-mini="true"  type="checkbox" name="join_to_team" id="checkbox" class="custom" value="'+response[i].id+'" team_name="'+response[i].name+'"/>'+
          '<label for="checkbox">Unirse</label>'+
          '</fieldset>'+
          '</div>'+
          '<p>'+
          '<div class="colapse jugadores_'+response[i].id+'"  data-role="collapsible" data-theme="a" data-content-theme="d" data-inset="false">'+
          '<h3>Jugadores</h3>'+
          '<ul data-role="listview">'+
          '</ul>'+
          '</div>';
          $("#join .teams_city").append(team_div);
        }

        $('#join').find('div[data-role=collapsible]').collapsible();
        $('#join').find("input[type='checkbox']").checkboxradio();
        $('#join').find(".colapse").one('collapsibleexpand', function () {
          loadingOpen("Cargando Jugadores");
          var myClass=$(this).attr("class");
          myClass=myClass.split(" ");
          var id=myClass[1].split("_");
          var post_values= {
            session_id:localStorage.getItem('session_id'),
            email:localStorage.getItem('email'),
            team_id:id[1],
          };

          $.post(server+"teams/get_players", post_values, function(response) {

            response = jQuery.parseJSON(response);

            for (var i = 0; i <response.length  ; i++) {
              $("."+myClass[1]).find("ul[data-role=listview]").append("<li class='userData'myId='"+response[i]['id_user']+"'>"+response[i]['name_user']+"</li>"); 
            }
            $('#join').find("."+myClass[1]).find("ul[data-role=listview]").listview();
          }); 

          loadingClose();

        });
      }
    }else{
      customAlert(response.message_error);
    }
  });
loadingClose();
}




$( document ).on( "pageshow", "#join", function() {
  $(".miJoinTeams").html(" ");
  $(".teams_city").html(" ");
  clear_form("join");
  $("#join_select_departament").val($("#join_select_departament option:first").val());
  

  load_teams();

  $( "#form_create" ).validate({
   rules:{
    name_team:{
      required:true,
    },
    departamento:{
      required:true
    },
    city:{
      required:true
    }
  },

  submitHandler: function( form ) {
    var post_values= {
      session_id:localStorage.getItem('session_id'),
      email:localStorage.getItem('email')
    };

    $(':input', "#form_create").each(function(index, input_element) {
     post_values[input_element.name] = $(input_element).val();
   });

    $.post(server+"teams/new_team", post_values, function(response) {


      response = jQuery.parseJSON(response);
      if (!(response.error)) {
        localStorage.setItem('team_id',response.team_id);
        localStorage.setItem('name_team',response.name_team);

        customAlert("El equipo se creo exitosamente");

        changePage('#convocate');

      }else{
        customAlert(response.message_error);
      }
    });
  }
});
});



google.maps.event.addDomListener(window, 'load', setup);

function onError(e){
  console.log(e);

}

function setup() {
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  function onError (e) {
    console.log(e);
  }
}

function onSuccess(position) {

  var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  map  = new google.maps.Map(document.getElementById('geoLocation'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLocation,
    zoom: 15
  });

  var request = { location: myLocation, radius: currentRadiusValue, types: [currentPlaceType] };
  infowindow  = new google.maps.InfoWindow();

}



google.maps.event.addDomListener(window, 'load', setup2);

function setup2() {
  document.addEventListener("deviceready", onDeviceReady2, false);

  function onDeviceReady2() {
    navigator.geolocation.getCurrentPosition(onSuccess2, onError2);
  }

  function onError2 (e) {
    console.log(e);
  }
}

function onSuccess2(position) {

  var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  map  = new google.maps.Map(document.getElementById('geoLocation2'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLocation,
    zoom: 15
  });
  var request = { location: myLocation, radius: currentRadiusValue, types: [currentPlaceType] };
  infowindow  = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


function get_galery_photo() {
  console.log("enter onDeviceReady");

  navigator.camera.getPicture(confirmPhoto,function(message){customAlert('Se ha cancelado la subida')},{
      quality: 100,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1200,
      targetHeight: 1600,
      correctOrientation: true
    }
  );
  console.log("end onDeviceReady");
}

function confirmPhoto(imageURI){
  customConfirm("Desea subir esta foto?, una ves echo esto, no se podra deshacer",4,imageURI);
}

function uploadPhoto(imageURI) {
  loadingOpen("Subiendo Imagen")
  console.log("enter uploadPhoto");
  var options = new FileUploadOptions();
  options.fileKey="userfile";
  if(navigator.userAgent.match(/OS/i)){
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
  }
  options.mimeType="image/jpg";
  console.log("defined image");

  var params = new Object();
  params.value1 = "test";
  params.value2 = "param";
  console.log("defined param");

  options.params = params;

  console.log("object ready");
  var ft = new FileTransfer();

  ft.upload(imageURI, encodeURI(server+"upload/do_upload"), win, fail, options);
  console.log("image sended");
}

function win(r) {
  console.log("Code = " + r.responseCode);
  console.log("Response = " + r.response);
  console.log("Sent = " + r.bytesSent);
  response=r.response;
  response = jQuery.parseJSON(response);
  console.log(response);
  localStorage.setItem('id_image',response.id_image);
  $.mobile.changePage('#description_image', 'pop', true, true);
  loadingClose();
}

function fail(error) {
  customAlert("Ha ocurrido un error: Code = " + error.code);
  loadingClose();
}

function add_description () {
  var description=$('#description_text').val();
  if (description==="") {
    customAlert("Por favor describe la imagen");
  }else{

    var post_values={
      session_id:localStorage.getItem('session_id'),
      email:localStorage.getItem('email'),
      description: description,
      image_id:localStorage.getItem('id_image')
    };

    $.post(server+"upload/add_description", post_values , function(response) {
      response = jQuery.parseJSON(response);
      console.log(response);
    });

    $('#description_image').dialog('close');
  }

}

function changePage(page){

  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){



    $.mobile.changePage(page);
  }else{
     window.location.href = page;
  }
}

function customAlert(message)
{
  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){
    
    navigator.notification.vibrate(1000);

    function alertDismissed() {
    }

    navigator.notification.alert(message,
      alertDismissed,
      'Alerta Golombiao',
      'Cerrar'
      );

  }else{

    alert(message);
  }
}


function customConfirm(message,tmp,team)

{  

  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){

    navigator.notification.confirm(message,

      onConfirm,
      'Confirmar Accion',
      'Aceptar,Cancelar'
      );

    function onConfirm(button) {
      if (button==1) {
        switch (tmp)
        {
          case 1:
          closeSession();
          break
          case 2:
          deleteTeam(team);
          break
          case 3:
          deleteSubscription(team);
          break
          case 4:
          uploadPhoto(team);
          break
          case 5:
          get_galery_photo();
          break
        }
      }
    }
  }else{
    switch (tmp)
    {
      case 1:
      closeSession();
      break
      case 2:
      deleteTeam(team);
      break
      case 3:
      deleteSubscription(team);
      break
      case 4:
      uploadPhoto(team);
      break
      case 5:
      get_galery_photo();
      break
    }
  }
}