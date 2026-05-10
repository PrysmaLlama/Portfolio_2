let myShader;
console.log("Stuff");

function preload() {
  // Load the shader files
  myShader = loadShader('Shader/shader.vert', 'Shader/shader.frag');
}

function setup() {
  // Create canvas with WEBGL mode
  let fractalCanvas = createCanvas(windowWidth * 2.5, windowHeight * 1.375, WEBGL);
  noStroke();

  fractalCanvas.position(-windowWidth * 1.375, 100, "absolute");
  fractalCanvas.style("z-index", "-1");
}

function draw() {
  shader(myShader);

  // Pass uniforms to the shader
  myShader.setUniform('iResolution', [width, height]);
  myShader.setUniform('iTime', millis() / 1000.0);

  //Offset to center shader
  myShader.setUniform("iOffset", [width / 2, height / 2]);
  
  // Normalize mouse coordinates: 0,0 at center, -1 to 1
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  myShader.setUniform('iMouse', [mx, -my]); // Negative Y for screen coords

  // Draw a rectangle that covers the whole canvas
  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}