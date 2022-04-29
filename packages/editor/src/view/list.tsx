import { Link } from "react-router-dom";
const List = ({ data = [] }: { data?: string[]}) => {

  return <div className="list-container">
    {
      data.map(x => <Link className="list-card" key={x} to={`/${x}/${Math.random().toString(36).slice(2)}`}>{x}</Link>)
    }
  </div>
}

export default List;