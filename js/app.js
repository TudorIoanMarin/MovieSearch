$(document).ready(function(){

   //This is to remove the validation message if no poster image is present
   $('#term').focus(function(){
      var full = $("#poster").has("img").length ? true : false;
      if(full == false){
         $('#poster').empty();
      }
   });

    //function definition
   var getPoster = function(){

       var film = $('#term').val();

       if(film == ''){
         $('#poster').html("<h2 class='loading'>Hello, when you focus the input I will dissapear!</h2>");
       } else {
              $('#poster').html("<h2 class='loading'>Your movies are on their way!</h2>");

              $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=306e0b6bf0e789ac36dff58289a243e9&query=" + film, function(json) {


                             if(json.hasOwnProperty("results")){
                                 var inHTML ="";
                                 console.log(json.results);
                                $.each(json.results, function(i,movie){
                                      if(movie.poster_path != null) {
                                          var poster = "https://image.tmdb.org/t/p/w"+ 500 + movie.poster_path;
                                          //Display the poster and a message announcing the result
                                          var newItem = "<li class=\"col-xs-12 col-md-6 col-lg-3\" id=\"picture-"+ i +"\">";
                                          newItem += "<div class=\"panel panel-default\">";
                                          newItem += "<div class=\"panel-image\">";
                                          newItem += "<img class=\"img-responsive\" id=\"poster\" src=\"" + poster + "\"/>";
                                          newItem += "</div>";
                                          newItem += "<div class=\"panel-body\">";
                                          newItem += "<h4>" + movie.original_title + "</h4>";
                                          newItem += "<p class=\"overview\">" + movie.overview + "</p>";
                                          newItem += "</div>";
                                          newItem += "<div class=\"panel-footer text-center\">";
                                          newItem += "<a href=\"#download\"><span class=\"glyphicon glyphicon-download\"></span></a>";
                                          newItem += "<a href=\"#facebook\"><span class=\"fa fa-facebook\"></span></a>";
                                          newItem += "<a href=\"#twitter\"><span class=\"fa fa-twitter\"></span></a>";
                                          newItem += "<a href=\"#share\"><span class=\"glyphicon glyphicon-share-alt\"></span></a>";
                                          newItem += "</div></div></li>";
                                          inHTML += newItem;
                                          console.log(i);
                                      }
                                   });

                                  $("#gallery").html(inHTML);
                                  $('#gallery').bsPhotoGallery({
                                    "classes" : "col-lg-3 col-md-6 col-xs-12",
                                    "hasModal" : false
                                  });
                                  $(".overview").shorten({
                                    "showChars" : 100,
                                    "moreText"	: "See More",
                                    "lessText"	: "Less",
                                  });
                            }
                });

            }
    }


      $('#search').click(getPoster);
      $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getPoster();
       }
      });


});//-->document end
