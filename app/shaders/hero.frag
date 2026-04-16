precision highp float;

varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uScroll;

// Noise functions
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
  m = m * m; m = m * m;
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

// Paper crinkle — high-frequency displacement
float paperCrinkle(vec2 uv) {
  float n1 = snoise(uv * 25.0) * 0.3;
  float n2 = snoise(uv * 50.0 + 3.7) * 0.15;
  float n3 = snoise(uv * 100.0 + 7.3) * 0.07;
  return n1 + n2 + n3;
}

// Fold crease — sharp line with shadow
float foldCrease(vec2 uv, vec2 start, vec2 end, float width) {
  vec2 dir = end - start;
  float len = length(dir);
  vec2 norm = dir / len;
  vec2 toPoint = uv - start;
  float proj = clamp(dot(toPoint, norm), 0.0, len);
  float dist = length(toPoint - norm * proj);
  return smoothstep(width, 0.0, dist);
}

// Coffee stain — ring shape with irregular edge
float coffeeStain(vec2 uv, vec2 center, float radius) {
  float dist = length(uv - center);
  float noise = snoise(uv * 15.0 + center * 7.0) * 0.03;
  float outer = smoothstep(radius + 0.02 + noise, radius - 0.01, dist);
  float inner = smoothstep(radius - 0.025, radius - 0.06 + noise, dist);
  float ring = outer * (1.0 - inner * 0.7);
  // Fill center very faintly
  float fill = smoothstep(radius - 0.02, 0.0, dist) * 0.15;
  return ring * 0.35 + fill;
}

// Age foxing — dark spots that appear on old paper
float foxing(vec2 uv) {
  float n = snoise(uv * 8.0 + 42.0);
  return smoothstep(0.55, 0.7, n) * 0.15;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;

  // === BASE PAPER COLOR ===
  // Warm yellowed newsprint — not uniform
  float yellowing = snoise(uv * 3.0 + 1.5) * 0.02;
  vec3 paperBase = vec3(0.93 + yellowing, 0.91 + yellowing * 0.8, 0.85 + yellowing * 0.3);

  // Slight color variation across the sheet
  float variation = snoise(uv * 1.5 + 5.0) * 0.015;
  paperBase += vec3(variation, variation * 0.7, variation * 0.3);

  // === PAPER FIBER / CRINKLE TEXTURE ===
  float crinkle = paperCrinkle(uv);
  // Crinkle creates subtle light/shadow on the paper surface
  paperBase += crinkle * 0.018;

  // === FOLD CREASES ===
  // Horizontal center fold
  float hFold = foldCrease(uv, vec2(0.0, 0.5), vec2(1.0, 0.5), 0.003);
  paperBase -= hFold * 0.06;

  // Vertical center fold
  float vFold = foldCrease(uv, vec2(0.5, 0.0), vec2(0.5, 1.0), 0.002);
  paperBase -= vFold * 0.04;

  // Secondary horizontal fold (quarter)
  float hFold2 = foldCrease(uv, vec2(0.0, 0.25), vec2(1.0, 0.25), 0.0015);
  paperBase -= hFold2 * 0.025;

  // === EDGE DARKENING ===
  // Edges of old paper get darker/foxed
  float edgeDark = 1.0;
  edgeDark *= smoothstep(0.0, 0.08, uv.x);   // left edge
  edgeDark *= smoothstep(0.0, 0.08, 1.0 - uv.x); // right edge
  edgeDark *= smoothstep(0.0, 0.06, uv.y);   // bottom edge
  edgeDark *= smoothstep(0.0, 0.06, 1.0 - uv.y); // top edge
  paperBase *= mix(0.88, 1.0, edgeDark);

  // === FOXING (age spots) ===
  float fox = foxing(uv);
  paperBase -= fox * vec3(0.05, 0.04, 0.02);

  // === COFFEE STAIN ===
  float coffee = coffeeStain(uv, vec2(0.78, 0.35), 0.06);
  vec3 coffeeColor = vec3(0.55, 0.38, 0.22);
  paperBase = mix(paperBase, coffeeColor, coffee * 0.25);

  // === MOUSE INTERACTION ===
  // Hover creates a subtle "pressing" effect — paper depresses slightly
  vec2 mouseUv = uMouse * vec2(aspect, 1.0);
  vec2 uvAspect = uv * vec2(aspect, 1.0);
  float mouseDist = length(uvAspect - mouseUv);
  float mousePress = smoothstep(0.15, 0.0, mouseDist) * 0.02;
  paperBase -= mousePress;

  // === FILM GRAIN (print texture) ===
  float grain = (fract(sin(dot(uv * 500.0 + uTime * 0.1, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.025;
  paperBase += grain;

  // === SUBTLE TIME ANIMATION ===
  // Very slow, barely perceptible shift — paper "breathing"
  float breathe = sin(uTime * 0.3) * 0.003;
  paperBase += breathe;

  // Output paper color at full opacity — the shader IS the paper
  // Clamp to prevent any out-of-range values
  paperBase = clamp(paperBase, 0.0, 1.0);
  gl_FragColor = vec4(paperBase, 1.0);
}
