export const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float xScale;
uniform float yScale;
uniform float distortion;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float d = length(p) * distortion;
  float rx = p.x * (1.0 + d);
  float gx = p.x;
  float bx = p.x * (1.0 - d);
float r = 0.05 / abs((p.y - 0.5) + sin((rx + time) * xScale) * yScale);
float g = 0.05 / abs((p.y - 0.5) + sin((gx + time) * xScale) * yScale); // 💜 sera colorée
float b = 0.05 / abs((p.y - 0.5) + sin((bx + time) * xScale) * yScale);

vec3 customColor = vec3(0.22, 0.23, 0.62);

float white = (r + b) / 2.0;

vec3 finalColor = white * vec3(1.0) + g * customColor;

gl_FragColor = vec4(finalColor, 1.0);
}
`;