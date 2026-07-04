import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useProduct } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ProductDetails = () => {
  const { id } = useParams();

  const {
    singleProduct,
    getSingleProduct,
    addToCart,
  } = useProduct();

  const [activeImage, setActiveImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  useEffect(() => {
    if (singleProduct) {
      setActiveImage(singleProduct.thumbnail);
    }
  }, [singleProduct]);

  if (!singleProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f7fb]">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Product Details
          </h1>

          <p className="text-gray-500 mt-2">
            Full information for the selected product
          </p>

        </div>

        {/* Breadcrumb */}

        <div className="flex items-center gap-3 text-sm mb-8">

          <Link
            to="/products"
            className="text-violet-600 font-semibold"
          >
            Products
          </Link>

          <span className="text-gray-400">
            /
          </span>

          <span className="font-medium text-gray-700">
            {singleProduct.title}
          </span>

        </div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT */}

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="h-[470px] rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center overflow-hidden">

              <img
                src={activeImage}
                alt={singleProduct.title}
                className="w-80 h-80 object-contain transition duration-300 hover:scale-110"
              />

            </div>

            {/* Thumbnails */}

            <div className="grid grid-cols-4 gap-4 mt-6">

              {singleProduct.images?.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(image)}
                  className={`rounded-2xl overflow-hidden border-2 transition

                  ${activeImage === image
                      ? "border-violet-600"
                      : "border-gray-200"
                    }`}
                >

                  <img
                    src={image}
                    alt=""
                    className="w-full h-24 object-cover"
                  />

                </button>
              ))}

            </div>

          </div>
          {/* RIGHT */}

          <div className="bg-white rounded-3xl p-8 shadow-sm h-fit">

            <span className="text-violet-600 font-bold uppercase tracking-wider text-sm">
              {singleProduct.category}
            </span>

            <h1 className="text-5xl font-bold text-gray-800 mt-3">
              {singleProduct.title}
            </h1>

            {/* Rating */}

            <div className="flex flex-wrap items-center gap-5 mt-5">

              <div className="flex items-center gap-2 text-yellow-500">

                <FaStar />

                <span className="font-semibold text-gray-700">
                  {singleProduct.rating}
                </span>

              </div>

              <span className="text-gray-400">
                • {Math.floor(Math.random() * 500) + 100} Reviews
              </span>

              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                {singleProduct.stock > 0
                  ? "In Stock"
                  : "Out Of Stock"}
              </span>

            </div>

            {/* Price */}

            <div className="flex items-center gap-4 mt-8">

              <h2 className="text-5xl font-bold text-violet-600">
                ${singleProduct.price}
              </h2>

              <span className="line-through text-2xl text-gray-400">
                $
                {Math.round(
                  singleProduct.price +
                  singleProduct.price *
                  (singleProduct.discountPercentage / 100)
                )}
              </span>

            </div>

            {/* Description */}

            <p className="text-gray-500 leading-8 mt-8">
              {singleProduct.description}
            </p>

            {/* Info */}

            <div className="grid grid-cols-3 gap-5 mt-10">

              <div className="bg-gray-50 rounded-2xl p-5">

                <p className="text-sm text-gray-400">
                  Availability
                </p>

                <h4 className="font-bold mt-2">
                  {singleProduct.stock} Units
                </h4>

              </div>

              <div className="bg-gray-50 rounded-2xl p-5">

                <p className="text-sm text-gray-400">
                  Brand
                </p>

                <h4 className="font-bold mt-2">
                  {singleProduct.brand}
                </h4>

              </div>

              <div className="bg-gray-50 rounded-2xl p-5">

                <p className="text-sm text-gray-400">
                  Rating
                </p>

                <h4 className="font-bold mt-2">
                  {singleProduct.rating}/5
                </h4>

              </div>

            </div>

            {/* Buttons */}

            <div className="grid grid-cols-2 gap-4 mt-10">

              <button
                    onClick={() => {

                      const token = localStorage.getItem("token");

                      if (!token) {
                        toast.error("Please login first");
                        navigate("/login");
                        return;
                      }

                      addToCart(singleProduct);

                    }}
                  >
                    Add To Cart
                  </button>

              <Link
                to="/products"
                className="border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white rounded-2xl py-4 text-lg font-semibold flex items-center justify-center gap-3 transition"
              >
                <FaArrowLeft />

                Back
              </Link>

            </div>

          </div>

        </div>
        {/* Related Products */}

        <div className="bg-white rounded-3xl p-8 shadow-sm mt-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            You May Also Like
          </h2>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

            {singleProduct.images?.slice(0, 3).map((image, index) => (

              <div
                key={index}
                className="border rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg transition"
              >

                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 via-pink-100 to-blue-100 flex items-center justify-center">

                  <img
                    src={image}
                    alt=""
                    className="w-20 h-20 object-contain"
                  />

                </div>

                <div className="flex-1">

                  <h3 className="font-bold text-lg line-clamp-1">
                    {singleProduct.title}
                  </h3>

                  <p className="text-violet-600 font-bold mt-1">
                    ${singleProduct.price}
                  </p>
                  <button
                    onClick={() => {

                      const token = localStorage.getItem("token");

                      if (!token) {
                        toast.error("Please login first");
                        navigate("/login");
                        return;
                      }

                      addToCart(singleProduct);

                    }}
                  >
                    Add To Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProductDetails;