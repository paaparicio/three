export const vertexShader = `
uniform float u_time;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vPosition = position;
    vUv       = uv;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition,1.0);
}
`;

export const fragmentShader = `
uniform sampler2D u_texture;

varying vec2 vUv;

void main() {
    vec3 color = texture2D(u_texture, vUv).rgb;
    
    gl_FragColor = vec4(color, 1.0);
}
`;
