import { Link } from "react-router-dom";

export const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <div>
        <h1>Software anecdotes</h1>
      </div>
      <Link style={padding} to="/">
        anecdotes
      </Link>

      <Link style={padding} to="/create">
        create
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  );
};
