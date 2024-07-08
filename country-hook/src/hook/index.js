
import axios from "axios";
import { useState,useEffect } from "react";

export const useField = (type) => {
    const [value, setValue] = useState("");
  
    const onChange = (event) => {
      setValue(event.target.value);
    };
  
    return {
      type,
      value,
      onChange,
    };
  };

 
// Hook personalizado para obtener datos de un país basado en el nombre proporcionado
export const useCountry = (name) => {
  // Estado inicial del hook, data es null y found es null para indicar que no se ha realizado una búsqueda
  const [country, setCountry] = useState({
    data: null,
    found: null // Inicialmente null para diferenciar entre no haber buscado y no encontrar
  });

  
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
      if (response.data /*&& response.data.length > 0*/) {
        setCountry({
          data: response.data, 
          found: true 
        });
      } else {
        // Si no se encuentran datos, actualiza el estado con data a null y found a false
        setCountry({
          data: null,
          found: false
        });
      }
    } catch (error) {
      // Manejo de errores, actualiza el estado con data a null y found a false
      console.error('Error al obtener datos:', error);
      setCountry({
        data: null,
        found: false
      });
    }
  };
// useEffect para llamar a fetchData cuando el nombre cambia
  useEffect(() => {
    if (name) {
      fetchData();
    }
  }, [name]);

  // Retorna el estado actual del país
  return country;
};


