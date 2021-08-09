import React from 'react';
import './App.css';

class Orbit extends React.Component {
  constructor() {
    super();
    
  }

  componentDidMount(){

    this.animate();
  }

  animate() {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext("2d"); 
    // context.filter = "brightness(50%)";

    //var imageObject = new Image();
    

    var step = 27, radius = 200, speed = 0.08;

    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var imageObjects = [];
    for (let i = 0; i < 79; i++) {
      const img = new Image();
      var w = randomInteger(75,100);
      var h = randomInteger(75,100);
      // img.src = `/images/pic${i}.jpeg`;
      img.src = `https://picsum.photos/seed/${i}/${w}/${h}`
      imageObjects.push({
        y:radius + -radius * Math.cos((360 / 79 / 180) * i * Math.PI),
        x:radius + radius * Math.sin((360 / 79 / 180) * i * Math.PI),
        step:i*150,
        image:img,
        width:w,
        height:h
      });
      
    }
    var offset = 0;
    var stepOffset = 0;
    function spin(timestamp) {
        //var time = new Date();
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        if(step > 30 && step < 35){
          stepOffset += 0.01;
          offset += 1;
        } else {
          if(offset > 0){
            offset -= 1;
            stepOffset -= 0.01;
          } else {
            offset = 0;
            stepOffset = 0;
          }
          if(step > 30){
            step = 0;
          }
        }

        for (let i = 0; i < imageObjects.length; i++) {
          const imageObject = imageObjects[i];
          try {
            context.drawImage(imageObject.image, 
              (window.innerWidth/2-100) + (radius+offset) * Math.cos((speed) * imageObject.step),
              (window.innerHeight/2-50) + (radius+offset) * Math.sin((speed) * imageObject.step),imageObject.width,imageObject.height);
            imageObject.step += 0.04 + stepOffset;
          } catch (error) {
            console.log(error)
          }
        }
        step += 0.1;
        //console.log(step);
        requestAnimationFrame(spin);
    }

    // imageObject.onload = function() {
    //     y.drawImage(imageObject, 100, 200);
    //     setInterval(spin, 50); // 20 fps
    // };

    //spin();

    // setInterval(spin, 30);
    requestAnimationFrame(spin);

    //imageObject.src = "https://picsum.photos/seed/0/100/75";
  }


  moveCursorText(e) {

    var target = document.getElementById("cursor");
    var offset = target.parentElement.getBoundingClientRect();
    target.style.top = (e.clientY - offset.top) + 'px';
    target.style.left = (e.clientX - offset.left) + 'px';
  }

  zoomCursor(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d"); 
    context.scale(2,2);
  }

  render() {
    return (
      <div id="wrapper">
        <canvas id="canvas" height="500" width="700"></canvas>
        <div className="front-title" onMouseMove={this.moveCursorText} onClick={this.zoomCursor}>
          <p id="cursor">Enter Showcase</p>
          <div className="right-title">
            <h1>
              <span>Hello World</span>
            </h1>
          </div>
          <div className="left-title">
            <h3>
              <span>Showcase of 2021</span>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Orbit/>
    </div>
    
  );
}

export default App;
