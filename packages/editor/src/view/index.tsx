import { DEFAULT_TOPIC, DataContent } from "@corp/enums";
import { useEffect, useRef, useState } from "react";
import '../styles/index.css';
import { Doc } from "sharedb";
import Client from "../client";
import InputArea from "./input";
import List from './list';


const Content = () => {
  const [data, setData] = useState<DataContent>();
  const client = useRef<Client>();
  const handleUpdate = (next: DataContent) => setData(Object.assign(data || {}, next));
  const onUpdate = () => client.current!.chain.insertString(['content'], 1, Math.random().toString(16).slice(2));
  useEffect(() => {
    const _client = client.current = new Client(DEFAULT_TOPIC);
    _client.on('update', handleUpdate);
    return () => {
      _client.off('update', handleUpdate);
    }
  }, []);
  return <div>
    <p>document:: </p>
    <p>data:: {data?.content}</p>
    <p onClick={onUpdate} style={{ userSelect: 'none', cursor: "pointer" }}>patch {`>>`}</p>
    <InputArea
      value={data?.content}
      onChange={value => {
        client.current!.chain
          .diffContent(data!.content, value, 'content')
          .mergeDiff()
          .end()
          .submit();
        setData({ content: value });
        return client.current!.chain.diff;
      }}
    />
  </div>
}

export default Content;