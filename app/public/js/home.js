$.get("/api/friends", function(res) {
    for(var i = 0; i < 6; i++) {
       
       var newImg = $("<img>");
       newImg.attr("src", res[i].photo);
       newImg.addClass("home-img");
       newImg.css("width", "300px");
       $("#photos-row-1").append(newImg); 
    }
});