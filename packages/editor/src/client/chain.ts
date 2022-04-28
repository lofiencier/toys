import { Diff, diff_match_patch as DMP } from 'diff-match-patch';
import { Op, Path } from 'sharedb';
import { ClientEventType, PathType } from '../types';
import Client from './client';

type ChainEndFunction = (operations: Op[]) => Client;
class Chain {
  dmp?: DMP;
  operations: Op[] = [];
  diff: Diff[] = [];
  onChainEnd: ChainEndFunction
  _extra?: any;

  constructor(onChainEnd: ChainEndFunction) {
    this.onChainEnd = onChainEnd;
  }

  diffContent = (previous: string, next: string, path: PathType) => {
    this.dmp = this.dmp || new DMP();
    this._extra = { path };
    this.diff = this.dmp.diff_main(previous, next);
    return this;
  }
  mergeDiff = () => {
    const operations = this.diff.reduce((prev: Op[], cur: Diff, i: number, arr: Diff[]) => {
      const [diffType, diffContent] = cur;
      const last = [...prev].reverse()[0] || {};
      const offset = ((arr[i - 1] || [])[1] || '').length + Number([...last.p || []].reverse()[0] || 0);
      let content: { si?: string, sd?: string } = { si: '' };
      content = diffType === 1 ? { si: diffContent } : content;
      content = diffType === -1 ? { sd: diffContent } : content;
      return [
        ...prev,
        {
          p: [this._extra.path, offset], ...content
        }
      ] as Op[];
    }, []);
    this.operations = this.operations.concat(operations);
    return this;
  }
  insertString(path: Path, offset: PathType, content: string) {
    const operation = { p: [...path, offset], si: content };
    this.operations.push(operation);
    return this;
  }
  deleteString(path: Path, offset: PathType, content: string) {
    const operation = { p: [...path, offset], sd: content };
    this.operations.push(operation);
    return this;
  }

  insertList(path: Path, idx: PathType, target: any) {
    const operation = { p: [...path, idx], li: target };
    this.operations.push(operation);
    return this;
  }
  deleteListOffset(path: Path, idx: PathType, target: any) {
    const operation = { p: [...path, idx], ld: target };
    this.operations.push(operation);
    return this;
  }
  end() {
    const operations = this.operations;
    this.operations = [];
    return this.onChainEnd(operations);
  }
}

export default Chain;