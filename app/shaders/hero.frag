precision highp float;

varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;

  // Mouse influence — creates a subtle light source
  vec2 mouse = uMouse * vec2(aspect, 1.0);
  float mouseDist = length(uv - mouse);
  float mouseGlow = smoothstep(0.6, 0.0, mouseDist) * 0.25;

  // Layered noise — flowing, organic
  float t = uTime * 0.1;
  float n1 = snoise(uv * 1.5 + t) * 0.5;
  float n2 = snoise(uv * 3.0 - t * 0.5) * 0.25;
  float n3 = snoise(uv * 6.0 + t * 0.3) * 0.125;
  float n4 = snoise(uv * 12.0 - t * 0.2) * 0.0625;
  float noise = n1 + n2 + n3 + n4;

  // Dark palette — deep space with subtle color shifts
  vec3 bgDark = vec3(0.039, 0.039, 0.059);    // #0A0A0F
  vec3 bgMid = vec3(0.067, 0.067, 0.094);      // slightly lighter
  vec3 accentDim = vec3(0.15, 0.2, 0.45);      // blue undertone
  vec3 accentWarm = vec3(0.25, 0.12, 0.3);     // purple-warm accent

  // Build the color field
  vec3 color = mix(bgDark, bgMid, noise * 0.5 + 0.5);

  // Accent color threading
  float accentMask = smoothstep(0.2, 0.6, noise) * 0.2;
  color = mix(color, accentDim, accentMask);

  // Warm accent in corners
  float cornerDist = length(uv - vec2(aspect * 0.8, 0.2));
  float warmMask = smoothstep(0.8, 0.0, cornerDist) * 0.1;
  color = mix(color, accentWarm, warmMask);

  // Mouse glow — subtle light follows cursor
  vec3 glowColor = vec3(0.2, 0.3, 0.6);
  color += glowColor * mouseGlow;

  // Vignette
  vec2 vigUv = vUv * 2.0 - 1.0;
  float vig = 1.0 - dot(vigUv * 0.5, vigUv * 0.5);
  color *= smoothstep(0.0, 0.8, vig);

  // Film grain
  float grain = (fract(sin(dot(vUv * uTime * 0.5, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.04;
  color += grain;

  gl_FragColor = vec4(color, 1.0);
}
