import * as THREE from 'three'; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css'; 

var scene = new THREE.Scene();


const canvas = document.querySelector('canvas'); 

 
//scene.background = new THREE.Color(0x000000); 


var clock = new THREE.Clock(); 

var sizes = {
      width: window.innerWidth, 
      height: window.innerHeight,
}

var camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 1, 1000 );
var renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 


renderer.setSize( sizes.width, sizes.height );
document.body.appendChild( renderer.domElement );
var axesHelper = new THREE.AxesHelper(100); 
var geometry = new THREE.SphereGeometry( 1, 32, 32);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var sphere = new THREE.Mesh( geometry, material );

scene.add( sphere );
scene.add( axesHelper ); 

scene.position.z = 1;
camera.position.z = 25;



const MAGNETICFIELD = { 
      B: 0.001, 
}; 

const ELECTRON = {
      q: -1.6 * 10 ** -19,
      m: 9.1 * 10 ** -31, 
      R: 10,
      r: 3*3
}; 

            
function render() {
        requestAnimationFrame( render );
        renderer.setClearColor(0x000000, 0); 
        
        
        controls.update(); 
  renderer.render(scene, camera);
}

function movement() {
      requestAnimationFrame( movement ); 
  var elapsedTime = clock.getElapsedTime(); 
  sphere.position.x = 40*Math.cos(elapsedTime); 
  sphere.position.y = 10; 
  sphere.position.z = 40*Math.sin(elapsedTime);

} 


movement(); 
render(); 

window.addEventListener('resize', () => {
      sizes.width = window.innerWidth; 
      sizes.height = window.innerHeight; 
      
      camera.aspect = sizes.width / sizes.height; 
      camera.updateWorldMatrix(); 

      renderer.setSize( sizes.width, sizes.height );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
      renderer.render(scene, camera);
}); 

