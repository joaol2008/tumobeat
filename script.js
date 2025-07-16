window.onload = async function(){

    // Carregar dados através da internet (data.json)
    let request = await fetch("data.json");
    let audioData = await request.json();

    //Variaveis
    let title = document.querySelector("#title");
    let previousButton = document.querySelector("#previous-button");
    let playButton = document.querySelector ("#play-button");
    let nextButton = document.querySelector ("#next-button");

    let scrubInput = document.querySelector ("#scrub-input");
    let volumeInput = document.querySelector ("#volume-input");
    let fileInput = document.querySelector ("#file-input")

    let audio = document.querySelector("audio")
    let currentMusic = 0;
    console.log(audioData[currentMusic])

    //Funções
    function changetitle(value){
        title.innerText=value;
    }
    function updateInputBar(value, bar) {
        bar.style.transform = "scaleX(" + value / 100 + ")";

    }
    
    
    
    previousButton.onclick = function() {
            console.log("previous button cliked");
    }
    playButton.onclick = function(){

        if(audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
        console.log("play button clicked");
    }
    nextButton.onclick = function() {
        console.log("next button clicked");
    }
    scrubInput.querySelector("input").oninput = function(event) {
        let bar = scrubInput.querySelector(".range-bar");
        updateInputBar(event.target.value, bar);
    }
    
    volumeInput.querySelector("input").oninput = function(event) {
        let bar = volumeInput.querySelector(".range-bar");
        updateInputBar(event.target.value, bar);
    }
        
    fileInput.oninput = function(){
        console.log("aqui!")
    }


    function playAudio() {
        audio.src = audioData[currentMusic].url;
        audio.play()
    }
    function pauseAudio() {
        audio.pause();

    }
    audio.onplay = function() {
        let playicon = document.querySelector("#icon-play");
        let pauseicon = document.querySelector("#icon-pause");
        playicon.style.display = "none";
        pauseicon.style.display = "block";
        

    }

    audio.onpause = function() {
        let playicon = document.querySelector("#icon-play");
        let pauseicon = document.querySelector("#icon-pause");
        playicon.style.display = "block";
        pauseicon.style.display = "none";
    }
}