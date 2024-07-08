import { useState, useEffect } from "react";

import { Country } from "./Components/Country";
import { useCountry } from "./hook";
import { useField } from "./hook";

const App = () => {
  const nameInput = useField("text"); // Hook personalizado para el campo de entrada de nombre del país
  const [name, setName] = useState(""); // Estado para almacenar el nombre del país
  const country = useCountry(name); // Hook personalizado para obtener los datos del país basado en el nombre

  // Función para manejar el submit del formulario
  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value); // Actualiza el estado del nombre con el valor del campo de entrada
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} placeholder="Introduce el nombre del país" />
        <button>find</button>
      </form>

      {name && <Country country={country} />}
    </div>
  );
};

export default App;
