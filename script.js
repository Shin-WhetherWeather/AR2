fullsScreenButton = document.getElementById("fullScreenButton");

function requestFullScreen() {

    var el = document.body;
  
    // Supports most browsers and their versions.
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen 
    || el.mozRequestFullScreen || el.msRequestFullScreen;
  
    if (requestMethod) {
  
      // Native full screen.
      requestMethod.call(el);
  
    } else if (typeof window.ActiveXObject !== "undefined") {
  
      // Older IE.
      var wscript = new ActiveXObject("WScript.Shell");
  
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }

    fullsScreenButton.removeEventListener("click", 
        requestFullScreen);
        fullsScreenButton.addEventListener("click",
        exitFullScreen);
        fullsScreenButton.innerHTML = "<div class = 'navButton'><span class='material-icons md'>fullscreen_exit</span></div>";
  }


  function exitFullScreen(){
    console.log("exit");
    var el = document;
  
    // Supports most browsers and their versions.
    var requestMethod = el.exitFullScreen || el.webkitExitFullscreen 
    || el.mozExitFullscreen || el.msExitFullscreen;

    if (requestMethod) {
  
        // Native full screen.
        requestMethod.call(el);
    
      } else if (typeof window.ActiveXObject !== "undefined") {
    
        // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
    
        if (wscript !== null) {
          wscript.SendKeys("{ESCAPE}");
        }
      }

      fullsScreenButton.removeEventListener("click", 
        exitFullScreen);
        fullsScreenButton.addEventListener("click",
        requestFullScreen);
        fullsScreenButton.innerHTML = "<div class = 'navButton'><span class='material-icons md'>fullscreen</span></div>";

  }





  fullsScreenButton.addEventListener("click", requestFullScreen);




const DURATION = 40;
const FRAMES = 350;


let buttonR = document.getElementById("buttonR");
let buttonL = document.getElementById("buttonL");
let model = document.getElementById("model");
model.setAttribute('animation-mixer', {timeScale:0, duration:40});

let currentState = 1;
//              
let sceneFrames = [1,       55,         105,        122,        150,        181,        350];
let lightColor = [[1,1,1],  [1,1,1],    [1,1,1],    [1,1,1],    [1,1,1],    [0,1,0],    [0,1,0],[0,1,0],[0,1,0],];
let titleText = [1,2,3,4,5,6,7,8,9,10]
let sceneText = ["The Mobile Stroke Unit (MSU) arrives to a suspected stroke patient within the golden hour of stroke symptoms.",
    "The paramedics retrieve the patient and strap them to a stretcher.",
    "The PAD is placed under the patient.",
    "The Imager is unlatched from the wall and extended.",
    "The Detector is unlatched from the wall and attached to the Imager. The system is now ready for scanning.",
    "The patient is pushed into the MSU on the stretcher."]

function changeLightColor(color){
    const obj = model.getObject3D('mesh');
    obj.traverse(node => {
        if(node.material){
            if(node.material.name == "Imager Lamp"){
                node.material.emissive.r=color[0];
                node.material.emissive.g=color[1];
                node.material.emissive.b=color[2];
            }
            

            /*
            objChild.forEach(child => {
                if(child.name == "NAUO6007"){
                    child.material.color.r=1;
                    console.log(child.material.color);
                }
                
            });*/
        }
        
    })
}

textTitle = document.getElementById("textTitle");
textContent = document.getElementById("textContent");

model.addEventListener("model-loaded", ()=>{
    setTimeout(function(){

        const obj = model.getObject3D('mesh');

        obj.traverse(node => {
            if(node.material){
                if(node.material.name == "Glass.001"){
                    console.log(node);
                    node.material.opacity = 0.4;
                    node.material.roughness = 0.1;
                    node.material.metalness=0;
                    node.material.transparent = true;
                }
                

                /*
                objChild.forEach(child => {
                    if(child.name == "NAUO6007"){
                        child.material.color.r=1;
                        console.log(child.material.color);
                    }
                    
                });*/
            }
            
        })

    }, 1000);



})


let buttonActive = true;

function animate(direction){
    if(buttonActive == false){
        return;
    }

    buttonActive = false;
    buttonL.classList.add("inactive");
    buttonR.classList.add("inactive");

    let mil;

    if(direction == 1){
        
        if(currentState > sceneFrames.length - 1){
            return;
        }
        mil = DURATION*(sceneFrames[currentState] - sceneFrames[currentState - 1])*1000/FRAMES;
        mil = Math.floor(mil);
        textContent.innerText = sceneText[currentState];
        textTitle.innerText = "Step " + titleText[currentState];

    }
    else if(direction == -1){
        
        if(currentState <= 1){
            return;
        }
        mil = DURATION*(sceneFrames[currentState-1] - sceneFrames[currentState-2])*1000/FRAMES;
        mil = Math.floor(mil);
        textContent.innerText = sceneText[currentState - 2];
        textTitle.innerText = "Step " + titleText[currentState - 2];
    }


    currentState = currentState + direction;
    model.setAttribute('animation-mixer', {timeScale:direction});

    setTimeout(function(){
        if(currentState > sceneFrames.length - 1){
            buttonR.classList.add("inactive");
            buttonL.classList.remove("inactive");
        }else if(currentState <= 1){
            buttonL.classList.add("inactive");
            buttonR.classList.remove("inactive");
        }else{
            buttonL.classList.remove("inactive");
            buttonR.classList.remove("inactive");
        }
        model.setAttribute('animation-mixer', {timeScale:0});
        changeLightColor(lightColor[currentState]);
        buttonActive = true;
    },mil);

}




buttonR.addEventListener("click", function(){
    animate(1);
})

buttonL.addEventListener("click", function(){
    animate(-1);
})

//100, 110, 118, 138, 159, 169, 229, 262, 273, 304,



  

/*

    if(buttonActive){
        buttonActive = false;
        if(currentState > sceneFrames.length - 1){
            return;
        }
        let mil = DURATION*(sceneFrames[currentState] - sceneFrames[currentState - 1])*1000/FRAMES;
        mil = Math.floor(mil);
        textContent.innerText = sceneText[currentState];
        textTitle.innerText = "Step " + titleText[currentState];
        currentState++;
        model.setAttribute('animation-mixer', {timeScale:1});

        setTimeout(function(){
            model.setAttribute('animation-mixer', {timeScale:0});
            changeLightColor(lightColor[currentState]);
            buttonActive = true;
        },mil);
    }
*/
  

