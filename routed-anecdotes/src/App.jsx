import { useState } from "react";
import { Menu } from "./Components/Menu";
import { AnecdoteList } from "./Components/AnecdoteList";
import { About } from "./Components/About";
import { Footer } from "./Components/Footer";
import { CreateNew } from "./Components/CreateNew";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Anecdote } from "./Components/Anecdote";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  /**
 * <h1>Software anecdotes</h1>
      <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer />
 * 
 */
  return (
    <>
      <Router>
        <div>
          <Menu />
        </div>

        <Routes>
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
