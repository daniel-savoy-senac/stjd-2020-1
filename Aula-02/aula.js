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

async function main(){

    // 1 - Carregar a área de desenho (canvas)
    createCanvas();

    // 2 - Carregar a API do WebGL (contexto)

    // 3 - Carregar os arquivos de shader (.glsl)

    // 4 - Compilar os shaders

    // 5 - Link dos shaders

    // 6 - Criar dados (modelo)

    // 7 - Transferir dados para GPU

    // 8 - Chamar o loop de redesenho

}

