window.addEventListener("mousemove", colorir);

function colorir(event){
    console.log(`X: ${event.x} Y:${event.y}`);
    var matiz = Math.random() * 360;
    // HUE SATURATION LIGHT
    // MATIZ SATURACAO LUMINOZIDADE
    document.body.style.backgroundColor = `hsl(${matiz}deg,100%,50%)`; 
}