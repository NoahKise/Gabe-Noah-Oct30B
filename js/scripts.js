// Business Logic

function Place(landmark, location, date, notes, color, image) {
    this.landmark = landmark;
    this.location = location;
    this.date = date;
    this.notes = notes;
    this.color = color;
    this.image = image;
}

const pioneerSquare = new Place("Pioneer Place", "Portland, OR", "2022-10-31", "This is a square in the middle of downtown Portland that is full of food carts, pigeons, and meth heads.", "#4b9946", "./img/pioneerSquare.jpeg");
const spoonBridge = new Place("Spoonbridge", "Minneapolis, MN", "2013-07-02", "This is an iconic sculpture across from the basillica", "#ed2400", "./img/cherry.jpeg");
const goingToTheSunRoad = new Place("Going to the Sun Road", "Glacier National Park, MT", "2023-08-24", "This is scenic road you can drive on in Glacier National Park.  It is the only east-west route through the park, and is only open a few months of the year due to extreme elevation and snowfall.", "#00f2ff", "./img/road.jpeg");

// UI Logic
const body = document.querySelector("body");
let placesArray = [pioneerSquare, spoonBridge, goingToTheSunRoad];

document.addEventListener("DOMContentLoaded", function() {
    placesArray.forEach(function(place) {
        const profileDiv = document.createElement("div");
        const buttonDiv = document.createElement("div")
        profileDiv.setAttribute("id", "hidden")
        profileDiv.setAttribute("class", "result");
        profileDiv.classList.add("profile");

        const buttonLandmark = document.createElement("button");
        buttonLandmark.setAttribute("id", "landmarkButton")
        buttonLandmark.textContent = place.landmark;

        const imgElement = document.createElement("img");
        imgElement.src = place.image;

        const h2Location = document.createElement("h2");
        h2Location.textContent = place.location;

        const h3Date = document.createElement("h3");
        h3Date.textContent = place.date;

        const pNotes = document.createElement("p");
        pNotes.textContent = place.notes;

        profileDiv.style.backgroundColor = place.color;

        buttonDiv.append(buttonLandmark);
        document.body.append(buttonDiv, profileDiv);

        buttonLandmark.addEventListener("click", function() {
            const profileDetails = document.createElement("div");
            profileDetails.classList.add("profile-details");
            profileDetails.append(imgElement, h2Location, h3Date, pNotes);
            profileDiv.append(profileDetails);
        });
        function toggleDisplay() {
            if (profileDiv.getAttribute("id") === "hidden") {
                profileDiv.removeAttribute("id");
            } else {
                profileDiv.setAttribute("id", "hidden");
            }
        }
    
        buttonLandmark.addEventListener("click", toggleDisplay);
    });
});


function formHandler(event) {
    event.preventDefault();
    const landmarkInput = document.querySelector("input#inputLandmark").value;
    const locationInput = document.querySelector("input#inputLocation").value;
    const dateInput = document.querySelector("input#inputDate").value;
    const notesInput = document.querySelector("textarea#inputNotes").value;
    const colorInput = document.querySelector("input#inputColor").value;
    const imageInput = document.querySelector("input#inputImage").files[0];

    const newPlace = new Place(landmarkInput, locationInput, dateInput, notesInput, colorInput);
    placesArray.push(newPlace);
    const nameDiv = document.createElement("div");
    nameDiv.setAttribute("id", "resultName");
    const resultDiv = document.createElement("div");
    resultDiv.setAttribute("class", "result");
    resultDiv.setAttribute("id", "hidden");
    const buttonLandmark = document.createElement("button");
    const h2Location = document.createElement("h2");
    const h3Date = document.createElement("h3");
    const pNotes = document.createElement("p");
    const imgImage = document.createElement("img");

    buttonLandmark.append(landmarkInput);
    h2Location.append(locationInput);
    h3Date.append(dateInput);
    pNotes.append(notesInput);

    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imgImage.src = e.target.result;
        };
        reader.readAsDataURL(imageInput);
    }
    console.log(imageInput);
    nameDiv.append(buttonLandmark)
    resultDiv.append(imgImage, h2Location, h3Date, pNotes)
    resultDiv.style.backgroundColor = colorInput;
    document.body.append(nameDiv, resultDiv);
    function toggleDisplay() {
        if (resultDiv.getAttribute("id") === "hidden") {
            resultDiv.removeAttribute("id");
        } else {
            resultDiv.setAttribute("id", "hidden");
        }
    }

    buttonLandmark.addEventListener("click", toggleDisplay);
    
    const landmarkForm = document.getElementById("landmark");
    landmarkForm.reset();
    const locationForm = document.getElementById("location");
    locationForm.reset();
    const dateForm = document.getElementById("date");
    dateForm.reset();
    const colorForm = document.getElementById("color");
    colorForm.reset();
    const imageForm = document.getElementById("image");
    imageForm.reset();
    const notesForm = document.getElementById("notes");
    notesForm.reset();
}

window.addEventListener("load", function () {
    document.querySelector("form#notes").addEventListener("submit", formHandler);
});