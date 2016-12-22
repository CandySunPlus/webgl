import * as THREE from 'three';

class ThreeApp {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.Renderer;
    private light: THREE.Light;
    public constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initObject();
    }

    public run = () => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.run);
    }

    private initScene() {
        this.scene = new THREE.Scene();
    }

    private initCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 1000;
        this.camera.position.z = 0;
        this.camera.up.x = 0;
        this.camera.up.y = 0;
        this.camera.up.z = -1;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    private initLight() {
        this.light = new THREE.DirectionalLight(0xFF0000, 1.0);
        this.light.position.set(100, 100, 200);
        this.scene.add(this.light);
    }

    private initObject() {
        let geometry = new THREE.Geometry();
        let material = new THREE.LineBasicMaterial({ color: 0xFFFFFF, opacity: 1 });
        let p1 = new THREE.Vector3(-500, 0, 0);
        let p2 = new THREE.Vector3(500, 0, 0);
        let line;
        geometry.vertices.push(p1, p2);
        for (let i = 0; i <= 20; i++) {
            line = new THREE.Line(geometry, material);
            line.position.z = ( i * 50 ) - 500;
            this.scene.add(line);
            line = new THREE.Line(geometry, material);
            line.position.x = ( i * 50 ) - 500;
            line.rotation.y = 90 * Math.PI / 180;
            this.scene.add(line);
        }
    }
}

const app = new ThreeApp();
app.run();
