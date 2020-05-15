precision highp float;

uniform float frame;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

attribute vec3 position;

varying vec4 frag_pos;

void main() { 
    vec4 vertex_pos = model * vec4(position, 1.0);
    
    gl_Position = projection * view * vertex_pos;

    frag_pos = vertex_pos;

}