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
        translate(3*frameCount,cos(frameCount*0.02+50)*50,0);
        push();
        translate(-500,0,-100);
        rotateZ(-frameCount*0.1);
        var rms = analyzer.getLevel();
        sphere(20+rms*35);
        pop();
    pop();
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