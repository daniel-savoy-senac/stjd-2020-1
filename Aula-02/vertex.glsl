precision highp float;

attribute vec2 position;

varying vec2 color;

void main() {
    color = position;
    gl_PointSize = 5.0;
    gl_Position = vec4(position, 0.0, 1.0);
}