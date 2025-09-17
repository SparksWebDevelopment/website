import * as THREE from 'three';

export class SceneManager {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particleSystem: THREE.Points;

    constructor(canvas: HTMLCanvasElement) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20;

        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.particleSystem = this.createParticles();
        this.scene.add(this.particleSystem);

        window.addEventListener('resize', this.onResize);
    }

    private createParticles(): THREE.Points {
        const count = 10000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.02,
            transparent: true,
            opacity: 0.8,
        });

        return new THREE.Points(geometry, material);
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.particleSystem.rotation.y += 0.0005;
        this.renderer.render(this.scene, this.camera);
    };

    onResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    destroy() {
        window.removeEventListener('resize', this.onResize);
        this.renderer.dispose();
    }
}
