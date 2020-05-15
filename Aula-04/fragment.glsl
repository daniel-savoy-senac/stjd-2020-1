precision highp float;

varying vec4 frag_pos;

vec4 light = vec4(3.0, 1.5, 0.0, 1.0);

void main() {
    float d = 1.0 - abs(distance(light, frag_pos)) / 4.0;
    gl_FragColor = vec4(d * 1.0, 0.0, 0.0, 1.0);
}