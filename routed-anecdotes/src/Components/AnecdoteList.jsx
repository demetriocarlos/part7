import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const AnecdoteList = ({ anecdotes }) => {
  const stilo = {
    textDecoration: "none",
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {
          // eslint-disable-next-line react/prop-types
          anecdotes.map((anecdote) => (
            <li key={anecdote.id}>
              <Link style={stilo} to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
