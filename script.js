window.onload = async function(){


    //Carregar o service worker
     if ("serviceWorker"){
     navigator.serviceWorker.register("service-worker.js")
    }
    
    
    //Carregar dados da internet (data.json)
    let request = await fetch("data.json");
    let audioData = await request.json();
    
    
    
    //Variaveis
    let title = document.querySelector("#title");
    let previousButton = document.querySelector("#previous-button");
    
    
    let playButton = document.querySelector ("#play-button");
    let nextButton = document.querySelector ("#next-button");
    
    let volumeButton = document.querySelector ("#volume-input");
    let scrubInput = document.querySelector ("#scrub-input");
    
    let fileinput = document.querySelector("#file-input");
    
    
    let audio = document.querySelector("audio");
    audio.src = audioData[0].url;
    let currentMusic = 0;
    let pauseTime = 0;
    
    //Funções
    
    function changetitle(value){
    title.innerText=value;
    }
    function updateInputBar(value , bar ){
    bar.style.transform = "scaleX(" +value /100 + ")";
    }
    audio.onplay = function()
    {
    console.log ("audio está a tocar");
    }
    function playAudio( ){
    
    audio.src = audioData[currentMusic].url
    changetitle(audioData[currentMusic].title);
    audio.play()
    }
    function pauseAudio(){
    audio.pause ();
    }
    
    previousButton.onclick = function() {
    currentMusic--;
    if(currentMusic < 0){
    currentMusic = audioData.length - 1;
    }
    playAudio();
    
    }
    playButton.onclick = function(){
        if (audio.paused){
            playAudio();
            audio.currentTime = pauseTime;
            pauseTime = 0
        } else {
            pauseTime = audio.currentTime;
            pauseAudio();
        }
    }
    audio.onplay = function(){
    let playIcon = document.querySelector("#icon-play");
    let pauseIcon = document.querySelector("#icon-pause")
    playIcon.style.display = "none";
    pauseIcon.style.display = "initial";
    }
    audio.onpause = function (){
    let playIcon = document.querySelector("#icon-play");
    let pauseIcon = document.querySelector("#icon-pause")
    playIcon.style.display = "initial";
    pauseIcon.style.display = "none";
    
    }
    audio.ontimeupdate = function(){
    let bar = scrubInput.querySelector(".range-bar");
    let value = (audio.currentTime / audio.duration) * 100;
    
    updateInputBar(value, bar);
    
    }

    audio.onended = function() {
        nextButton.click();
    }
    
    function scrubAudio(value){
    if (!audio.src) return;
    audio.currentTime = audio.duration * (value / 100);
    }
    
    nextButton.onclick = function() {
    currentMusic++;
    if(currentMusic>= audioData.length){
    currentMusic = 0;
    }
    playAudio();
    
    
    }
    scrubInput.querySelector("input").oninput = function(event) {
    let bar = scrubInput.querySelector(".range-bar");
    let value = event.target.value;
    scrubAudio(value);
    updateInputBar(event.target.value, bar);
    
    }
    volumeButton.querySelector("input").oninput = function(event) {
    let bar = volumeButton.querySelector(".range-bar");
    let value = event.target.value;
    audio.volume = value/100;
    updateInputBar(value, bar);
    
    }
    fileinput.oninput = function(event) {
    
    let file = Array.from(fileinput.files)[0];
    let reader = new FileReader();
    reader.onload = function() {
    audioData.push({
    title: file.name,
    url: reader.result
    });
    }
    if (file) {
    reader.readAsDataURL(file);
    }
    }
    
    }