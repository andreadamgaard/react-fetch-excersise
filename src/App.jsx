import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getData() {
      const res = await fetch("https://kea-alt-del.dk/t7/api/products?start=" + count * 10);
      const data = await res.json();
      setProducts((old) => [...old, ...data]);
    }
    getData();
  }, [count]);
  return (
    <>
      <h1>{products.length}</h1>
      {/* hvis længden er 0, så kør den her */}
      {products.length === 0 ? (
        <p>Loading..........</p>
      ) : (
        products.map((prod) => (
          <article key={prod.id}>
            <h2> {prod.productdisplayname} </h2>
            <img src={`https://kea-alt-del.dk/t7/images/webp/640/${prod.id}.webp`} alt="" />
          </article>
        ))
      )}
      <button onClick={() => setCount((state) => state + 1)}>Load more</button>
    </>
  );
}

export default App;
