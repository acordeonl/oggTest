var audioContext = new AudioContext();

function drawBuffer( width, height, context, buffer ) {
    var data = buffer.getChannelData( 0 );
    document.getElementById('duration').innerHTML = buffer.duration + " * " + audioContext.sampleRate + " = " + buffer.getChannelData(0).length  ; 
    var step = 0.5;
    var amp = height / 2;
    for(var i=0; i < width; i++){
        var min = 1.0;
        var max = -1.0;
        for (var j=0; j<step; j++) {
            var datum = data[(i*step)+j]; 
            if (datum < min)
                min = datum;
            if (datum > max)
                max = datum;
        }
        context.fillRect(i,(1+min)*amp,2,Math.max(1,(max-min)*amp));
    }
}

function initAudio() {
    var audioRequest = new XMLHttpRequest();
    audioRequest.open("GET", "sounds/67l.mp3", true);
    audioRequest.responseType = "arraybuffer";
    audioRequest.onload = function() {
        audioContext.decodeAudioData( audioRequest.response, 
            function(buffer) { 
                var canvas = document.getElementById("view1");
                drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffer ); 
            } );
    }
    audioRequest.send();
}

window.addEventListener('load', initAudio );
