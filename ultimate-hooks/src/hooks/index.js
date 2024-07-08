
 

import { useState, useEffect, useCallback } from "react";

import axios from "axios";

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
       
    return {
      type,
      value,
      onChange,
      setValue
    }
  }
   


// Hook personalizado para manejar recursos obtenidos de una API
export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // Función para obtener datos de la API y actualizar el estado
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }, [baseUrl]); // baseUrl es una dependencia porque fetchData depende de ella

  // Función para crear un nuevo recurso en la API y actualizar el estado
  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources(resources.concat(response.data)); // Actualiza el estado con el nuevo recurso
      fetchData(); // Refresca los datos después de crear un recurso
      return response.data;
    } catch (error) {
      console.error('Error al crear el recurso:', error);
    }
  };

  // useEffect para obtener los datos cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData es una dependencia para evitar advertencias de ESLint

  const service = {
    create // Retornar la función create en un objeto service
  };

  return [
    resources, service // Retornar los recursos y el servicio
  ];
};


