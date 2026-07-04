import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaSlidersH,
} from "react-icons/fa";
import { useProduct } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductPage = () => {
  const {
    filteredProducts,
    addToCart,
    search,
    setSearch,
  } = useProduct();

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  const categoryList = [
    "All",
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
  ];

  let displayProducts = [...filteredProducts];

  if (category !== "All") {
    displayProducts = displayProducts.filter(
      (item) =>
        item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (sort === "low") {
    displayProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    displayProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <section className="min-h-screen bg-[#f6f7fb]">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Discover Products
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Explore our latest collections with premium quality.
            </p>

          </div>

          {/* Search */}
          {/* 
          <div className="flex items-center bg-white rounded-2xl shadow-md px-5 py-4 w-full lg:w-[420px]">

            <FaSearch className="text-gray-400 mr-3" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none bg-transparent"
            />

          </div> */}

        </div>

        {/* Category & Sort */}

        <div className="mt-10 flex flex-col lg:flex-row lg:justify-between gap-6">

          {/* Categories */}

          <div className="flex flex-wrap gap-4">

            {categoryList.map((item) => (

              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300

                ${category === item
                    ? "bg-violet-600 text-white shadow-lg"
                    : "bg-white hover:bg-violet-100"
                  }`}
              >
                {item}
              </button>

            ))}

          </div>

          {/* Sort */}

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2 text-gray-600">

              <FaSlidersH />

              <span>Sort</span>

            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border rounded-xl px-5 py-3 outline-none"
            >
              <option value="">Default</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
            </select>

          </div>

        </div>

        {/* Product Grid */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-12">
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-72 bg-gradient-to-br from-violet-100 via-pink-50 to-blue-100 flex items-center justify-center">

                  {/* Discount */}
                  <span className="absolute top-4 left-4 bg-violet-600 text-white text-xs px-3 py-1 rounded-full">
                    -{Math.round(product.discountPercentage)}%
                  </span>

                  {/* Wishlist */}
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow hover:bg-red-500 hover:text-white transition">
                    ❤️
                  </button>

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-52 h-52 object-contain group-hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">

                  <span className="text-xs bg-violet-100 text-violet-700 px-3 py-1 rounded-full capitalize">
                    {product.category}
                  </span>

                  <h2 className="text-xl font-bold mt-4 line-clamp-1">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating + Stock */}
                  <div className="flex justify-between items-center mt-5">

                    <div className="flex items-center gap-1">
                      ⭐
                      <span>{product.rating}</span>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>

                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mt-5">

                    <h3 className="text-3xl font-bold text-violet-600">
                      ${product.price}
                    </h3>

                    <span className="line-through text-gray-400">
                      $
                      {Math.round(
                        product.price +
                        product.price *
                        (product.discountPercentage / 100)
                      )}
                    </span>

                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-6">

                    <button
                      onClick={() => {

                        const token = localStorage.getItem("token");

                        if (!token) {
                          toast.error("Please login first");
                          navigate("/login");
                          return;
                        }

                        addToCart(product);

                      }}
                    >
                      Add To Cart
                    </button>

                    <Link
                      to={`/product/${product.id}`}
                      className="border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white rounded-xl py-3 text-center font-semibold transition"
                    >
                      Details
                    </Link>

                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">

              <h2 className="text-3xl font-bold text-gray-700">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try another search keyword.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSort("");
                }}
                className="mt-6 bg-violet-600 text-white px-6 py-3 rounded-xl"
              >
                Reset Filters
              </button>

            </div>
          )}
        </div>

      </div>

    </section>
  );
};

export default ProductPage;