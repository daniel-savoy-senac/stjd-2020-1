precision highp float;

uniform mat4 view;

varying vec4 frag_pos;
varying vec4 frag_normal;

// posição da luz em relação a camera 
vec4 light = view * vec4(-3.0, 10.0, -6.0, 1.0);

// a camera está no 0,0,0
vec4 camera = vec4(0.0, 0.0, 0.0, 1.0);

// brilho (inverso do tamanho do ponto de luz especular)
float shininess = 148.0;

void main() {
    // vetor entre o pixel e a luz
    vec4 L = normalize(light - frag_pos);
    // vetor entre o pixel a camera
    vec4 E = normalize(camera - frag_pos);
    // bissetriz entre L e E
    vec4 H = normalize(L + E);
    // normal
    vec4 N = normalize(frag_normal);


    float specular = pow(max(0.0, dot(N, H)), shininess);
    float diffuse = max(0.0, dot(L, N)); 
    float ambient = 0.3;

    vec4 S = specular * vec4(1.0, 1.0, 1.0, 1.0);
    vec4 D = diffuse * vec4(1.0, 0.8, 0.0 , 1.0);
    vec4 A = ambient * vec4(0.0, 0.0, 0.8, 1.0);
    
    vec3 color = S.rgb + D.rgb + A.rgb;
    
    gl_FragColor = vec4(color, 1.0);
}