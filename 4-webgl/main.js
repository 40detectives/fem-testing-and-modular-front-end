/* 
note to self execute this with the transform flag for glslify:
  $ budo main.js -- -t glslify
*/
const regl = require('regl')();
const camera = require('regl-camera')(regl, {distance: 4});
const icosphere = require('icosphere');
const anormals = require('angle-normals');
const glsl = require('glslify');

const mesh = icosphere(4);
const draw = regl({
  frag: glsl`
    precision highp float;
    #pragma glslify: snoise = require('glsl-noise/simplex/4d);
    #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');
    varying vec3 vnorm, vpos;
    uniform float time;
    void main() {
      gl_FragColor = vec4((vnorm+1.0)*0.5 * vec3(0, 1, 0)
        + hsl2rgb(snoise(vec4(vpos, time * 0.1)),1.0, 0.5)
      , 1);
    }
  `,
  vert: glsl`
    precision highp float;
    #pragma glslify: snoise = require('glsl-noise/simplex/4d');
    attribute vec3 position, normal;
    uniform mat4 projection, view;
    varying vec3 vnorm, vpos;
    uniform float time;
    void main() {
      vpos = position;
      vnorm = normal;
      gl_Position = projection * view 
        * vec4(position + normal * snoise(vec4(position, time))*0.1, 1);
    }
  `,
  attributes: {
    position: mesh.positions,
    normal: anormals(mesh.cells, mesh.positions),
  },
  elements: mesh.cells,
  uniforms: {
    time: regl.context('time')
  },
});

regl.frame(function() {
  regl.clear({ color: [1,0,1,1], depth: true });
  camera(function() {
    draw();
  });
});
