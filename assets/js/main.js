var viewCharacter = function(){
$('.char-type').on('click',function(){
  $('.floating-detail').addClass('open');
  var dataUrl = $(this).attr('data-url');
  var dataName = $(this).attr('char-img barbarian');
  $('.char-type').removeClass('current');
  $(this).addClass('current');
  $('.pick-instruct').addClass('hide-arrow');
  $.ajax({
        type: "GET",
        url:dataUrl,
        beforeSend: function() {
            loader.show();
          },
        complete: function (response) {
            console.log(response.responseJSON);
            var hitDie = (response.responseJSON.hit_die / 12)*100;
            $('#char-name').html(response.responseJSON.name);

            $('#hit-die .inner').css({
              width: hitDie+'%'
            });


            var proficienciesData = [];
			proficienciesData = response.responseJSON.proficiencies;

			var proficienciesList=" ";
            $.each(proficienciesData, function( index, armor ) {
				   proficienciesList+="<li>" + armor.name + "</li>";
			});
            $('#proficiencies').html(proficienciesList);
            
            $('#item-logo').attr({
            	class : response.responseJSON.name.toLowerCase()	
            });
            loader.hide();
        }
    });
    return false;
});
}

$('.close-detail').click(function() {
$('.floating-detail').removeClass('open');
$('.char-type').removeClass('current');
});

var loader = $('#loader');
$(window).load(function () {
setTimeout(function(){
    var displayResources = $('#character-list');
     $.ajax({
            type: "GET",
            url: "http://www.dnd5eapi.co/api/classes/",
            beforeSend: function() {
              loader.show();
            },
            success: function(result) {
                var output="<div class='row'>";
                $.each(result.results, function(key, val) {
                  output+="<div class='col-md-4 col-sm-3 col-xs-6'> <div class='centerAlign char-type' data-url='" + val.url + "'><span class='char-img "+ val.name.toLowerCase() +"'></span><h4 class='character-name'>" + val.name + "</h4></div></div>";
                });
                displayResources.html(output);
                loader.hide();
                $('.main-wrapper').removeClass('transparent');
           },
           complete: function(){
              viewCharacter();
           }
         });
}, 2000);
});
