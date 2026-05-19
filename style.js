function updateClock() {
        const now = new Date();
        document.getElementById('clock').innerText =
            `Current date and time: ${now.toLocaleString()}`;
    }

    updateClock();
    setInterval(updateClock, 1000);





var registeredUsers = [];
var totalCount = 0;

function toggleTeamFields() {
    var type = document.getElementById("partType").value;
    var teamFieldsDiv = document.getElementById("teamFields");
    if (teamFieldsDiv) {
        if (type === "Team") {
            teamFieldsDiv.style.display = "block";
        } else {
            teamFieldsDiv.style.display = "none";
        }
    }
}

function validateRegistration() {
    var name = document.getElementById("studName").value.trim();
    var email = document.getElementById("studEmail").value.trim();
    var mobile = document.getElementById("studMobile").value.trim();
    var regNo = document.getElementById("studRegNo").value.trim();
    var eventName = document.getElementById("eventSelect").value;
    var partType = document.getElementById("partType").value;
    var teamName = document.getElementById("teamName").value.trim();
    var teamSize = parseInt(document.getElementById("teamSize").value);

    var errorBox = document.getElementById("errorBox");
    var successBox = document.getElementById("successBox");
   
    errorBox.style.display = "none";
    successBox.style.display = "none";

    if(name === "" || email === "" || mobile === "" || regNo === "" || eventName === "") {
        showError("Error: All primary fields are mandatory.");
        return;
    }

    if(email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        showError("Error: Please provide a valid Email Address layout.");
        return;
    }

        if(isNaN(mobile) || mobile.length !== 10) {
        showError("Error: Mobile length must stand at exactly 10 digital numbers.");
        return;
    }

    if(regNo === "") {
        showError("Error: Registration identifier cannot be blank.");
        return;
    }

    if(eventName === "AI Hackathon") {
        showError("Error: Registration status for 'AI Hackathon' is Closed.");
        return;
    }

    if(partType === "Team") {
        if(teamName === "") {
            showError("Error: Team Name field cannot be left blank.");
            return;
        }
        if(isNaN(teamSize) || teamSize < 2 || teamSize > 4) {
            showError("Error: Total group capacity constraints must match sizes between 2 and 4.");
            return;
        }
    }

    // Check for duplicate combination (Registration Number + Event Name)
    for(var i = 0; i < registeredUsers.length; i++) {
        if(registeredUsers[i].regNo === regNo && registeredUsers[i].event === eventName) {
            showError("Error: This registration profile identifier has already booked a slot for this specific event.");
            return;
        }
    }

    // Everything is valid - Save and show success
    var record = { regNo: regNo, event: eventName };
    registeredUsers.push(record);
   
    totalCount++;
    document.getElementById("reg-count").innerText = totalCount;

    successBox.innerText = "Success! Your registration record has been locked and processed.";
    successBox.style.display = "block";

    // Update dynamic panel UI view component
    var summaryHtml = "<p><strong>Name:</strong> " + name + "</p>" +
                      "<p><strong>Reg No:</strong> " + regNo + "</p>" +
                      "<p><strong>Chosen Track:</strong> " + eventName + "</p>" +
                      "<p><strong>Type:</strong> " + partType + "</p>";
    if(partType === "Team") {
        summaryHtml += "<p><strong>Team:</strong> " + teamName + " (" + teamSize + " members)</p>";
    }
    document.getElementById("dynamicSummary").innerHTML = summaryHtml;

    // Clear fields
    document.getElementById("regForm").reset();
    document.getElementById("teamFields").style.display = "none";
}

function showError(message) {
    var errorBox = document.getElementById("errorBox");
    errorBox.innerText = message;
    errorBox.style.display = "block";
    window.scrollTo(0, 300);
}


var ratingSum = 0;
var feedbackCount = 0;

function submitFeedback() {
    var name = document.getElementById("fbName").value.trim();
    var regNo = document.getElementById("fbRegNo").value.trim();
    var eventAttended = document.getElementById("fbEvent").value;
    var ratingVal = document.getElementById("fbRating").value;
    var comments = document.getElementById("fbComments").value.trim();
   
    var errBox = document.getElementById("fbError");
    errBox.style.display = "none";

    // Basic Presence Checks Validation
    if(name === "" || regNo === "" || eventAttended === "" || ratingVal === "" || comments === "") {
        showFbError("Error: All fields are explicitly required.");
        return;
    }


    if(comments.length < 20) {
        showFbError("Error: Review comments text details must span at least 20 characters long.");
        return;
    }

   var ratingNumeric = parseFloat(ratingVal);
    feedbackCount++;
    ratingSum += ratingNumeric;
   
    var calculatedAvg = (ratingSum / feedbackCount).toFixed(1);


    document.getElementById("totalReviews").innerText = feedbackCount;
    document.getElementById("avgRating").innerText = calculatedAvg + " / 5.0";

    var contentString = "<strong>Participant:</strong> " + name + " (" + regNo + ")<br>" +
                        "<strong>Target Event:</strong> " + eventAttended + "<br>" +
                        "<strong>Rating:</strong> " + ratingNumeric + " Stars<br>" +
                        "<strong>Notes:</strong> \"" + comments + "\"";
                       
    document.getElementById("summaryContent").innerHTML = contentString;
    document.getElementById("summaryBox").style.display = "block";

    // Wipe input values down cleanly for next session round
    document.getElementById("feedbackForm").reset();
    alert("Thank you! Your feedback submission loop processing completed smoothly.");
}

function showFbError(message) {
    var errBox = document.getElementById("fbError");
    errBox.innerText = message;
    errBox.style.display = "block";
}