import { Renderer, Program, Mesh, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

const vert = `attribute vec2 position; void main(){ gl_Position = vec4(position,0.,1.); }`
const frag = `
precision highp float;
uniform float uTime; uniform vec2 uRes;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.); m=m*m; m=m*m;
  vec3 x=2.*fract(p*C.www)-1.; vec3 h=abs(x)-.5; vec3 ox=floor(x+.5); vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float n = snoise(vec2(uv.x*1.6 + uTime*.08, uTime*.15));
  float band = smoothstep(.0, .9, 1.0 - uv.y + n*.35);
  vec3 c1 = vec3(1., .69, .13); vec3 c2 = vec3(1., .35, .12); vec3 c3 = vec3(.25, .1, .5);
  vec3 col = mix(c3, mix(c1, c2, uv.x + n*.3), smoothstep(.2,.9,band));
  float a = pow(band, 2.2) * (0.5 + 0.5*n);
  gl_FragColor = vec4(col * a, a);
}`

/** Flowing WebGL aurora (ogl). Skips rendering when reduced motion is set. */
export default function Aurora({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = host.current!
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: false, dpr: Math.min(devicePixelRatio, 1.5) })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    el.appendChild(gl.canvas)
    gl.canvas.style.cssText = 'width:100%;height:100%;display:block'
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms: { uTime: { value: 0 }, uRes: { value: [1, 1] } } })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    const resize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight)
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height]
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const loop = (t: number) => {
      program.uniforms.uTime.value = reduce ? 0 : t * 0.001
      renderer.render({ scene: mesh })
      if (!reduce) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      el.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])
  return <div ref={host} className={className} aria-hidden />
}
