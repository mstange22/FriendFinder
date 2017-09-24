var userInfo;

// Form validation
function validateForm() {

    if($("#name").val() === "" || $("#photo").val() === "") {
        return false;
    }

    return true;
}

// Capture the form inputs 
$("#submit").on("click", function () {

    // If all required fields are filled
    if (validateForm()) {

        buildUserInfo();

        // post user's info and get best match
        $.post("/api/friends", userInfo, function (result) {

            // populate results modal elements
            $("#match-name").text(result.name);
            $("#match-img").attr("src", result.photo);
            $("#match-var").text(((((40 - result.varFromUser) / 40))*100) + "% Match");
        });

        if ($("#male").prop("checked") === false && $("#female").prop("checked") === false ) {
    
            $("#gender-alert-modal").modal("toggle");
        }

        else {    
                $("#results-modal").modal("toggle");
        }

        clearForm();
    }

    else {

        // show alert modal
        $("#field-alert-modal").modal("toggle");
    }
});

$("#gender-alert-modal").on("hidden.bs.modal", function() {

    $("#results-modal").modal("toggle");
    clearForm();
})

// Create an object for the user's data
function buildUserInfo() {

    userInfo = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        gender: $("input[name=gender]:checked").val(),
        scores: [$("input[name=q1]:checked").val(), $("input[name=q2]:checked").val(),
        $("input[name=q3]:checked").val(), $("input[name=q4]:checked").val(),
        $("input[name=q5]:checked").val(), $("input[name=q6]:checked").val(),
        $("input[name=q7]:checked").val(), $("input[name=q8]:checked").val(),
        $("input[name=q9]:checked").val(), $("input[name=q10]:checked").val()],
        varFromUser: 0
    }
}

// clear input fields and reset radio buttons
function clearForm() {

    $("#name").val("");
    $("#photo").val("");
    $("#male").prop("checked", false);
    $("#female").prop("checked", false);
    $("#q1-3").prop("checked", true);
    $("#q2-3").prop("checked", true);
    $("#q3-3").prop("checked", true);
    $("#q4-3").prop("checked", true);
    $("#q5-3").prop("checked", true);
    $("#q6-3").prop("checked", true);
    $("#q7-3").prop("checked", true);
    $("#q8-3").prop("checked", true);
    $("#q9-3").prop("checked", true);
    $("#q10-3").prop("checked", true);
}