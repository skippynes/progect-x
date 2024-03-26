import * as THREE from 'three'; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'lil-gui'; 

import './style.css'; 

var scene = new THREE.Scene();


const canvas = document.querySelector('canvas'); 

 
//scene.background = new THREE.Color(0x000000); 

const gui = new dat.GUI();

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
const geometry1 = new THREE.SphereGeometry( 1, 64, 64);
const material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

gui.addColor(material, 'color');
gui.addColor(material1, 'color');


scene.add( sphere );
scene.add( axesHelper ); 

scene.position.z = 1;
camera.position.z = 25;

const q = 1.6e-19; 
let m = 9.1e-31; 
let v = 3e6;
let b = 0.001;
let cos = 0.86;
let sin = 0.5;

function render() { // обновление сцены и камеры
        requestAnimationFrame( render );
        renderer.setClearColor(0x000000, 0); 
        
        
        controls.update(); 
  renderer.render(scene, camera);
}

const rad = (((m * v*sin)/q*b)*1e9); 
const h = (((2*3,14*m*v*cos)/q*b)*1e7); 

function movement() { // движение частицы во всех координатных осях и траектория ее движения
      requestAnimationFrame( movement ); 
      const sphere1 = new THREE.Mesh( geometry1, material1 );
      scene.add( sphere1 );
  var elapsedTime = clock.getElapsedTime(); 
  sphere.position.x = rad*Math.cos(elapsedTime); 
  sphere.position.y = h*elapsedTime; 
  sphere.position.z = rad*Math.sin(elapsedTime);
  sphere1.position.x = rad*Math.cos(elapsedTime); 
  sphere1.position.y = h*elapsedTime; 
  sphere1.position.z = rad*Math.sin(elapsedTime);

} 

setTimeout(movement, 2000);
render(); 

window.addEventListener('resize', () => { // растигивание окна браузера под все форматы
      sizes.width = window.innerWidth; 
      sizes.height = window.innerHeight; 
      
      camera.aspect = sizes.width / sizes.height; 
      camera.updateWorldMatrix(); 

      renderer.setSize( sizes.width, sizes.height );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
      renderer.render(scene, camera);
}); 

