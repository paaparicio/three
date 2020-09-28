import Config from "./config.js";
import {fragmentShader, vertexShader} from "../Shaders/shaders.js";

const THREE        = window.THREE;

export default class Images extends Config {
    constructor() {
        super();

        this.loadTexture();
    }

    loadTexture() {
        const loader = new THREE.TextureLoader();
        loader.load('../../assets/images/image.jpg', texture => {
            this.texture = texture;

            this.draw();
            this.animate(() => this.update(this));
        })
    }

    draw() {
        this.geometry  = new THREE.PlaneBufferGeometry(1, 1, 10, 10);
        this.material  = new THREE.ShaderMaterial(this.params);
        this.mesh      = new THREE.Mesh(this.geometry, this.material);
        let imageRatio = this.texture.image.naturalWidth / this.texture.image.naturalHeight;
        this.scale     = new THREE.Vector3(imageRatio, 1, 1);

        this.mesh.scale.copy(this.scale);

        this.scene.add(this.mesh);
    }

    get params() {
        return {
            uniforms: {
                u_texture: {value: this.texture},
                u_time: {value: 0}
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            wireframe: false,
            transparent: true
        };
    }

    update() {
        this.material.uniforms.u_time.value += this.speed * this.delta;
    }
}
