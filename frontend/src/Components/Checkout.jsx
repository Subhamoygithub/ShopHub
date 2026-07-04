import React, { useState } from "react";
import { useProduct } from "../context/ProductContext";
// Component redirection-er jonno React Router-er useNavigate hook-ti proyojon
import { useNavigate } from "react-router-dom"; 

const Checkout = () => {
  const { cart, totalPrice, clearCart,placeOrder } = useProduct(); // clearCart thakle order por use korte পারো
  const navigate = useNavigate(); // Navigation initialize kora holo

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Validation & Loading States
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Input Change Handler with Validation Logic
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  
    if (name === "pincode") {
      if (value && !/^\d+$/.test(value)) {
        setErrors((prev) => ({ ...prev, pincode: "Pincode must be numeric" }));
      } else {
        setErrors((prev) => ({ ...prev, pincode: "" }));
      }
    }
  };

  // Calculations
  const discount = totalPrice * 0.1; 
  const tax = totalPrice * 0.18;    
  const finalTotal = totalPrice - discount + tax;

 
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Form verification rules before submission
    if (errors.pincode || !formData.pincode || !formData.address) {
      alert("Please fill in all details correctly before placing the order.");
      return;
    }

    try {
      setIsProcessing(true); 

     
      await new Promise((resolve) => setTimeout(resolve, 1500));
      placeOrder(formData, paymentMethod);

      setIsProcessing(false);
      setOrderSuccess(true); 

     
      if (typeof clearCart === "function") {
        clearCart();
      }

  
      setTimeout(() => {
        navigate("/orders"); 
      }, 1500);

    } catch (error) {
      console.error("Order processing failed", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 font-sans text-[#1e293b]">
     
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm animate-fade-in">
          <div className="text-center p-8 max-w-sm rounded-2xl bg-white shadow-xl border border-emerald-100">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl animate-bounce">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Placed!</h2>
            <p className="text-sm text-slate-500 mb-4">Thank you for your purchase. Redirecting you to your orders page...</p>
            <div className="mx-auto h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-full bg-emerald-500 origin-left animate-[loading_1.5s_ease-in-out]"></div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0f172a]">Checkout</h1>
        <p className="text-sm text-[#64748b]">Enter your details to place the order</p>
      </div>

   
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
     
        <div className="lg:col-span-2 space-y-6">
          
     
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-[#1e293b]">Customer Information</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#64748b] mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#6366f1] focus:outline-none"
                  placeholder="Full Name"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#64748b] mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#6366f1] focus:outline-none"
                    placeholder="you@shopadmin.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#64748b] mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#6366f1] focus:outline-none"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#64748b] mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#6366f1] focus:outline-none"
                  placeholder="Flat 4B, 22 Park Street"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#64748b] mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#6366f1] focus:outline-none"
                    placeholder="Kolkata"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#64748b] mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none ${
                      errors.pincode ? "border-red-400 bg-red-50" : "border-[#e2e8f0] focus:border-[#6366f1]"
                    }`}
                    placeholder="abc123"
                  />
                  {errors.pincode && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <span>⚠️</span> {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Payment Method Section */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-[#1e293b]">Payment Method</h2>
            
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-sm font-medium transition-all ${
                paymentMethod === "card" ? "border-[#6366f1] bg-[#f5f3ff]" : "border-[#e2e8f0] bg-white"
              }`}>
                <span className="flex items-center gap-2">💳 Card</span>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="accent-[#6366f1]"
                />
              </label>

              <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-sm font-medium transition-all ${
                paymentMethod === "upi" ? "border-[#6366f1] bg-[#f5f3ff]" : "border-[#e2e8f0] bg-white"
              }`}>
                <span>UPI</span>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                  className="accent-[#6366f1]"
                />
              </label>

              <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-sm font-medium transition-all ${
                paymentMethod === "cod" ? "border-[#6366f1] bg-[#f5f3ff]" : "border-[#e2e8f0] bg-white"
              }`}>
                <span>Cash on Delivery</span>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-[#6366f1]"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary Card */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm h-fit">
          <h2 className="mb-4 text-base font-semibold text-[#1e293b]">Order Summary</h2>

          {/* Cart Items List */}
          <div className="divide-y divide-[#f1f5f9] max-h-60 overflow-y-auto pr-1">
            {cart.map((item, index) => (
              <div key={item._id || index} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-400 text-white flex items-center justify-center text-xs font-bold">
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] text-white">
                      {item.quantity}
                    </span>
                    📦
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1e293b] line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-[#64748b]">Electronics</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#1e293b]">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="mt-4 space-y-2 border-t border-[#f1f5f9] pt-4 text-sm text-[#64748b]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#1e293b]">₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span className="font-medium text-[#1e293b]">₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-[#f1f5f9] pt-3 text-base font-bold text-[#0f172a]">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2">
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5046e5] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#4338ca] transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                "✓ Place Order"
              )}
            </button>
            <button 
              onClick={() => navigate(-1)} // Enters standard route fallback context back history
              className="w-full rounded-xl bg-[#f8fafc] py-3 text-sm font-semibold text-[#64748b] hover:bg-[#f1f5f9] transition-colors"
            >
              Back to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;