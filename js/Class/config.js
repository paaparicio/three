const THREE = window.THREE;

export default class Config {
    constructor() {
        this.init();

        this.clock = new THREE.Clock();
        this.speed = 2; //units a second
        this.delta = 0;
    }

    init() {
        this.scene      = new THREE.Scene();
        this.camera     = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer   = new THREE.WebGLRenderer({antialias: true, alpha: true});

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.camera.position.z = 2;

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.querySelector('#three').appendChild(this.renderer.domElement);
    }
    animate(callback) {
        requestAnimationFrame(() => this.animate(callback));

        this.delta = this.clock.getDelta();
        this.raycaster.setFromCamera(this.mouse, this.camera);

        callback();

        this.renderer.render(this.scene, this.camera);
    }
}
