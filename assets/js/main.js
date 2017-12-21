var viewCharacter = function(){
$('.set-url .btn').on('click',function(){
  $('.floating-detail').addClass('open');
  var dataUrl = $(this).attr('data-url');
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


            loader.hide();
        }
    });
    return false;
});
}

$('.close-detail').click(function() {
$('.floating-detail').removeClass('open');
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
                  output+="<div class='col-md-3 col-sm-3 col-xs-6 centerAlign char-type'><h4 class='character-name'>" + val.name + "</h4><div class='set-url'><span class='btn btn-default' data-url='" + val.url + "'>View Character</span></div></div>";
                });
                displayResources.html(output);
                loader.hide();
           },
           complete: function(){
              viewCharacter();
           }
         });
}, 2000);
});
