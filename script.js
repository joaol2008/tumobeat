window.onload = function(){

    //variaveis
    let title = document.querySelector("#title");
    let previousButton = document.querySelector("#previous-button");
    let playButton = document.querySelector ("#play-button");

    let nextButton = document.querySelector ("#next-button");

    //funções
    function changetitle(value){
        title.innerText=value;
    }

    previousButton.onclick = function() {
            console.log("previous button cliked");
    }
    playButton.onclick = function(){
        console.log("play button clicked");
    }
    nextButton.onclick = function() {
        console.log("next button clicked");
    }

}