import { debounce } from 'lodash';
import { useState } from 'react';
import { Diff } from 'diff-match-patch';
import { ChangeEvent, Fragment } from 'react';
const InputArea = ({ onChange, value }: { onChange: (value: string) => Diff[], value?: string }) => {
  const [diffs, setDiff] = useState<Diff[]>([]);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setDiff(onChange(e.target.value));
  return (
    <Fragment>
      <textarea onChange={handleChange} name="" id="" cols={100} rows={10} value={value}></textarea>
      <p>{diffs.map((x, i) => {
        switch (x[0]) {
          case -1:
            return <span key={i} style={{ background: '#ffa7a7' }}>{x[1]}</span>;
          case 0:
            return <span key={i}>{x[1]}</span>
          case 1:
            return <span key={i} style={{ background: '#a7ffba' }}>{x[1]}</span>
        }
      })}</p>
    </Fragment>
  )
}

export default InputArea;