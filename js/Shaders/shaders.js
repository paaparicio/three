export const vertexShader = `
uniform float u_time;
uniform float u_scale;
uniform float u_deformation;
uniform vec2 u_velocity;

varying vec3 vPosition;
varying vec2 vUv;

 #define M_PI 3.1415926535897932384626433832795

void main() {
    vPosition = position;
    vUv       = uv;
    
    float d = length(uv.xy - .5);
    float f = mix(-d, d, u_deformation);
    
    vPosition.x = position.x + (sin(uv.y * M_PI) * u_velocity.x);
    vPosition.y = position.y + (sin(uv.x * M_PI) * u_velocity.y);
    vPosition.z = f + u_scale;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition,1.0);
}
`;

export const fragmentShader = `
uniform sampler2D u_texture;
uniform vec2 u_velocity;

varying vec2 vUv;

void main() {
    float r = texture2D(u_texture, vUv).r;
    float b = texture2D(u_texture, vUv + u_velocity).b;
    float g = texture2D(u_texture, vUv).g;
    vec3 color = vec3(r, g, b);
    
    gl_FragColor = vec4(color, 1.0);
}
`;
