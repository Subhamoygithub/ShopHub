import { Link } from "react-router-dom";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";
import { useProduct } from "../context/ProductContext";

const Cart = () => {
  const {
    cart,
    removeCart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
  } = useProduct();

  const subtotal = totalPrice;
  const discount = subtotal * 0.1;
  const tax = (subtotal - discount) * 0.18;
  const grandTotal = subtotal - discount + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">

        <h1 className="text-4xl font-bold mb-3">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mb-8">
          Add some amazing products.
        </p>

        <Link
          to="/products"
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <section className="bg-[#f6f7fb] min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Your Cart
          </h1>

          <p className="text-gray-500 mt-2">
            Review items before checkout
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-2xl font-bold">
                Cart Items ({cart.length})
              </h2>

              <button
                className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-xl"
              >
                Clear All
              </button>

            </div>

            <div className="grid grid-cols-12 text-gray-400 text-sm font-semibold border-b pb-4">

              <div className="col-span-6">
                PRODUCT
              </div>

              <div className="col-span-3 text-center">
                QUANTITY
              </div>

              <div className="col-span-3 text-center">
                SUBTOTAL
              </div>

            </div>

            <div className="mt-5 space-y-6">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center border-b pb-6"
                >

                  <div className="col-span-6 flex items-center gap-4">

                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-24 h-24 rounded-2xl object-cover bg-gray-100"
                    />

                    <div>

                      <h3 className="text-xl font-bold">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 capitalize">
                        {item.category}
                      </p>

                      <p className="font-bold text-violet-600 mt-2">
                        ${item.price}
                      </p>

                    </div>

                  </div>
                  {/* Quantity */}

                  <div className="col-span-3 flex justify-center">

                    <div className="flex items-center border rounded-xl overflow-hidden">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200"
                      >
                        <FaMinus />
                      </button>

                      <span className="px-6 font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200"
                      >
                        <FaPlus />
                      </button>

                    </div>

                  </div>

                  {/* Price + Remove */}

                  <div className="col-span-3 flex justify-between items-center">

                    <h3 className="text-xl font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h3>

                    <button
                      onClick={() => removeCart(item.id)}
                      className="w-12 h-12 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* Continue Shopping */}

            <Link
              to="/products"
              className="inline-flex items-center gap-3 text-violet-600 font-semibold mt-8 hover:underline"
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>

          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-3xl shadow-sm p-8 h-fit">

            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-green-600">

                <span>
                  Discount (10%)
                </span>

                <span>
                  -${discount.toFixed(2)}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Tax (18%)
                </span>

                <span>
                  ${tax.toFixed(2)}
                </span>

              </div>

              <hr className="my-6" />

              <div className="flex justify-between text-3xl font-bold">

                <span>Total</span>

                <span className="text-violet-600">
                  ${grandTotal.toFixed(2)}
                </span>

              </div>
                <Link to="/checkout">
                 <button
                className="w-full mt-8 bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-2xl font-bold text-lg transition"
              >
                Proceed To Checkout
              </button>
                </Link>
             
              <div className="mt-8">

                <p className="text-center text-sm text-gray-500 mb-5">
                  🔒 Secure checkout • SSL encrypted
                </p>



              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Cart;