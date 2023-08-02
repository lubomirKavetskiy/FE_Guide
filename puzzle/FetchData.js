import { useEffect, useState } from "react";

const API_URL = "https://dummyjson.com/products";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const contoller = new AbortController();
    const { signal, abort } = contoller;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(API_URL, { signal });
        const json = await response.json();
        const { products } = json;

        setData(products);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => abort();
  }, []);

  if (error) return error;

  return (
    <div className="App">
      {isLoading
        ? "Loading..."
        : data?.map(({ id, title }) => <li key={id}>{title}</li>)}
      {error && <p>{error}</p>}
    </div>
  );
}
