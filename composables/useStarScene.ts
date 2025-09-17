import { SceneManager } from '@/libs/three/SceneManager';

const sceneManager = shallowRef<SceneManager | null>(null);

export function useThreeScene() {
    return sceneManager;
}

export function initThreeScene(canvas: HTMLCanvasElement) {
    if (!sceneManager.value) {
        sceneManager.value = new SceneManager(canvas);
        sceneManager.value.animate();
    }
}

export function destroyThreeScene() {
    sceneManager.value?.destroy();
    sceneManager.value = null;
}
