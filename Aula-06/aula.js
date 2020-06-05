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
    normalAttr,
    normalBuffer,
    frameUniform,
    modelUniform,
    viewUniform,
    projectionUniform,
    model,
    model2,
    view,
    projection,
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
    gl.enable(gl.DEPTH_TEST);
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
    //normais
    let topo = [0, 1, 0];
    let baixo = [0, -1, 0];
    let direita = [1, 0, 0];
    let esquerda = [-1, 0, 0];
    let frente = [0, 0, -1];
    let fundo = [0, 0, 1];


    // pontos
    let a = [-.5, .5 ,.5];
    let b = [.5, .5, .5 ];
    let c = [.5, .5, -.5];
    let d = [-.5, .5, -.5];
    let e = [-.5, -.5, -.5];
    let f = [.5, -.5, -.5];
    let g = [.5, -.5, .5];
    let h = [-.5, -.5, .5];
    
    let normals = [
        // TOPO
        ...topo, ...topo, ...topo,
        ...topo, ...topo, ...topo,

        // FRENTE
        ...frente, ...frente, ...frente,
        ...frente, ...frente, ...frente,
        
        // BAIXO
        ...baixo, ...baixo, ...baixo,
        ...baixo, ...baixo, ...baixo,
        
        // FUNDO
        ...fundo, ...fundo, ...fundo,
        ...fundo, ...fundo, ...fundo,
        
        // ESQUERDA
        ...esquerda, ...esquerda, ...esquerda,
        ...esquerda, ...esquerda, ...esquerda,
        
        // DIREITA
        ...direita, ...direita, ...direita,
        ...direita, ...direita, ...direita
    ];


    let points = [
        // TOPO
        ...a, ...d, ...b,
        ...c, ...b, ...d,

        // FRENTE
        ...e, ...c, ...d,
        ...f, ...c, ...e,
        
        // BAIXO
        ...g, ...f, ...e,
        ...h, ...e, ...g,
        
        // FUNDO
        ...a, ...b, ...h,
        ...g, ...h, ...b,
        
        // ESQUERDA
        ...h, ...a, ...d,
        ...e, ...d, ...h,
        
        // DIREITA
        ...g, ...f, ...b,
        ...c, ...b, ...f
    ];
    let modelo = {
        "points": new Float32Array(points), 
        "normals": new Float32Array(normals) 
    };
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
    gl.vertexAttribPointer(positionAttr, 3, gl.FLOAT, false, 0, 0);

    normalAttr = gl.getAttribLocation(shaderProgram, "normal");
    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data.normals, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalAttr);
    gl.vertexAttribPointer(normalAttr, 3, gl.FLOAT, false, 0, 0);

    // 7.5 - Localizar Uniform
    frameUniform = gl.getUniformLocation(shaderProgram, "frame");
    modelUniform =  gl.getUniformLocation(shaderProgram, "model");
    viewUniform =  gl.getUniformLocation(shaderProgram, "view");
    projectionUniform =  gl.getUniformLocation(shaderProgram, "projection");

    model = mat4.identity([]);
    model2 = mat4.fromTranslation([],[3,0,0]);

    view = mat4.lookAt([],
        [3, 3, 5], //posicao do observador
        [0, 0, 0], //para onde está olhando
        [0, 1, 0] // direcao de cima (orientação da camera)
    );

    projection = mat4.perspective([],
       Math.PI/3, // fovy : angulo de abertura vertical (60 graus)
       800/600, //aspecto: proporcao da tela
       0.1, // near: ponto mais próximo que posso ver
       1000 // far: ponto mais distante 
    )

    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/uniformMatrix
    gl.uniformMatrix4fv(modelUniform, gl.FALSE, new Float32Array(model));
    gl.uniformMatrix4fv(viewUniform, gl.FALSE, new Float32Array(view));
    gl.uniformMatrix4fv(projectionUniform, gl.FALSE, new Float32Array(projection));

    // 8 - Chamar o loop de redesenho
    render();
}

function render(){
    gl.uniform1f(frameUniform, frame);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //POINTS, LINES, LINE_STRIP, TRIANGLES
    // MODIFICAR MODEL 1 COM ROTAÇÃO
    model = mat4.multiply([], mat4.fromRotation([], Math.PI/60, [0,1,0]), model);
    // model = r * model;
    gl.uniformMatrix4fv(modelUniform, gl.FALSE, new Float32Array(model));
    gl.drawArrays(gl.TRIANGLES, 0, data.points.length/3);
    // MODIFICAR MODEL 2 COM ROTAÇÃO
    model2 = mat4.multiply([], mat4.fromRotation([], Math.PI/360, [0,1,0]), model2);
    gl.uniformMatrix4fv(modelUniform, gl.FALSE, new Float32Array(model2));
    gl.drawArrays(gl.TRIANGLES, 0, data.points.length/3);
    frame++;
    requestAnimationFrame(render);
}

function changeCamera(evt){
    let x = (evt.x - 400) / 160;
    let y = (evt.y - 300) / 120;
    view = mat4.lookAt([],
        [x+3, y+3, 5], //posicao do observador
        [0, 0, 0], //para onde está olhando
        [0, 1, 0] // direcao de cima (orientação da camera)
    );
    gl.uniformMatrix4fv(viewUniform, gl.FALSE, new Float32Array(view));
}

window.addEventListener("mousemove", changeCamera);

