precision highp float;

uniform float frame;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

attribute vec3 position;

attribute vec3 normal; 

varying vec4 frag_pos;
varying vec4 frag_normal;

void main() { 
    vec4 vertex_pos = view * model * vec4(position, 1.0);
    
    gl_Position = projection * vertex_pos;

    frag_pos = vertex_pos;

    frag_normal = view * model * vec4(normal, 0.0);


}