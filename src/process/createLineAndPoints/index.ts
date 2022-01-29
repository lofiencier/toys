import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  Points,
  PointsMaterial,
} from "three";
import Controller from "../../utils/controller";

const createLine = () => {
  const geometry = new BufferGeometry();
  
  const colors = new BufferAttribute(new Float32Array([
    1, 0, 0, //顶点1颜色
    0, 1, 0, //顶点2颜色
    0, 0, 1, //顶点3颜色
  
    1, 1, 0, //顶点4颜色
    0, 1, 1, //顶点5颜色
    1, 0, 1, //顶点6颜色
  ]), 3);
  const positions = new BufferAttribute(new Float32Array([
    0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10,
  ]), 3);
  
  geometry.setAttribute('position', positions);
  geometry.setAttribute('color', colors);
  const material = new MeshBasicMaterial({
    // 根据顶点渲染模型，渲染插值计算
    vertexColors: true,
    side: DoubleSide,
  });
  
  // 点渲染模式
  const material2 = new PointsMaterial({
    // color: 0xff0000,
    vertexColors: true,
    size: 4, //点对象像素尺寸
  }); //材质对象
  const points3d = new Points(geometry, material2); //点模型对象
  const mesh = new Mesh(geometry, material);
  Controller.last.setCamera([180, 200, 100], [0, 0, 0]);
  Controller.last.render(mesh);
  Controller.last.render(points3d, true);
};
export default createLine;
