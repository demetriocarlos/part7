import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  // eslint-disable-next-line react/prop-types
  const anecdote = anecdotes.find((n) => n.id === Number(id));
  return (
    <div>
      <p>{anecdote.content}</p>
      <p>{anecdote.author}</p>
      <p>{anecdote.info}</p>
      <p>{anecdote.votes}</p>
    </div>
  );
};
