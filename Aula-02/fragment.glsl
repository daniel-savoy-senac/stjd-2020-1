precision highp float;

varying vec2 color;

void main() {
    float r = (color.r + 1.0) / 2.0;
    float g = (color.g + 1.0) / 2.0;
    gl_FragColor = vec4(r, g , 0.0, 1.0);
}