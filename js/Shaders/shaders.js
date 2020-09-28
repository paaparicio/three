export const vertexShader = `
varying vec3 vPosition;
varying vec3 vColor;
varying vec2 vUv;

void main() {
    vPosition   = position;
    vUv         = uv;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition,1.0);
}
`;

export const fragmentShader = `
void main() {
    vec3 color = vec3(1., 1., 0.);
    
    gl_FragColor = vec4(color, 1.0);
}
`;
