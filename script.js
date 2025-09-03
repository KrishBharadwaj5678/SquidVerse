const modelViewer = document.querySelector("model-viewer");
const infoBtn = document.getElementById("info-icon");
const infoDisplay = document.getElementById("info-display");
const musicBtn = document.getElementById("music-icon");
const rulesBtn = document.getElementById("rules-icon");
const settingBtn = document.getElementById("setting-icon");
const youtubeBtn = document.getElementById("yt-video");

const popup = document.getElementById("settings-popup");
const closeBtn = document.getElementById("close-popup");

const scaleSlider = document.getElementById("scaleSlider");
const scaleValue = document.getElementById("scaleValue");

const cameraSlider = document.getElementById("cameraSlider");
const cameraValue = document.getElementById("cameraValue");

const lightingSlider = document.getElementById("exposureSlider");
const lightingValue = document.getElementById("exposureValue");

const shadowSlider = document.getElementById("shadowSlider");
const shadowValue = document.getElementById("shadowValue");

const arRadios = document.querySelectorAll("input[name='arMode']");
const animation = document.getElementById("animation");

const screenshotBtn = document.getElementById("screenshot-icon");

const arBtn = document.querySelector(".ar-btn");

// Activate AR based on click
arBtn.addEventListener("click",() => {
  modelViewer.activateAR();
  popup.style.display = "none";
})

// Open popup
settingBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

// Close popup
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Update Scaling
scaleSlider.addEventListener("input", () => {
  modelViewer.setAttribute("scale",`${scaleSlider.value} ${scaleSlider.value} ${scaleSlider.value}`);
  scaleValue.textContent = scaleSlider.value;
});

// Update Camera
cameraSlider.addEventListener("input", () => {
  modelViewer.setAttribute("camera-orbit", `180deg auto ${cameraSlider.value}m`);
  cameraValue.textContent = cameraSlider.value;
});

// Update Lighting
lightingSlider.addEventListener("input", () => {
  modelViewer.setAttribute("exposure",lightingSlider.value);
  lightingValue.textContent = lightingSlider.value;
});

// Update Shadow
shadowSlider.addEventListener("input", () => {
  modelViewer.setAttribute("shadow-intensity",shadowSlider.value);
  shadowValue.textContent = shadowSlider.value;
});

// Set AR Mode
arRadios.forEach(radio => {
  radio.addEventListener("change",()=>{
    modelViewer.setAttribute("ar-modes",radio.value);
  })
})

// Animation Control
animation.addEventListener("change",() => {
  if(animation.checked){
    modelViewer.play();
  }else{
    modelViewer.pause();
  }
})

// Screenshot + Share Feature 
screenshotBtn.addEventListener("click",() => {
  if(modelViewer.toDataURL){
    let dataURL = modelViewer.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = dataURL;
    link.download = "Squidverse.png";
    link.click();

    // Convert DataURL -> Blob
    fetch(dataURL).then(res => res.blob()).then(blob => {
      let file = new File([blob], "Squidverse.png",{type:"image/png"});
      if(navigator.share){
        navigator.share({
          files: [file],
          title: "Don’t miss this! 👀",
          text: "Check out this cool snapshot!"
        }).catch(err => console.error("Share failed:",err));
      } else{
        alert("Sharing not supported on this browser.");
      }
    })
  }
})

// Squid Game Database
const infoText = {
  "Red Light": {
    title: "Red Light Green Light",
    description: "• The goal is to reach the finish line first without getting caught moving. \n• When the doll plays music, players can move forward. \n• When the music stops, players must freeze immediately. \n• If anyone is caught moving while the music is off, they are eliminated.",
    music: "./sounds/RedLight.mp3",
    orbit: "180deg 80deg 1m",
    rules: "./rules/RedLight.mp3",
    ytlink: "https://www.youtube.com/watch?v=2rl0tlLG2kI&pp=ygUfcmVkIGxpZ3RoIGdyZWVuIGxpZ2h0ICBzZWFzb24gMQ%3D%3D",
    lighting: "1"
  },
  "Mingle": {
    title: "Mingle",
    description: "• First, all players must stand on the platform. \n• Once the game begins, the platform will start rotating. \n• After some time, a number will be announced. \n• According to that number, players must quickly form a group. \n• Within 30 seconds, the group must enter a room, and the room should be locked. \n• Any players who fail to form a group will be eliminated.",
    music: "./sounds/Mingle.mp3",
    orbit: "auto auto 0.1m",
    rules: "./rules/Mingle.mp3",
    ytlink: "https://www.youtube.com/watch?v=LP04L3rTiLc&pp=ygURbWluZ2xlIHNxdWlkIGdhbWU%3D",
    lighting: "1.1"
  },
  "Jump Rope": {
    title: "Jump Rope",
    description: "• A rope bridge is set up using ropes. \n• Players must cross the bridge within 20 minutes. \n• You must decide among yourselves who goes first. \n• Anyone who fails to cross or falls before time runs out is eliminated. \n• Those who reach the other side before 20 minutes are the winners.",
    music: "./sounds/JumpRope.mp3",
    orbit: "auto auto 2.1m",
    rules: "./rules/JumpRope.mp3",
    ytlink: "https://www.youtube.com/watch?v=7lVp_JW7HIY&pp=ygUOanVtcCByb3BlIGdhbWU%3D",
    lighting: "1"
  },
  "Sky Squid Game": {
    title: "Sky Squid Game",
    description: "• Players must cross three towers without falling: Chchoris Tower, Trikon Tower, and Goal Tower. \n• The first round starts at Chchoris Tower. \n• The main objective is to push one or more players down to eliminate them. \n• Only the surviving players move to the next tower (Trikon Tower). \n• The process continues until the Goal Tower. \n• The players who remain on the Goal Tower are declared as winners. \n• If no player falls from a tower within the given time, then all players on that tower will be eliminated.",
    music: "./sounds/SkySquidGame.mp3",
    orbit: "auto auto 3m",
    rules: "./rules/SkySquidGame.mp3",
    ytlink: "https://www.youtube.com/watch?v=bc831YQUuWg&pp=ygUPc2t5IHNxdWlkIGdhbWUg",
    lighting: "2.6"
  },
  "Hide And Seek": { 
    title: "Hide And Seek",
    description: "• Team Blue must either find an escape route within 30 minutes \n• Or stay hidden until the game ends without being caught by Team Red.\n• Team Red must search and eliminate all Team Blue members within 30 minutes.\n• If Team Red fails to eliminate anyone in the given time, they will be eliminated.",
    music: "./sounds/HideAndSeek.mp3",
    orbit: "auto auto 2.9m",
    rules: "./rules/HideAndSeek.mp3",
    ytlink: "https://www.youtube.com/watch?v=CU-I86h9MKE&pp=ygUkaGlkZSBhbmQgc2VlayAgc3F1aWQgZ2FtZSBmdWxsIHNjZW5l0gcJCbIJAYcqIYzv",
    lighting: "1.2"
  },
  "Dalgona": {
    title: "Dalgona",
    description: "• All players gather at their assigned shape. \n• You must carve out the given shape within 10 minutes. \n• If you successfully extract the shape, you win. \n• If the shape breaks, you are eliminated.",
    music: "./sounds/Dalgona.mp3",
    orbit: "auto auto 0.1m",
    rules: "./rules/Dalgona.mp3",
    ytlink: "https://www.youtube.com/watch?v=-SneJ_7SRQk&pp=ygUYZGFsZ29uYSBtdXNpYyBzcXVpZCBnYW1l",
    lighting: "1"
  },
  "Game Lobby": { 
    title: "Game Lobby",
    description: "• It is also known as The Lobby. \n• It is a location where players stay between the Games. \n• The room is rectangular, with tall metal bunk beds lined along the walls.",
    music: "./sounds/GameLobby.mp3",
    orbit: "auto auto 0.1m",
    rules: "",
    ytlink: "",
    lighting: "0.6"
  },
  "Restroom": { 
    title: "Restroom",
    description: "• The restrooms serve as a location for players to eliminate waste.\n• These areas in the game are not equipped with cameras. \n• It creates a space for players to attack each other.",
    music: "./sounds/Restroom.mp3",
    orbit: "auto auto 0.1m",
    rules: "",
    ytlink: "",
    lighting: "0.7"
  },
  "Staircase": {
    title: "Staircase",
    description: "• The stairs, or the main game hall, is a location in Squid Game. \n• It is where the players are transported to the games by ascending the staircases.",
    music: "./sounds/Staircase.mp3",
    orbit: "auto auto 1m",
    rules: "",
    ytlink: "",
    lighting: "0.6"
  },
};

// Load this initially
let gameMusic = new Audio();
let rulesMusic = new Audio();
gameMusic.src = infoText["Red Light"].music;
rulesMusic.src = infoText["Red Light"].rules;
let currentGameName = "Red Light";

// Toggle info display
infoBtn.addEventListener("click", () => {
  if (infoDisplay.style.display === "none" || !infoDisplay.style.display) {
    infoDisplay.style.display = "block"; 
    infoDisplay.innerHTML = `<h3 class='carname'">${infoText[currentGameName].title}</h3><p class="carinfo">${infoText[currentGameName].description}</p>`;
    gsap.fromTo(
      infoDisplay,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  } else {
    gsap.to(infoDisplay, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        infoDisplay.style.display = "none"; // Hide after animation
      }
    });
  }
});

// Music Icon Switcher
musicBtn.addEventListener('click', function() {
  const icon = this.querySelector('i');
  
  // Toggle between icons
  if (icon.classList.contains('fa-play')) {
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
      gameMusic.play();
  } else if (icon.classList.contains('fa-pause')) {
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
      gameMusic.pause();
  } 
});

// If music ends then show play icon
gameMusic.addEventListener("ended",() => {
  const icon = musicBtn.querySelector('i');
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
})

// Rules Icon
rulesBtn.addEventListener("click",()=>{
  rulesMusic.play();
})

// Switch game model and update
window.switchSrc = (element, foldername, name, carName) => {
  const base = `/${foldername}/${name}`;
  modelViewer.src = base + ".glb";
  modelViewer.poster = base + ".png";
  modelViewer.poster = base + ".png";
  gameMusic.src = infoText[carName].music;
  rulesMusic.src = infoText[carName].rules;
  youtubeBtn.href = infoText[carName].ytlink;
  modelViewer.setAttribute("camera-orbit",infoText[carName].orbit);
  modelViewer.setAttribute("exposure",infoText[carName].lighting);
  lightingValue.textContent = infoText[carName].lighting;
  lightingSlider.value = infoText[carName].lighting;

  // Check that Youtube Link and Rules exists or not
  if(infoText[carName].ytlink ==="" && infoText[carName].rules === ""){
    youtubeBtn.style.display = "none";
    rulesBtn.style.display = "none";
  } else{
    youtubeBtn.style.display = "block";
    rulesBtn.style.display = "block";
  }

  // Switch from pause to play icon
  const icon = musicBtn.querySelector('i');

  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
  gameMusic.play();

  currentGameName = carName;
  
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => slide.classList.remove("selected"));
  element.classList.add("selected");

  // If info is visible, animate update
  if (infoDisplay.style.display === "block") {
    gsap.to(infoDisplay, {
      y: -10,
      opacity: 0,
      duration: 0.3,
      ease: "power1.in",
      onComplete: () => {
        infoDisplay.innerHTML = `<h3 class='carname'">${infoText[currentGameName].title}</h3><p class="carinfo">${infoText[currentGameName].description}</p>`;;
        gsap.fromTo(
          infoDisplay,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }
        );
      }
    });
  }

};

// Prevent XR interaction issues with the slider
document.querySelector(".slider").addEventListener("beforexrselect", (ev) => {
  ev.preventDefault();
});