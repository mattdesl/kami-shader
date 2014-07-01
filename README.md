# kami-shader 
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Shader utility for [kami](http://github.com/mattdesl/kami). Wraps [webgl-compile-shader](http://github.com/mattdesl/webgl-compile-shader) with more convenience features.

Will throw an error if the shader couldn't compile; complete with line numbers and other debugging details.

## Usage

[![NPM](https://nodei.co/npm/kami-shader.png)](https://nodei.co/npm/kami-shader/)

```js
//create a new shader
var shader = require('kami-shader')(gl, {
	vertex: vertSource,
	fragment: fragSource
});

//bind it, use it...
shader.bind();

//set some uniforms after binding
shader.setUniformf("myvec3", 0, 1, 0);
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/kami-shader/blob/master/LICENSE.md) for details.
