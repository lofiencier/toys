import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import '../styles/index.css';
import List from './list';
import Action from "./Action";
import Editor from './editor';

// 列表展示可拖拽卡片，可添加卡片，可修改次序，可更改名字
// 卡片类型多样，这样你就可以不用建多个项目了

const Detail = () => {
  const { id, type } = useParams();
  
  return <Editor></Editor>;
};

const Root = () => {
  return <div className="roof">
    <Action />
    <div className='roof-content'>
      <Router>
        <Routes>
          <Route path="/" element={<List data={['rich-text', 'webgl', 'comunicate']} />}></Route>
          <Route path="/:type/:id" element={<Detail />}>
          </Route>
        </Routes>
      </Router>
    </div>
  </div>
}

export default Root;