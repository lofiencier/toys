import { useEffect, useState } from 'react';
import { Playground } from '../components';
import { cs } from '../utils';
// @ts-ignore-next-line
const files = require.context('../process', true, /index\.tsx?$/);
const keys = files.keys();

export const Roof = () => {
  const [active, setActive] = useState(0);
  const ouput = files(keys[active]).default;
  const method = keys[active].endsWith('.ts') ? ouput : () => null;
  const Component =  keys[active].endsWith('.tsx') ? ouput : () => null;
  useEffect(method, [active]);
  return (
    <div className="roof-container">
      <div className="tabs">
        {keys.map((x: string, i: number) => <div className={cs('options', { active: active === i })} key={x} onClick={() => setActive(i)}>{x.split('/')[1]}</div>)}
      </div>
      <Playground>
        <Component />
      </Playground>
    </div>
  );
};
