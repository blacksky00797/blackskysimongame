const bodyTag = $("body")[0];
const songList = ["yellow.mp3","red.mp3","green.mp3","blue.mp3","wrong.mp3"];
const startButtonTag = document.querySelector(".startButton");
const colorTag = $(".color");
const levelTag = document.querySelector(".levelContainer");
const goLabelTag = document.querySelector(".goLabel");
const progressBar = document.querySelector(".progressBar");

let gameCounter=0;
let tempGameCounter=0;
let colorIdList = [];
let level=1;
startButtonTag.addEventListener("click" , () => {
    level=0;
    gameCounter=0;
    tempGameCounter=0;
    bodyTag.classList.remove("redBackground");
    updateProgressBar(true);
    setTimeout( () => {
        play();
        
    } , 2000 );
});

for ( let id=0 ; id<colorTag.length ; id++ ) {
    colorTag[id].addEventListener("click", () => {
        if ( id === colorIdList[0] ) {
            playAnimation(colorTag[id],id);
            colorIdList.shift();
            if ( colorIdList.length === 0 ) {
                ++level;
                levelTag.textContent = levelProgressionLabel();
                updateProgressBar(false);
                goLabelTag.classList.remove("goLabelOpa");
                setTimeout( () => {
                    play();
                    
                } , 2000 );
            }
        } else {
            playAnimation(colorTag[id],songList.length-1);
            bodyTag.classList.add("redBackground");
            // setTimeout(()=>{
            //     bodyTag.classList.remove("redBackground");
            // },200);
        }
    });
}


const playAnimation = ( tagName , songId) => {
    const song = new Audio("song/"+songList[songId]);
    song.play();
    tagName.classList.add("white");
        setTimeout( () => {
            tagName.classList.remove("white");
    },200);
    ++tempGameCounter;
    if ( tempGameCounter===gameCounter ) {
        goLabelTag.classList.add("goLabelOpa");
        tempGameCounter=0;
    }
}

const play = () => {
    bodyTag.classList.remove("redBackground");
    colorIdList = [];
    for ( let id=0 ; id<=gameCounter ; id++ ) {
        let randomId = Math.floor(Math.random()*4);
        if ( randomId > songList.length-1 ) randomId=songList.length-1;
        if ( randomId < 0 ) randomId=0;
        colorIdList.push(randomId);
        setTimeout( () => {
            playAnimation(colorTag[randomId],randomId);
        },id*1000);
    }
    ++gameCounter;
    
    console.log("thisstage");
}

const levelProgressionLabel = () => {
    let finalMsg = "";
    if ( level <= 5 ) finalMsg = "Level "+level;
    if ( level > 5 ) finalMsg = "Level "+level+" Senior";
    if ( level > 7 ) finalMsg = "Level "+level+" Aggressive";
    if ( level > 10 ) finalMsg = "Level "+level+" Genius";
    return finalMsg;
}

const updateProgressBar = (isStartAgain) => {
    if ( !isStartAgain ) {
        progressBar.style.width = parseInt(getComputedStyle(progressBar).width) + 80;
    } else {
        progressBar.style.width = 0;
    }
}