var imageSources = [
    "images/Gem Blue.png", 
    "images/Gem Green.png", 
    "images/Gem Orange.png",
    "images/grass-block.png",
    "images/Heart.png",
    "images/Key.png",
    "images/Rock.png",
    "images/Selector.png",
    "images/Star.png",
    "images/stone-block.png",
    "images/water-block.png"
];

var characterImages = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png"
];




addImgInterval();
addCharacterImages();
addCharacterSelectedText()

function addImgInterval() {
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    window.setInterval(function() {
        img1.src = imageSources[Math.floor(Math.random()*imageSources.length)];
        img2.src = imageSources[Math.floor(Math.random()*imageSources.length)]; 
    }, 700);
}
function addCharacterImages() {
	var characterBox = document.getElementById("character-select");
	for (var i = 0; i < characterImages.length; i++) {
		var img = document.createElement("img");
		img.id ="char";
		img.src = characterImages[i];
		img.onclick = characterSelected;
		characterBox.appendChild(img);
	}
}

function addCharacterSelectedText() {
    var charSelectedDiv = document.createElement("div");
    charSelectedDiv.id="cs";
    document.body.appendChild(charSelectedDiv);
}
        

function characterSelected() {
    var charName = this.src.substring(this.src.lastIndexOf("/")+1, this.src.indexOf("."))
    player.setSprite("images/" + charName + ".png");
    document.getElementById("cs").innerHTML = ("You've selected " + charName);

    /*if (document.getElementById("canvas") == null) {
        //canvas is not on the page yet so load in engine.js
        //set the overflow of the body to be hidden because the scrolling aspect is garbage

        var engineScript = document.createElement("script");
        engineScript.src = "js/engine.js";
        document.body.appendChild(engineScript);
    }*/

}