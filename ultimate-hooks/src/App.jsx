import { useField } from "./hooks";
import { useResource } from "./hooks";

const App = () => {
  // Hooks personalizados para manejar campos de entrada
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  // Hooks personalizados para manejar recursos desde la API
  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  // Maneja el envío del formulario para crear una nueva nota
  const handleNoteSubmit = (event) => {
    event.preventDefault(); // Crear la nueva nota
    noteService.create({ content: content.value });
    content.setValue("");
  };

  // Maneja el envío del formulario para crear una nueva persona
  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value }); // Crear la nueva persona
    name.setValue("");
    number.setValue("");
  };

  // Desestructuramos 'setValue' para evitar pasarlo al input
  // eslint-disable-next-line no-unused-vars
  const { setValue: _, ...contentProps } = content;
  // eslint-disable-next-line no-unused-vars
  const { setValue: __, ...nameProps } = name;
  // eslint-disable-next-line no-unused-vars
  const { setValue: ___, ...numberProps } = number;

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...contentProps} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...nameProps} /> <br />
        number <input {...numberProps} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
