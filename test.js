var test = require('tape').test;

var ShaderProgram = require('./');
var gl = require('webgl-context')();
if (!gl)
    throw new Error("WebGL not supported!");

var DEFAULT_FRAG_SHADER = [
    "precision mediump float;",
    "varying vec2 vTexCoord0;",
    "varying vec4 vColor;",
    "uniform sampler2D u_texture0;",

    "void main(void) {",
    "   gl_FragColor = texture2D(u_texture0, vTexCoord0) * vColor;",
    "}"
].join('\n');

var DEFAULT_VERT_SHADER = [
    "attribute vec2 "+ShaderProgram.POSITION_ATTRIBUTE+";",
    "attribute vec4 "+ShaderProgram.COLOR_ATTRIBUTE+";",
    "attribute vec2 "+ShaderProgram.TEXCOORD_ATTRIBUTE+"0;",

    "uniform vec2 u_projection;",
    "varying vec2 vTexCoord0;",
    "varying vec4 vColor;",

    "void main(void) {", ///TODO: use a projection and transform matrix
    "   gl_Position = vec4( "
        +ShaderProgram.POSITION_ATTRIBUTE
        +".x / u_projection.x - 1.0, "
        +ShaderProgram.POSITION_ATTRIBUTE
        +".y / -u_projection.y + 1.0 , 0.0, 1.0);",
    "   vTexCoord0 = "+ShaderProgram.TEXCOORD_ATTRIBUTE+"0;",
    "   vColor = "+ShaderProgram.COLOR_ATTRIBUTE+";",
    "}"
].join('\n');

test('should compile correctly', function(t) {
    var shader = ShaderProgram(gl, {
        vertex: DEFAULT_VERT_SHADER, 
        fragment: DEFAULT_FRAG_SHADER
    });

    t.ok( shader.hasUniform('u_texture0'), 'fetches uniforms' );
    t.ok( shader.hasAttribute(ShaderProgram.TEXCOORD_ATTRIBUTE+"0"), 'fetches attributes' );

    shader.bind();
    shader.setUniformi('u_texture0', 2);
    t.ok( shader.getUniform('u_texture0') === 2, 'sets/gets uniform correctly' );

    t.end();
});