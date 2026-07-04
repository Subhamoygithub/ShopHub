import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
 const [products, setProducts] = useState([]);
const [singleProduct, setSingleProduct] = useState(null);

const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});

const [search, setSearch] = useState("");

const [orders, setOrders] = useState(() => {
  return JSON.parse(localStorage.getItem("orders")) || [];
});
 
  // Get All Products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://dummyjson.com/products"
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const placeOrder = (customerInfo, paymentMethod) => {
    const newOrder = {
      id: Date.now(),
      customer: customerInfo,
      paymentMethod,
      items: cart,
      total: totalPrice,
      orderDate: new Date().toLocaleString(),
      status: "Pending",
    };

    const updatedOrders = [newOrder, ...orders];

    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Cart Clear
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Get Single Product
  const getSingleProduct = async (id) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/${id}`
      );

      setSingleProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add To Cart
  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  // Increase Quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
            : item
        )
    );
  };

  // Remove Cart
  const removeCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
const clearCart = () => {
  setCart([]);
};
  // Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const filteredProducts = products.filter((product) => {
    const text = search.toLowerCase();

    return (
      product.title.toLowerCase().includes(text) ||
      product.brand.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text)
    );
  });
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  return (
    <ProductContext.Provider
      value={{
        products,
        singleProduct,
        getSingleProduct,
        cart,
        addToCart,
        removeCart,
        totalPrice,
        filteredProducts,
        search,
        setSearch,
        increaseQuantity,
        decreaseQuantity,
        orders,
        placeOrder,
        clearCart
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);