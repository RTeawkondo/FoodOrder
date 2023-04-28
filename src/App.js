import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meal from "./components/Meals/Meal";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShow,setCartShow] = useState(false)

  function cartHandler(){
    setCartShow(prev => !prev)
  }



  return (
    <CartProvider>
      {cartShow && <Cart closeCart = {cartHandler} />}
      <Header showCart={cartHandler}/>
      <main>
        <Meal />
      </main>
    </CartProvider>
  );
}

export default App;
