$(document).ready(function() {

mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;

function resize() {
	if ($(".photo1").height()>0) $(".bloc5bg").css('height',$(".photo1").height());
}

resize();

setTimeout(function(){ resize() }, 1500);

$( window ).resize(function() { resize(); });

$(".fancybox").fancybox({maxWidth:"680px",maxHeight:"680px"});

$("img").mousedown(function(e){
    e.preventDefault();
});

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});

slide=1;

function slideSwitch(direction) {

  if (direction=="left") { pos1 = "200%"; pos2 = "-200%"; nextslide=slide-1; }
  if (direction=="right") { pos1 = "-200%"; pos2 = "200%"; nextslide=slide+1; }
  if (nextslide<=0) nextslide=10;
  if (nextslide>10) nextslide=1;
  $('.photo'+slide).css({zIndex:1}).animate({left:pos1});

  $('.photo'+nextslide).css({left:pos2,zIndex:2}).animate({left:"50%"},400, function() {
  	$('.legende'+slide).hide(1);
  	$('.legende'+nextslide).show(1);
    slide=nextslide;
  });

}

var countdown;

$('.arrowleft').click(function() {
  slideSwitch("left");
  $(".arrowleft,.arrowright").css({'opacity':1});
  clearTimeout(countdown);
});
$('.arrowright').click(function() {
	resize();
  slideSwitch("right");
  $(".arrowleft,.arrowright").css({'opacity':1});
  clearTimeout(countdown);
});

//$('.arrowleft,.arrowright').animate({'opacity':0});

$("html").mousemove(function() {
	$(".arrowleft,.arrowright").css({'opacity':1});
	clearTimeout(countdown);
	countdown = setTimeout(function() {
		$('.arrowleft,.arrowright').animate({'opacity':0});
	}, 3000);
});


$(".jenvoiemacarte").click(function() {
	$(".etape0").hide();
	$(".etape1").show();
	if ($(window).width()<600) $(".carte1").click();
	ga('send', 'pageview', "/carte-de-voeux-etape1");
	location.href="#carte-de-voeux-etape1";
});

$(".carte").click(function() {
	$("#carte").val($(this).attr('carte'));
	$(".carte").removeClass("carte_active");
	$(this).addClass("carte_active");
});

carte=1;

function carteSwitch(direction) {

  if (direction=="left") { pos1 = "280px"; pos2 = "-280px"; nextcarte=carte-1; }
  if (direction=="right") { pos1 = "-280px"; pos2 = "280px"; nextcarte=carte+1; }
  if (nextcarte<=0) nextcarte=3;
  if (nextcarte>3) nextcarte=1;
  $('.carte'+carte).css({zIndex:1}).animate({left:pos1});
  $('.carte'+nextcarte).click();
  $('.carte'+nextcarte).css({left:pos2,zIndex:2}).animate({left:"0px"},400, function() {
    carte=nextcarte;
  });

}

$(".mobile_arrowleft").click(function() {
	carteSwitch("left");
});

$(".mobile_arrowright").click(function() {
	carteSwitch("right");
});

$(".etape1 .btblanc").click(function() {
	if ($(".carte").hasClass("carte_active")) {
		$(".etape1").hide();
		$(".etape2").show();
		$(".carteetape2 img,.carteoblique img").attr({'src':'i/carte'+$(".carte_active").attr('carte')+".jpg"});
		ga('send', 'pageview', "/carte-de-voeux-etape2");
		location.href="#carte-de-voeux-etape2";
		$("#message").val('Tous mes vœux pour toi,\r\nma maman préférée ');
		updateCharsLeft();
	} else {
		$(".etape1 .err").html("Veuillez choisir une carte.");
	}
});


function updateCharsLeft() {
	if (mac) {
		var restant = 350-$("#message").val().replace(/\r(?!\n)|\n(?!\r)/g, "\r\n").length;
	} else {
		var restant = 350-$("#message").val().length;
	}
	$("#cararestants").html(restant);
	if (restant<2) {
		$(".s").hide();
	} else {
		$(".s").show();
	}
	if (restant<=10) {
		$(".cararestantswrap").addClass("cararestantswrap_red");
	} else {
		$(".cararestantswrap").removeClass("cararestantswrap_red");
	}
}
updateCharsLeft();
$("#message").keyup(function() {
	updateCharsLeft();
});

$(".etape2 .btblanc").click(function() {
	var Aerr = [];
	var errmsg = "Veuillez completer les champs obligatoires.";
	$(".text").removeClass("inputerr");
	if ($("#message").val().length==0) Aerr.push("message");
	if ($("#dest_civilite").val().length==0) Aerr.push("dest_civilite");
	if ($("#dest_nom").val().length==0) Aerr.push("dest_nom");
	if ($("#dest_prenom").val().length==0) Aerr.push("dest_prenom");
	if ($("#dest_adresse").val().length==0) Aerr.push("dest_adresse");
	if ($("#dest_codepostal").val().length==0) Aerr.push("dest_codepostal");
	if ($("#dest_codepostal").val().length>=1 && !validCP($("#dest_codepostal").val())) { Aerr.push("dest_codepostal"); errmsg="Code postal invalide"; }
	if ($("#dest_ville").val().length==0) Aerr.push("dest_ville");
	if ($("#dest_ville").val().length>=1 && !validVille($("#dest_ville").val())) { Aerr.push("dest_ville"); errmsg="Ville invalide"; }

	if (Aerr.length==0) {
		$(".etape2").hide();
		$(".etape3").show();
		ga('send', 'pageview', "/carte-de-voeux-etape3");
		location.href="#carte-de-voeux-etape3";
	} else {
		Aerr.forEach(function(e) {
			$("#"+e).addClass("inputerr");
		});
		$(".etape2 .err").html(errmsg);
	}
});

$(".etape3 .btblanc").click(function() {
	var Aerr = [];
	var errmsg = "Veuillez completer les champs obligatoires.";
	$(".text").removeClass("inputerr");
	if ($("#civilite").val().length==0) Aerr.push("civilite");
	if ($("#email").val().length==0) Aerr.push("email");
	if ($("#email").val().length>=1 && !validEmail($("#email").val())) { Aerr.push("email"); errmsg="Email invalide"; }
	if ($("#nom").val().length==0) Aerr.push("nom");
	if ($("#prenom").val().length==0) Aerr.push("prenom");
	if ($("#adresse").val().length==0) Aerr.push("adresse");
	if ($("#codepostal").val().length==0) Aerr.push("codepostal");
	if ($("#codepostal").val().length>=1 && !validCP($("#codepostal").val())) { Aerr.push("codepostal"); errmsg="Code postal invalide"; }
	if ($("#ville").val().length==0) Aerr.push("ville");
	if ($("#ville").val().length>=1 && !validVille($("#ville").val())) { Aerr.push("ville"); errmsg="Ville invalide"; }

	if (Aerr.length==0) {
		var values = $("#formdonsolidaire").serialize();
		$.post("add_carte.php",values,function(data) {
			idCarte=data;
		});
		$(".etape3").hide();
		$(".etape4").show();
		ga('send', 'pageview', "/carte-de-voeux-etape4");
		location.href="#carte-de-voeux";
	} else {
		Aerr.forEach(function(e) {
			$("#"+e).addClass("inputerr");
		});
		$(".etape3 .err").html(errmsg);
	}
});

$(".etape4 .btblanc").click(function() {
	civility="";
	if ($("#civilite").val()=='M.') civility = 1;
	if ($("#civilite").val()=='Mme') civility = 2;
	if ($("#civilite").val()=='Mlle') civility = 3;
	//ga('send', 'pageview', "/?utm_source=LP5_CTA_donCdV&utm_medium=LP5&utm_campaign=AEAFIN2016");
	location.href="https://soutenir.aide-et-action.org/b?cid=112&civility="+civility+"&firstname="+(capitalizeFirstLetter($("#prenom").val()))+"&lastname="+encodeURI(capitalizeFirstLetter($("#nom").val()))+"&email="+encodeURI($("#email").val())+"&address1="+encodeURI($("#adresse").val())+"&address2="+encodeURI($("#adresse2").val())+"&postcode="+encodeURI($("#codepostal").val())+"&city="+encodeURI($("#ville").val())+"&reserved_carte="+idCarte+"&utm_source=LP2_D&utm_medium=LP2&utm_campaign=AEAFIN2016";
});


$(".btnavmob").click(function() {
	if ($(".nav").is(":visible")) {
	$(".nav").hide();
	} else {
	$(".nav").show();
	}
});

if ($(window).width()<600) {
	$(".cararestantswrapmobile").html("<div class='cararestantswrap'>"+$(".cararestantswrap").html()+"</div>");
} else {

}

$(document).on('blur', "input[type=text]", function () {
	if (this.id!="email")
    $(this).val(function (_, val) {
        return val.toUpperCase();
    });
});




function locationHashChanged() {
if (window.location.hash=='#carte-de-voeux-etape1') { 
	$(".etape,.etape0").hide();
	$(".etape1").show();
}
if (window.location.hash=='#carte-de-voeux-etape2') { 
	$(".etape,.etape0").hide();
	$(".etape2").show();
}
if (window.location.hash=='#carte-de-voeux-etape3') { 
	$(".etape,.etape0").hide();
	$(".etape3").show();
}
if (window.location.hash=='#carte-de-voeux-etape4') { 
	$(".etape,.etape0").hide();
	$(".etape4").show();
}
}

window.onhashchange = locationHashChanged;

/*
if ("onhashchange" in window) $(window).on('hashchange',hashChange).trigger('hashchange');

function hashchange() {
alert('test');
}*/


});

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function validEmail(v) {
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}

function validCP(v) {
	if (v.length<5 || v.length>5) { return false; }
    var r = new RegExp("^[0-9]+$");
    return (v.match(r) == null) ? false : true;
}

function validVille(v) {
    var r = new RegExp("^([^0-9]*)$");
    return (v.match(r) != null) ? true : false;
}