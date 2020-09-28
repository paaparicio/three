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
        this.renderer   = new THREE.WebGLRenderer({antialias: true});
        this.axesHelper = new THREE.AxesHelper(5);

        this.camera.position.z = 2;

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.querySelector('#three').appendChild(this.renderer.domElement);
        this.scene.add(this.axesHelper);
    }

    animate(callback) {
        requestAnimationFrame(() => this.animate(callback));

        this.delta = this.clock.getDelta();

        callback();

        this.renderer.render(this.scene, this.camera);
    }
}
