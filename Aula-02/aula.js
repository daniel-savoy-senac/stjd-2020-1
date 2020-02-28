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
    frameUniform,
    frame = 0;


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


function compile(source, type){
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        let reason = gl.getShaderInfoLog(shader);
        console.error(`ERRO NA COMPILACAO DO SHADER: ${type}. ${reason}`);
        return null;
    }
    console.info(`SHADER COMPILADO COM SUCESSO: ${type}`);
    return shader;
}

function link(vertexShader, fragmentShader){
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error(`ERRO NA LINKAGEM DO PROGRAMA.`);
        return null;
    }
    console.info(`PROGRAMA LINKADO COM SUCESSO.`);
    return program;
}

function getData(){
    let points = [1.0, -1.0, 0.8, 0.8, -0.8, 0.8];
    let array = new Float32Array(points);
    let modelo = {"points": array};
    return modelo;
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
    vertexShader = compile(vertexShaderSource, gl.VERTEX_SHADER);
    fragmentShader = compile(fragmentShaderSource, gl.FRAGMENT_SHADER);

    // 5 - Link dos shaders
    shaderProgram = link(vertexShader, fragmentShader);
    gl.useProgram(shaderProgram);

    // 6 - Criar dados (modelo)
    data = getData();

    // 7 - Transferir dados para GPU
    positionAttr = gl.getAttribLocation(shaderProgram, "position");
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data.points, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttr);
    gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, false, 0, 0);

    // 7.5 - Localizar Uniform
    frameUniform = gl.getUniformLocation(shaderProgram, "frame");

    // 8 - Chamar o loop de redesenho
    render();
}

function render(){
    gl.uniform1f(frameUniform, frame);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //POINTS, LINES, LINE_STRIP, TRIANGLES
    gl.drawArrays(gl.TRIANGLES, 0, data.points.length/2);
    frame++;
    requestAnimationFrame(render);
}

