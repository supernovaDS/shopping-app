import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTile from "../components/cart-tile";

export default function Cart() {
  const [totalCart, setTotalCart] = useState(0);
  const { cart } = useSelector((state) => state);

  useEffect(() => {
    setTotalCart(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className="min-h-screen w-full px-4 py-8">
      {cart && cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-10">
          {/* Left: Cart Items */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-red-800 mb-6 text-center lg:text-left">
              Your Cart Items
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {cart.map((cartItem) => (
                <CartTile key={cartItem.id} cartItem={cartItem} />
              ))}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="w-full lg:w-[300px] bg-gray-100 rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-red-800 mb-4">Cart Summary</h2>
            <div className="space-y-3 text-gray-800">
              <p className="flex justify-between">
                <span className="font-semibold">Total Items:</span>
                <span>{cart.length}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Total Amount:</span>
                <span>₹{totalCart.toFixed(2)}</span>
              </p>
              <button className="mt-4 w-full bg-red-800 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-gray-800 font-bold text-2xl mb-4">
            Your Cart is Empty
          </h1>
          <Link to="/">
            <button className="bg-red-800 hover:bg-red-700 transition duration-200 text-white px-6 py-3 rounded-lg font-semibold shadow">
              SHOP NOW
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
