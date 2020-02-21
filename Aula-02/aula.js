window.addEventListener("load", main);

let canvas,
    gl,
    vertexShaderSource,
    fragmentShaderSource,
    vertexShader,
    fragmentShader,
    shaderProgram,
    data,
    positionAttr,
    positionBuffer,
    frame;


function createCanvas(){
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", 800);
    canvas.setAttribute("height", 600);
    canvas.style.backgroundColor = "#ccc";
    document.body.appendChild(canvas);
}

function loadGL(){
    gl = canvas.getContext("webgl");
    gl.viewport(0,0,canvas.width, canvas.height);
}

async function main(){

    // 1 - Carregar a área de desenho (canvas)
    createCanvas();

    // 2 - Carregar a API do WebGL (contexto)
    loadGL();

    // 3 - Carregar os arquivos de shader (.glsl)
    vertexShaderSource = await fetch("vertex.glsl").then(r => r.text());
    fragmentShaderSource = await fetch("fragment.glsl").then(r => r.text());

    // 4 - Compilar os shaders

    // 5 - Link dos shaders

    // 6 - Criar dados (modelo)

    // 7 - Transferir dados para GPU

    // 8 - Chamar o loop de redesenho

}

