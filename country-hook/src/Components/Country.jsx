export const Country = ({ country }) => {
  if (!country || country.found === null) {
    return null; // Si no hay datos del país o aún no se ha realizado una búsqueda, no renderizar nada
  }

  if (!country.found) {
    return <div>not found...</div>; // Si no se encontró el país, mostrar un mensaje
  }

  return (
    <div>
      <h2>{country.data.name.common}</h2>

      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};
