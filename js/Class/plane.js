import Config from "./config.js";
import {fragmentShader, vertexShader} from "../Shaders/shaders.js";

const THREE        = window.THREE;
const TweenMax     = window.TweenMax;
const TimelineLite = window.TimelineLite;
const Sine         = window.Sine;

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

export default class Images extends Config {
    constructor(x, y, z) {
        super();

        this.loadTexture();
        this.meshPosition = new THREE.Vector3(x, y, z);
        this.eventParams  = {activate: false, target: false};
    }

    loadTexture() {
        const loader = new THREE.TextureLoader();
        loader.load('../../assets/images/image.jpg', texture => {
            this.texture = texture;

            this.draw();
            this.animate(() => this.update(this));

            window.addEventListener('mousemove', event => this.onMouseMove(event))
            window.addEventListener('click', () => this.onMouseClick())
        })
    }
    draw() {
        this.geometry  = new THREE.PlaneBufferGeometry(1, 1, 10, 10);
        this.material  = new THREE.ShaderMaterial(this.params);
        this.mesh      = new THREE.Mesh(this.geometry, this.material);
        let imageRatio = this.texture.image.naturalWidth / this.texture.image.naturalHeight;
        this.scale     = new THREE.Vector3(imageRatio, 1, 1);

        this.mesh.name = "image";
        this.uuid      = this.mesh.uuid;

        this.mesh.scale.copy(this.scale);
        this.mesh.position.copy(this.meshPosition);
        this.initPosition = this.mesh.position.clone()

        this.scene.add(this.mesh);
    }

    get params() {
        return {
            uniforms: {
                u_texture: {value: this.texture},
                u_time: {value: 1},
                u_scale: {value: 0},
                u_deformation: {value: 0.5},
                u_velocity: {value: new THREE.Vector2(0.0, 0.0)}
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            wireframe: false,
            transparent: true
        };
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        let intersects = this.raycaster.intersectObjects(this.scene.children);

        if(intersects.length > 0 && intersects[0].object.uuid === this.uuid) {
            this.eventParams.target = true
            !this.eventParams.activate && this.onMouseUpdate();
        } else {
            this.eventParams.target = false;
        }
    }
    onMouseUpdate() {
        let perimeter = {x: .5, y: .25};
        let x = this.mouse.x.map(-1, 1, this.initPosition.x - perimeter.x, this.initPosition.x + perimeter.x);
        let y = this.mouse.y.map(-1, 1, this.initPosition.y - perimeter.y, this.initPosition.y + perimeter.y);

        this.position = new THREE.Vector3(x, y, 0);

        TweenMax.to(this.mesh.position, .5, {x, y, ease: Sine.easeOut, onUpdate: () => this.updateMeshPosition()})
    }
    updateMeshPosition() {
        const velocity = this.mesh.position
            .clone()
            .sub(this.position)
            .multiplyScalar(-.25);

        this.material.uniforms.u_velocity.value = velocity;
    }

    onMouseClick() {
        const time = .5;

        if(this.eventParams.target) {
            this.eventParams.activate = !this.eventParams.activate;

            this.eventParams.activate ? this.updateMeshScale(time, 0.5, 1, 0) : this.updateMeshScale(time, this.initPosition.x, 0, 1);
        }
    }
    updateMeshScale(time, x, scale, def) {
        const ease                     = Sine.easeOut;
        const {u_scale, u_deformation} = this.material.uniforms;
        const tl                       = new TimelineLite();

        tl
            .to(this.mesh.position, time, {x: x, y: 0, ease})
            .to(u_scale, time, {value: scale, ease}, `-=${time}`)
            .to(u_deformation, time / 2, {value: def, ease}, `-=${time}`)
            .to(u_deformation, time / 2, {value: .5, ease}, `-=${time / 2}`)
    }

    update() {}
}
