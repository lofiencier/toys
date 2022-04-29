import { useEffect, useRef } from "react";
import Quill, { Sources, TextChangeHandler } from 'quill';
import Delta from 'quill-delta';
import 'quill/dist/quill.snow.css';

const Editor = () => {
  const editor = useRef<HTMLDivElement | null>();
  const controller = useRef<Quill>();
  const handleTextChange = (value: Delta, old: Delta, source: Sources) => {
    
    
  }
  const handleEditorChange = () => {

  }
  useEffect(() => {
    const instance = controller.current = controller.current || new Quill(editor.current!, { theme: 'snow' });
    instance.on('text-change', handleTextChange as TextChangeHandler);
    instance.on('editor-change', handleEditorChange);
    return () => {
      instance.off('text-change', handleTextChange as TextChangeHandler);
      instance.off('editor-change', handleEditorChange);
    }
  }, []);
  return <div className="quill-editor" ref={node => editor.current = node}></div>
};

export default Editor;