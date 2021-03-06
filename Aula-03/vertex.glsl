precision highp float;

uniform float frame;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

attribute vec3 position;

varying vec4 color;

void main() {   
    gl_Position = projection * view * model * vec4(position, 1.0);

    color = vec4(position, 1.0);

}