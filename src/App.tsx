import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

function App() {
  const [count, setCount] = useState(1);
  const [prevData, setPrevData] = useState<Product[]>();

  const { data = prevData, isFetching } = useQuery<Product[]>({
    queryKey: ["products", count],

    queryFn: () =>
      fetch(`https://fakestoreapi.com/products?limit=${count}`).then((res) =>
        res.json()
      ),

    select: (data) => data.reverse(),
  });

  useEffect(() => {
    if (!isFetching) {
      setPrevData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Remote A</h1>
      <div className="card">
        {/* time */}
        <p>{new Date().toLocaleString()}</p>

        <button onClick={() => setCount((count) => count + 1)}>
          count test is {count}
        </button>

        {isFetching && <p>Loading...</p>}

        {data?.map((item) => (
          <p
            key={item.id}
            style={{
              border: "1px solid green",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <span style={{ marginRight: "10px" }}>{item.id}</span>
            {item.title}
          </p>
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
