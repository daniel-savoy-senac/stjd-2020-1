precision highp float;

uniform float frame;

attribute vec2 position;

varying vec2 color;

void main() {
    color = position;
    gl_PointSize = 5.0;
    float x = position.x + frame * 0.01;
    gl_Position = vec4(x, position.y, 0.0, 1.0);
}