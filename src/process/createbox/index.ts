import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import Controller from "../../utils/controller";

const createBox = () => {
  const controller = Controller.last;
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  controller.setCamera([0, 0, 5]);
  controller.render(cube);
  controller.addAnimation(() => {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  });
};

export default createBox;
