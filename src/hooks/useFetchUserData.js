//not working
import { useEffect, useState } from 'react';

const useFetchUserData = (uid) => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    altura: '',
    peso: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.workoutwiz.eu/get-persona/${uid}`);
        if (response.ok) {
          const data = await response.json();
          setUserData({
            nombre: data.Nombre || '',
            apellidos: data.Apellidos || '',
            edad: data.Edad || '',
            altura: data.Altura || '',
            peso: data.Peso || ''
          });
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (uid) {
      fetchData();
    }
  }, [uid]);

  return { userData, error };
};

export default useFetchUserData;
