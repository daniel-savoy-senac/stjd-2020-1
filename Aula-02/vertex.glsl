precision highp float;

uniform float frame;

attribute vec2 position;

varying vec2 color;

void main() {
    gl_PointSize = 5.0;
    float x = position.x * sin(frame*0.01);
    float y = position.y * 0.5;
    color = vec2(x, x);
    gl_Position = vec4(position, 0.0, 1.0);
}