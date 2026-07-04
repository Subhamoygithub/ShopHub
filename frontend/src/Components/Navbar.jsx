import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useProduct } from "../context/ProductContext";

const Navbar = () => {
  const { cart, search, setSearch } = useProduct();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/products"
            className="text-3xl font-extrabold"
          >
            <span className="text-violet-600">Shop</span>
            <span className="text-gray-900">Hub</span>
          </Link>

          {/* Search */}
          {/* <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-3 w-[380px]">
            <FaSearch className="text-gray-500" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full px-3"
            />
          </div> */}

          {/* Right Side */}
          <div className="flex items-center gap-6">

            <Link
              to="/products"
              className="font-semibold hover:text-violet-600"
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="relative"
            >
              <FaShoppingCart
                size={23}
                className="hover:text-violet-600"
              />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-violet-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <div className="flex items-center gap-3">

                  {user.profileimage ? (
                    <img
                      src={user.profileimage}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle
                      size={36}
                      className="text-violet-600"
                    />
                  )}

                  <div className="hidden lg:block">
                    <h3 className="font-semibold">
                      {user.username}
                    </h3>

                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>

                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-semibold hover:text-violet-600"
                >
                  Login
                </Link>

                <Link
                  to="/"
                  className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl font-semibold transition"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;