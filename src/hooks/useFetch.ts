import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null); // ใช้ T เป็นประเภทของ data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;


