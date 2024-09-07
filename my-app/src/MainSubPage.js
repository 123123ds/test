import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function MainSubPage() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000); // 배경색 설정
        mountRef.current.appendChild(renderer.domElement);

        const light = new THREE.AmbientLight(0xffffff, 0.5); // 부드러운 조명
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load('/models/model.glb', (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.position.set(0, 0, 0);

            // 모델이 로드된 후 카메라 위치 조정
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            camera.position.set(center.x, center.y, center.z + 5); // 모델을 잘 볼 수 있도록 카메라 위치 설정
            camera.lookAt(center); // 카메라가 모델을 바라보도록 설정
        }, undefined, (error) => {
            console.error('An error happened:', error);
        });

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div ref={mountRef} style={{ width: '100%', height: '100vh' }}></div>
    );
}

export default MainSubPage;
