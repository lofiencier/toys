import {
  BoxGeometry,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Object3D,
  Color,
  AmbientLight,
  DirectionalLight,
  Vector3,
} from "three";

export default class Controller {
  static last: Controller;
  // @ts-ignore
  private scene: Scene;
  // @ts-ignore
  private camera: PerspectiveCamera;
  // @ts-ignore
  private renderer: WebGLRenderer;
  // @ts-ignore
  private skyLight: DirectionalLight;
  private fiberId: number | null;
  animate: Function[] = [];
  constructor(config: { node: HTMLElement }) {
    Object.assign(this, this.init(config.node));
    Controller.last = this;
    this.fiberId = this.fiber();
  }
  private init = (node: HTMLElement) => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      node!.offsetWidth / node!.offsetHeight,
      0.1,
      1000
    );
    const renderer = new WebGLRenderer();
    renderer.setSize(node!.offsetWidth, node!.offsetHeight);
    node!.appendChild(renderer.domElement);
    scene.background = new Color("#383838");
    return {
      scene,
      camera,
      renderer,
      node,
    };
  };
  private createSkyLight = (model: Object3D) => {
    if(this.skyLight) {
      this.skyLight.dispose();
    };
    const skyLight = new DirectionalLight(0xffffff, 1);
    skyLight.position.set(-10, 10, 0);
    skyLight.target = model;
    this.scene.add(skyLight);
    this.skyLight = skyLight;
    const ambient = new AmbientLight(0xffffff, 1);
    this.scene.add(ambient);
  };
  render = (model: Object3D, notClear?: boolean) => {
    !notClear && this.scene.children.forEach((x) => this.scene.remove(x));
    this.scene.add(model);
    this.createSkyLight(model);
  };
  private fiber = () => {
    this.animate.forEach((x) => x());
    this.renderer.render(this.scene, this.camera);
    return requestAnimationFrame(this.fiber);
  };
  unistall = () => {
    cancelAnimationFrame(this.fiberId!);
    this.fiberId = null;
  };
  addAnimation = (cb: Function) => {
    !this.animate.includes(cb) && this.animate.push(cb);
  };
  setCamera = (positions?: number[], lookAt?: number[]) => {
    if (positions) {
      const [px, py, pz] = positions;
      this.camera.position.set(px, py, pz);
    }
    if (lookAt) {
      const [lx, ly, lz] = lookAt;
      this.camera.lookAt(lx, ly, lz);
    }
  };
}
