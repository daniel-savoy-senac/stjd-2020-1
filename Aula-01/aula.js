window.addEventListener("mousemove", colorir);

function colorir(event){
    console.log(`X: ${event.x} Y:${event.y}`);
    // var matiz = Math.random() * 360;

    var w = window.innerWidth;
    var x = event.x;
    var hue = x / w * 360;

    // HUE SATURATION LIGHT
    // MATIZ SATURACAO LUMINOZIDADE
    document.body.style.backgroundColor = `hsl(${hue}deg,100%,50%)`; 
}