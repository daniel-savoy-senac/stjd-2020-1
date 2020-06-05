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


function animate() {
    requestAnimationFrame( animate );
    //cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

animate();