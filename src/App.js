import React from 'react';
import './App.css';
//import anime from 'animejs/lib/anime.es.js';
// import ReactDOM from 'react-dom';

import Konva from 'konva';


class Orbit extends React.Component {
  constructor() {
    super();
    this.state = {imgs: []};
  }

  componentDidMount(){
    // let imgs = []
    // for (let i = 0; i < 15; i++) {
    //   const top = 200 + -200 * Math.cos((360 / 15 / 180) * (i + 0) * Math.PI);
    //   const left = 200 + 200 * (Math.sin((360 / 15 / 180) * (i + 0) * Math.PI));
    //   imgs.push(<img className="gambar" data-top={top} data-left={left} style={{top:top,left:left}} key={i} src={`https://picsum.photos/seed/${i}/100/75`} alt="gambar"/>)
      
    // }

    // this.setState({imgs: imgs});
    //this.animate();
    // this.animate2();
    this.animate3();
    // this.animate4();
    //this.animateKonva();
  }

  animate4(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    var dd = 1;
    var angle = 0;
    var cx = 200;
    var cy = 75;
    var radius = 200;

    // ctx.fillStyle = "skyblue";
    // ctx.strokeStyle = "lightgray";

    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var imageObjects = [];
    for (let i = 0; i < 79; i++) {
      const img = new Image();
      var w = randomInteger(75,100);
      var h = randomInteger(75,100);
      img.src = `https://picsum.photos/seed/${i}/${w}/${h}`;
      imageObjects.push({
        y:radius + -radius * Math.cos((360 / 79 / 180) * i * Math.PI),
        x:radius + radius * Math.sin((360 / 79 / 180) * i * Math.PI),
        step:Math.acos(1-Math.pow(dd/radius,2)/2)+i,
        image:img,
        w:w,
        h:h
      });
      
    }

    function draw(x, y) {
        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.beginPath();
        ctx.beginPath();
        ctx.rect(x - 50 / 2, y - 30 / 2, 50, 30)
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    };

    var fps = 120;

    var requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / fps);
        };
    })();


    function anim() {
        setTimeout(function () {
            
            requestAnimFrame(anim);

            // increase the angle of rotation
            //angle += Math.acos(1-Math.pow(dd/radius,2)/2);

            // calculate the new ball.x / ball.y
            
            // draw
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < imageObjects.length; i++) {
              const imageObject = imageObjects[i];
              var newX = cx + radius * Math.cos(imageObject.step);
            var newY = cy + radius * Math.sin(imageObject.step);
              ctx.drawImage(imageObject.image, 
                newX,
                newY);
              //y.drawImage(imageObject.image, imageObject.x, imageObject.y);
              imageObject.step += Math.acos(1-Math.pow(dd/radius,2)/2);
            }

            // draw the centerpoint 
            // ctx.beginPath();
            // ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
            // ctx.closePath();
            // ctx.stroke();

        }, 1000 / fps);
    }
    anim();
  }

  animateKonva(){
    var width = window.innerWidth;
      var height = window.innerHeight;


      var step = 0, radius = 200, speed = 0.08;

      function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      var imageObjects = [];
      for (let i = 0; i < 79; i++) {
        const img = new Image();
        var w = randomInteger(75,100);
        var h = randomInteger(75,100);
        img.src = `https://picsum.photos/seed/${i}/${w}/${h}`;
        imageObjects.push({
          y:radius + -radius * Math.cos((360 / 79 / 180) * i * Math.PI),
          x:radius + radius * Math.sin((360 / 79 / 180) * i * Math.PI),
          step:i*150,
          image:img,
          w:w,
          h:h
        });
        
      }
      var offset = 0;
      var stepOffset = 0;

      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
        draggable:true
      });

      var layer = new Konva.Layer();
      var konvaImgs = [];

      for (let x = 0; x < imageObjects.length; x++) {
        const io = imageObjects[x];
        var img = new Konva.Image({
          x: io.x,
          y: io.y,
          image: io.image,
          width: io.w,
          height: io.h,
        });
  
        // add the shape to the layer
        layer.add(img);
        konvaImgs.push(img);
      }

      // var hexagon = new Konva.RegularPolygon({
      //   x: stage.width() / 2,
      //   y: stage.height() / 2,
      //   sides: 6,
      //   radius: 20,
      //   fill: 'red',
      //   stroke: 'black',
      //   strokeWidth: 4,
      // });

      //layer.add(hexagon);
      stage.add(layer);

      var amplitude = 100;
      var period = 2000;
      // in ms
      var centerX = stage.width() / 2;

      

      var anim = new Konva.Animation(function (frame) {
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
          if(step > 10){
            step = 0;
          }
        }

        for (let i = 0; i < imageObjects.length; i++) {
          const imageObject = imageObjects[i];
          // konvaImgs[i].x(
          //   amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerX
          // );
          //console.log((frame.timeDiff / 1000));
          
          
          var t = (frame.time/2000+imageObject.step);
          konvaImgs[i].x((window.innerWidth/2-100) + (radius+offset) * Math.cos((speed) * t));
          konvaImgs[i].y((window.innerHeight/2-100) + (radius+offset) * Math.sin((speed) * t));
          imageObject.step += 0.04 + stepOffset;
        }

        
      }, layer);

      anim.start();
  }

  animate3() {
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
      var w = 102.4;
      var h = 57.6;
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
          context.drawImage(imageObject.image, 
            (window.innerWidth/2-100) + (radius+offset) * Math.cos((speed) * imageObject.step),
            (window.innerHeight/2-50) + (radius+offset) * Math.sin((speed) * imageObject.step),imageObject.width,imageObject.height);
          //y.drawImage(imageObject.image, imageObject.x, imageObject.y);
          imageObject.step += 0.04 + stepOffset;
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

  animate2() {
    var sun = new Image();
    var moon = new Image();
    var earth = new Image();
    function init() {
      sun.src = 'https://picsum.photos/seed/0/100/75';
      moon.src = 'https://picsum.photos/seed/1/100/75';
      earth.src = 'https://picsum.photos/seed/2/100/75';
      window.requestAnimationFrame(draw);
    }

    function draw() {
      var duration = 20; // seconds
      var gridSize = 150; // pixels
    
      var start = null;
      var ctx = document.getElementById('canvas').getContext('2d');

      ctx.globalCompositeOperation = 'destination-over';
      ctx.clearRect(0, 0, window.screen.width, window.screen.height); // clear canvas

      // ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      // ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
      ctx.save();
      //ctx.translate(150, 150);

      var time = new Date();

      for (let i = 0; i < 15; i++) {
        //console.log(time.getSeconds());
        const img = new Image();
        img.src = `https://picsum.photos/seed/${i}/100/75`;
        ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
        var x = ((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds();
        ctx.translate(x*10, 0);
        ctx.drawImage(img, 0, 0, 100, 75);
      }

      ctx.restore();

      // ctx.drawImage(sun, 0, 0, 300, 300);

      window.requestAnimationFrame(draw);
    }

    init();
  }

  animate(){
    (function() {

      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      
      
      var field = document.getElementById("wrapper");
      var images = document.getElementsByClassName("gambar");


      var duration = 20; // seconds
      var gridSize = 150; // pixels
    
      var start = null;
      var stretchFactor;
    
      function step(timestamp)
      { 

        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          var maxX = field.clientWidth - image.offsetWidth;
          var maxY = field.clientHeight - image.offsetHeight;

          var progress, x, y;
          if(start === null) {
            start = timestamp;
            stretchFactor = 1 + (Math.random() * 3);
          }
      
          progress = (timestamp - start) / duration / 1000; // percent
      
          x = Math.sin(progress * 2 * Math.PI); // x = ƒ(t)
          y = Math.cos(progress * 2 * Math.PI); // y = ƒ(t)
          var tx =  maxX/2 + ((gridSize+i) * x);
          var ty = maxY/2 + ((gridSize+i) * y);
      
          image.style.transform = `translate(${tx}px,${ty}px)`;
        
          
          
        }

        if(progress >= 1) start = null; // reset to start position

          requestAnimationFrame(step);
        
        
      }
    
      requestAnimationFrame(step);
    
    })();
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
        {/* {this.state.imgs} */}
        <canvas id="canvas" height="500" width="700"></canvas>
        {/* <div id="container"></div> */}
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
