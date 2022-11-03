import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";

const Home = () => {
  const { products } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // useEffect(() => {
  //   if (auth) {
  //     setTimeout(() => {
  //       navigate("/home");
  //     }, 2000);
  //   }
  // }, [auth]);

  return (
    <div className="home-container">
      <>
        <h4>New Arrivals</h4>
        <div className="products">
          {products?.map((product) => (
            <div key={product.id} className="product">
              <h5 style={{ fontWeight: "400", fontSize: "23px" }}>
                {product.Name}
              </h5>
              <span>QTY Available: {product.qty}</span>
              {product.qty === 0 ? (
                <span style={{ color: "red" }}>Sold</span>
              ) : (
                <span style={{ color: "green" }}>Available</span>
              )}
              <img src={product.image} alt={product.Name} />
              {/* <div className="details"> */}
              {/* <span>{product.desc}</span> */}
              <span className="price">${product.price}</span>
              {/* </div> */}
              <button onClick={() => handleAddToCart(product)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Home;
