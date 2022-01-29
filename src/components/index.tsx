import React, { useEffect, useRef } from "react";
import Controller from "../utils/controller";

export const Playground: React.FC<{
  children: React.ReactChildren | React.ReactElement;
}> = (props) => {
  useEffect(() => {
    const controller = new Controller({ node: playground.current! });
    return controller.unistall;
  }, []);
  const playground = useRef<HTMLElement|null>(null);
  return (
    <div className="playground">
      <div className="playground-content" ref={node => playground.current = node}>{props.children}</div>
    </div>
  );
};
