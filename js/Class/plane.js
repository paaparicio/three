import Config from "./config.js";
import {fragmentShader, vertexShader} from "../Shaders/shaders.js";

const THREE = window.THREE;

export default class Images extends Config {
    constructor() {
        super();
        super.animate(() => this.update());

        this.draw();
    }

    draw() {
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10);
        this.material = new THREE.ShaderMaterial(this.params);
        this.mesh     = new THREE.Mesh(this.geometry, this.material);

        console.log();

        this.scene.add(this.mesh);
    }

    get params() {
        return {
            uniforms: {},
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            wireframe: true,
            transparent: true
        };
    }

    update() {

    }
}
