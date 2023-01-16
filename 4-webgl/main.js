/* 
note to self execute this with the transform flag for glslify:
  $ budo main.js -- -t glslify
*/
const regl = require('regl')();
const camera = require('regl-camera')(regl, {distance: 4});
const icosphere = require('icosphere');
const anormals = require('angle-normals');
const glsl = require('glslify');
const feedback = require('regl-feedback');

function createBlob(regl) {
  const mesh = icosphere(4);
  return regl({
    frag: glsl`
      precision highp float;
      #pragma glslify: snoise = require('glsl-noise/simplex/4d);
      #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');
      varying vec3 vnorm, vpos;
      uniform float time, stage;
      void main() {
        gl_FragColor = vec4((vnorm+1.0)*0.5 * vec3(0, 1, 0)
          + hsl2rgb(0.34*stage+0.15*snoise(vec4(vpos, time * 0.1 + stage)),1.0, 0.5)
        , 1);
      }
    `,
    vert: glsl`
      precision highp float;
      #pragma glslify: snoise = require('glsl-noise/simplex/4d');
      attribute vec3 position, normal;
      uniform mat4 projection, view;
      varying vec3 vnorm, vpos;
      uniform float time, stage;
      uniform vec3 location;
      void main() {
        vpos = position;
        vnorm = normal;
        gl_Position = projection * view 
          * vec4(position + location + normal * snoise(vec4(position, time + stage))*0.1, 1);
      }
    `,
    attributes: {
      position: mesh.positions,
      normal: anormals(mesh.cells, mesh.positions),
    },
    elements: mesh.cells,
    uniforms: {
      time: regl.context('time'),
      location: regl.prop('location'),
      stage: regl.prop('stage'),
    },
  });
}

  const draw ={
    blob: createBlob(regl),
    fb: feedback(regl, `
    vec3 sample(vec2 uv, sampler2D tex) {
      return 0.97*texture2D(tex, (0.99  * (2.0 * uv - 1.0) + 1.0) * 0.5).rgb;
    }
  `)
  };

  const fbtex = regl.texture();
  
  regl.frame(function() {
    regl.clear({ color: [1,0,1,1], depth: true });
    draw.fb({ texture: fbtex });
    camera(function() {
      draw.blob([
        { location: [0,0,0], stage: 0},
        { location: [0,0,-2], stage: 1},
        { location: [0,0,2], stage: 2},
      ]);
      fbtex({ copy: true, mag: 'linear', min: 'linear'});
    });
  });