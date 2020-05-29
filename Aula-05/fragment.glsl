precision highp float;

varying vec4 frag_pos;
varying vec4 frag_normal;

vec4 light = vec4(0.0, 0.0, 0.0, 1.0);

void main() {
    vec4 L = normalize(light - frag_pos);
    float lambert = max(0.0, dot(L,frag_normal)); 
    float ambient = 0.3;
    vec3 color = max(ambient, lambert) * vec3(1.0, 0.0, 0.0);
    
    gl_FragColor = vec4(color, 1.0);
}