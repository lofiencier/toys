import { GLTFLoader } from "../../utils/loaders";
import { LoadingManager, Object3D } from "three";
import { Controller } from "../../utils";

const loadModels = () => {
  // const manager = new LoadingMana
  // @ts-ignore
  const loader = new GLTFLoader().setPath("/models/DamagedHelmet/glTF/");
  loader.load(
    "DamagedHelmet.gltf",
    (gltf: any) => {
      // Controller.last.setCamera([0, 0, 1000]);
      // const mesh = gltf.scene.children[ 0 ];
      // mesh.scale.set( 1.5, 1.5, 1.5 );
      // Controller.last.render(mesh);
      Controller.last.setCamera([5, 0, 5], [0,0,0]);
      Controller.last.render(gltf.scene);
    },
    null,
    (error: Error) => {
      console.log("error", error);
    }
  );
};

export default loadModels;
