var song, analyzer;
var w;
var filter;

function preload(){
    song = loadSound('ss.ogg');
}

function setup(){
    createCanvas(0.75*windowWidth, 0.75*windowHeight,WEBGL);
    song.loop();
    fft = new p5.FFT(0.8,64);
    fft.setInput(song);
    w = width / 64;
}

function draw(){
    background(255);
    var spectrum = fft.analyze();
    translate(-width/2,0,-1000);
    rotateX(PI/6);
    //rotateY(frameCount*0.01);
    push();
        for(var j = 10; j > 1; j--){
            
            push();
                for(var i = 0; i < spectrum.length; i++){
                    var amp = spectrum[i];
                    var y = map(amp, 0, 255, 0, height);
                    push();
                        translate(2*i*w,0,0);
                        box(w, y, 20);
                    pop();   
                }
            pop();
            translate(0,0,-100);
        }
    pop();
}

function pause(){
    if(song.isPlaying()){
        song.pause();
        document.getElementById("ppToggle").innerHTML = "&#9654;";
    }else{
        song.play();
        document.getElementById("ppToggle").innerHTML = "&#9724;";
    }
}

function windowResized() {
  resizeCanvas(0.75*windowWidth, 0.75*windowHeight);
}