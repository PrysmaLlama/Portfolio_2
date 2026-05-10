//I wrote this shader using shader toy and translated it to work with p5js using goolge gemini

precision highp float;

// Uniforms passed from p5.js
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

// Rotates 2D vectors
mat2 rot2D(float angle) {                
    float s = sin(angle);                
    float c = cos(angle);                
    return mat2(c, -s, s, c);
}

// Mandelbulb fractal formula
float Fractal(vec3 p) {                
    vec3 z = p;                
    float dr = 1.;                
    float r = 0.;                
    float power = 5. + sin(iTime * .4);                
    for (int i = 0; i < 10; i++) {                
        r = length(z);                
        if (r > 2.) break;                
        
        // Convert to polar coordinates
        float theta = acos(z.z / r);                
        float phi = atan(z.y, z.x);                
        
        // Distance Estimation Formula                
        dr = pow(r, power-1.0) * power * dr + 1.0;                
        
        // Scale and rotate the point                
        float zr = pow(r, power);                
        theta = theta * power;                
        phi = phi * power;                
        
        // Convert back to cartesian coordinates
        z = zr * vec3(sin(theta) * cos(phi), sin(phi) * sin(theta), cos(theta));                
        z += p; // Add original point                
    }                
    return 0.5 * log(r) * r / dr;                
}                

float map(vec3 p) {                
    return Fractal(p);                
}    

//offset shader to center it
uniform vec2 iOffset;

void main() {            

    // Normalized pixel coordinates (from -1 to 1)
    vec2 uv = ((gl_FragCoord.xy - iOffset) * 4. - iResolution.xy) / iResolution.y;       
    
    // Normalize mouse input
    vec2 m = (iMouse.xy * 4. - iResolution.xy) / iResolution.y;                
    
    // Camera setup
    vec3 ro = vec3(0, 0, -3); // ray origin                
    vec3 rd = normalize(vec3(uv, 1.5)); // ray direction
    float t = 0.0;
    float col = 0.0;
    
    // --- Mouse Rotation ---
    // Vertical rotation
    ro.yz *= rot2D(-m.y);                
    rd.yz *= rot2D(-m.y);                
    // Horizontal rotation
    ro.xz *= rot2D(-m.x);                
    rd.xz *= rot2D(-m.x);                
    // ----------------------

    // Raymarching
    for (int i = 0; i < 60; i++) {                
        vec3 p = ro + rd * t;                
        float dist = map(p);                
        if (dist < 0.001 || dist > 100.) break;                
        t += dist;                
        col = float(i) / 60.0;                
    }                
    //col -= float(t) * 0.0005;
    
    vec3 finalColor = vec3(col);                
    finalColor = pow(finalColor, vec3(1.5)); // Contrast
    
    gl_FragColor = vec4(finalColor, 1.0);                
}