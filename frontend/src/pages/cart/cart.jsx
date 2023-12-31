import { useSelector, useDispatch } from 'react-redux';
import { addAllproducts, addProduct, deleteProduct, setTotalPrice } from '../../cartslice';
import "./cart.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { setAuthToken, setLoggedIn } from '../../loginSlice';
import { getData, postData } from '../../http-post-service';
import { useEffect } from 'react';
import { saveUser } from '../../userslice';

const Cart = () => {

  const cart = useSelector(state => state.cart.items);

  const cartItems = Object.values(cart)
  console.log(cartItems)
  const Totalprice = cartItems?.reduce((acc, product) => acc + (product.variant.price*product.quantity), 0);

  const isLoggedIn = useSelector((state) => state.login.details.isLoggedIn);

  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken")

  const navigate = useNavigate();
  const handleAddCart = async (product,variant) => {

    const response = await postData("/customer/wishlist/add/" + product._id+"/"+variant._id);
    if (response.message === "Product added to wishlist successfully") {
     let data ={
      "product":product,
      "variant":variant
     }
     console.log(data)
      dispatch(addProduct(data))
    } else {
      console.error(response);
    }
  }
  const handleDeleteCart = async (productId,variant) => {
    try {
    
        const response = await postData(
          "/customer/wishlist/delete/" + productId + "/"+variant._id
        );
        if (response.message === "Product removed from wishlist successfully") {
          dispatch(deleteProduct(variant));
        } else {
          console.error(response);
        }
      }
     catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const getProfile = async () =>{
      if (!isLoggedIn && token) {
        dispatch(setAuthToken(token))
        dispatch(setLoggedIn(true))
        try {
          const data = await getData("/customer/checkUser")
          dispatch(saveUser(data.result[0]))
          dispatch(addAllproducts(data.result[0].wishlist))
        }
        catch (error) {
          console.error(error)
        } 
      }
    }
    getProfile()
  },[isLoggedIn])

  const handleOrder = () => {
    dispatch(setTotalPrice(Totalprice))
    navigate("/checkout");  // Use the navigate function directly
  };

  if (cartItems && cartItems?.length === 0) {
    return <h1 style={{ marginTop: '8%' }}>Cart is empty</h1>;
  } 
  return  (
    <div className='cart-container'>
      <div className="cart-items">
        {cartItems &&
          cartItems
            .filter((product) => product.quantity > 0)
            .map((product) => (
              <div className="item" key={product._id}>
                <div className="details">
                  <div className="left">
                    <img width="100px" height="100px" alt={product.product.name} src={"/uploads/" + product.product.image} />
                    <div style={{display:'flex'}}>
                    <div className='delete'>
                      <AddIcon onClick={() => handleAddCart(product.product,product.variant)} />
                    </div>
                    <div className='delete'>
                      <DeleteIcon onClick={() => handleDeleteCart(product.product._id,product.variant)} />
                    </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className='product-name'>{product.product.name}</div>
                    <div className='size'>Size: {product.variant.size}</div>
                    <div className="color">Color: {product.variant.color}</div>
                  </div>
                </div>
                <div className="price">Price: $ {product.variant.price}</div>
                <div className="price">Quantity: {product.quantity}</div>
              </div>
            ))}
        {cartItems && cartItems.length > 0 && (
          <div>
            <div className='summary'>
              <div className="left">
                Total items: {cartItems.length}
              </div>
              <div className="right"> Total Price: $ {Totalprice.toFixed(2)}</div>
            </div>
            <div className='place-order'>
              <button className="btnColor" onClick={handleOrder}>Place your Order</button>
            </div>
          </div>
        )}
      </div>
    </div>
)};
  

export default Cart;
