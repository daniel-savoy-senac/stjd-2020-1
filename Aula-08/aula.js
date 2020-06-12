var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 3;
camera.position.y = 3;
camera.position.x = -3;
camera.lookAt(0,0,0);

var geometry = new THREE.TorusGeometry( 2, .5, 16, 100 );
var material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
var cube = new THREE.Mesh( geometry, material );

var light = new THREE.PointLight( 0x0000ff, 1, 100 );
light.position.set( -5, 10, 5 );
scene.add( light );

var light2 = new THREE.PointLight( 0xffcc00, 1, 100 );
light2.position.set( 5, 10, 5 );
scene.add( light2 );

scene.add( cube );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



// https://github.com/mrdoob/three.js/tree/dev/examples/js/loaders
var loader = new THREE.OBJLoader();

var tree;

loader.load("tree.obj", criaArvore);

function criaArvore (obj) {
    // Add the loaded object to the scene
    tree = obj;
    tree.scale.x = 0.01;
    tree.scale.y = 0.01;
    tree.scale.z = 0.01;
    scene.add( tree );
};

var loader2 = new THREE.TextureLoader();

loader2.load('texture.jpg', carregaTextura);

function carregaTextura( texture ) {
    // in this example we create the material when the texture is loaded
    var material2 = new THREE.MeshPhongMaterial( {
        map: texture
     } );
    tree.children[0].material = material2;
};

function animate() {
    requestAnimationFrame( animate );
    //cube.rotation.x += 0.01;
    if(tree) tree.rotation.y += 0.01;
	renderer.render( scene, camera );
}

animate();