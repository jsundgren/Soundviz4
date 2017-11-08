var song, analyzer;
var w;
var filter;

function preload(){
    song = loadSound('ss.ogg');
}

function setup(){
    createCanvas(0.75*windowWidth, 0.75*windowHeight,WEBGL);
    song.loop();
    fft = new p5.FFT(0.7);
    fft.setInput(song);
    analyzer = new p5.Amplitude();
    analyzer.setInput(song);
    w = width / 64;
}

function draw(){
    background(0);
    var spectrum = fft.analyze();
    translate(95,0,-300);
    rotateY(PI/2);
    translate(-3*frameCount,sin(frameCount*0.02+50)*150,0);
    push();
        for(var j = 3; j > 1; j--){
                for(var i = 0; i < spectrum.length; i++){
                    var amp = spectrum[i];
                    var y = map(amp, 0, 255, 0, height);
                    push();
                        translate(2*i*w,0,0);
                        box(w, y, 20);
                    pop();
                }
            translate(0,0,-200);
        }
    pop();
    var rms = analyzer.getLevel();
    rotateX(frameCount*0.01);
    translate(3*frameCount, 0, 400);
    sphere(20+rms*30);
        
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