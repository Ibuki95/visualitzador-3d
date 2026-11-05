import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 1. Escena 3D
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdadada); // Fons gris clar

// 2. Càmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15); // Ajusta la posició inicial (x, y, z)

// 3. Renderitzador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Netejar el contingut per defecte de Vite i afegir el canvas de Three.js
document.querySelector('#app').innerHTML = '';
document.querySelector('#app').appendChild(renderer.domElement);

// 4. Controls de rotació amb el ratolí (OrbitControls)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Fa que el moviment sigui més suau

// 5. Il·luminació
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Llum base
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// 6. Carregador de models (GLTFLoader en lloc de OBJLoader)
const loader = new GLTFLoader();
loader.load(
  '/maple_tree.glb', 
  function (gltf) {
    const tree = gltf.scene;
    scene.add(tree);
  },
  undefined,
  function (error) {
    console.error('Error carregant el model 3D:', error);
  }
);

// Bucle d'animació necessari per renderitzar contínuament
function animate() {
  requestAnimationFrame(animate);
  
  controls.update(); // Necessari perquè funcioni l'enableDamping dels controls
  
  renderer.render(scene, camera);
}
animate();

// Adaptar la mida del canvas si l'usuari redimensiona la finestra del navegador
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});