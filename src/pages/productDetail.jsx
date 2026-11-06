import { useParams, useNavigate } from "react-router";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <section className="detail">
      {/* navigate(-1) returns to the listing with its URL (and filters) intact */}
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>Product {id}</h1>
      {/* TODO: fetch GET /products/{id} */}
    </section>
  );
};
