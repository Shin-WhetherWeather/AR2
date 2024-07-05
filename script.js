




let fullScreenButton;

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





 




const DURATION = 40;
const FRAMES = 350;






let currentState = 0;             
let sceneFrames = [1,       57,         105,        122,        150,        181,        252,        300,        380];
let lightColor = [[1,1,1],  [1,1,1],    [1,1,1],    [1,1,1],    [1,1,1],    [0,1,0],    [1,1,0],    [1,1,1],    [1,1,1], [1,1,1]];
let titleText = [1,2,3,4,5,6,7,8,9,10]
let sceneText = ["The ambulance arrives to a suspected stroke patient within the golden hour of stroke symptoms.",
    "The paramedics retrieve the patient and strap them to a stretcher.",
    "The PAD is placed under the patient.",
    "The Imager is unlatched from the wall and extended.",
    "The Detector is unlatched from the wall and attached to the Imager. The system is now ready for scanning.",
    "The patient is pushed into the ambulance on the stretcher.",
    "The 21 x-ray tubes fire in sequence through 3 angles to complete a cranial scan.",
    "The scan is complete, the detector and imager are retracted and mounted back onto the wall.",
    "The PAD is mounted back into the wall. The ambulance is now ready to depart to the hospital."]

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

let person;
let cones =[];



let fadeConeID = [];
let fadeConeIndex = [];

function fadeCone(i){

    if(fadeConeIndex[i] >= 16){
        clearInterval(fadeConeID[i]);
        cones[i].material.opacity = 0.5;
        cones[i].visible = false;
        return;
    }
    cones[i].material.opacity = Math.max(-(0.65/19)*fadeConeIndex[i] + 0.65, 0);
    fadeConeIndex[i]++;
    
}

function beams(){
    for(let i = 0; i < cones.length; i++){
        setTimeout(function(){
            cones[i].visible = true;

            fadeConeIndex[i] = 0;
            fadeConeID[i] = setInterval(function(){
                fadeCone(i);
            }, 8);
        }, 55*i);


        setTimeout(function(){
            cones[i].visible = true;

            fadeConeIndex[i] = 0;
            fadeConeID[i] = setInterval(function(){
                fadeCone(i);
            }, 8);
        }, 2650+ 55*i);

        setTimeout(function(){
            cones[i].visible = true;

            fadeConeIndex[i] = 0;
            fadeConeID[i] = setInterval(function(){
                fadeCone(i);
            }, 8);
        }, 5300+ 55*i);
    }
}



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
        if(currentState == 1){
            setTimeout(function(){
                person.material.opacity = 1;
            },DURATION*(sceneFrames[currentState] - sceneFrames[currentState - 1])*700/FRAMES);
           
        }

        if(currentState == 6){
            beams();
        }



        
        if(currentState > sceneFrames.length - 1){
            return;
        }
        mil = DURATION*(sceneFrames[currentState] - sceneFrames[currentState - 1])*1000/FRAMES;
        mil = Math.floor(mil);
        textContent.innerText = sceneText[currentState];
        textTitle.innerText = "Step " + titleText[currentState];

    }
    else if(direction == -1){
        if(currentState == 2){
            setTimeout(function(){
                person.material.opacity = 0;
            },DURATION*(sceneFrames[currentState-1] - sceneFrames[currentState-2])*300/FRAMES);
        }

        if(currentState == 7){
            setTimeout(function(){
                beams();
            },1200)
        }


        
        if(currentState <= 1){
            return;
        }
        mil = DURATION*(sceneFrames[currentState-1] - sceneFrames[currentState-2])*1000/FRAMES;
        mil = Math.floor(mil);
        textContent.innerText = sceneText[currentState - 2];
        textTitle.innerText = "Step " + titleText[currentState - 2];
    }


    currentState = currentState + direction;
    let model = document.getElementById("model");
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










document.addEventListener("DOMContentLoaded", function() {
    fullsScreenButton = document.getElementById("fullScreenButton");
    let buttonR = document.getElementById("buttonR");
    let buttonL = document.getElementById("buttonL");

    buttonL.classList.add("inactive");
    buttonR.classList.add("inactive");

    textTitle = document.getElementById("textTitle");
    textContent = document.getElementById("textContent");
    let startAR = document.getElementById("startAR");

	const sceneEl = document.querySelector('a-scene');
	let arSystem;
	sceneEl.addEventListener('loaded', function () {
	  arSystem = sceneEl.systems["mindar-image-system"];
	});


    model.addEventListener("model-loaded", ()=>{

        startAR.innerText = "Start AR";
        startAR.classList.remove("inactive");
        startAR.addEventListener("click", function(){
            
            arSystem.start();
            document.getElementById("loadingScreen").style.display="none";
        });


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

                    if(node.material.name.includes("Human.002")){
                        person = node;
                        person.material.transparent = true;
                        person.material.opacity = 0;
                    }

                    if(node.name.includes("x-ray-cone")){
                        node.material = node.material.clone();
                        cones.push(node);
                        node.material.flatShading = true;
                        node.material.clipIntersection = true;
                        node.material.emissive.r=0;
                        node.material.emissive.g=0.2;
                        node.material.emissive.b=1;
                        node.material.transparent = true;
                        node.material.opacity = 0.5;
                        node.visible = false;
                    }
                }
            }
        );

        cones.sort((a,b) => a.name.localeCompare(b.name) );
        cones = cones.reverse();

        }, 1000);
    })
    
    


        
    fullsScreenButton.addEventListener("click", requestFullScreen);

    const target = document.getElementById("target");
    const dimmer = document.getElementById("dimmer");


    target.addEventListener("targetFound", function(){
        setTimeout(function(){
            dimmer.style.opacity = "0.9";
            buttonR.parentElement.classList.add("elevate");
            buttonR.classList.remove("inactive");
            buttonR.addEventListener("click", function firstStep(){

                buttonR.removeEventListener("click", firstStep);
                dimmer.style.display="none";

                animate(1);

                buttonR.addEventListener("click", function(){
                    animate(1);
                });
                
                buttonL.addEventListener("click", function(){
                    animate(-1);
                });

            })
            buttonL.classList.add("inactive");

        }, 250);

    });




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
  

