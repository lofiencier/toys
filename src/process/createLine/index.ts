import {
  BufferGeometry,
  Line,
  LineBasicMaterial,
  Vector3,
} from "three";
import Controller from "../../utils/controller";

const createLine = () => {
  const material = new LineBasicMaterial({ color: 0x0000ff });
  const points = [
    new Vector3(-10, 0, 0),
    new Vector3(0, 10, 0),
    new Vector3(10, 0, 0),
  ];
  const geometry = new BufferGeometry().setFromPoints(points);
  const line = new Line(geometry, material);
  Controller.last.setCamera([0, 0, 100], [0, 0, 0]);
  Controller.last.render(line);
};
export default createLine;
