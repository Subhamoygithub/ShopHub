import { useProduct } from "../context/ProductContext";
import { FaBoxOpen, FaTruck, FaShoppingCart, FaTimesCircle } from "react-icons/fa";

const Orders = () => {
  const { orders } = useProduct();

  const delivered = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  const processing = orders.filter(
    (o) => o.status === "Processing"
  ).length;

  const cancelled = orders.filter(
    (o) => o.status === "Cancelled"
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Orders
        </h1>

        <p className="text-slate-500">
          Track and manage all placed orders
        </p>
      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        <div className="bg-white rounded-2xl p-6 shadow border flex items-center gap-5">
          <FaBoxOpen className="text-4xl text-indigo-600" />

          <div>
            <h2 className="text-3xl font-bold">
              {orders.length}
            </h2>

            <p className="text-gray-500">
              Total Orders
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border flex items-center gap-5">
          <FaTruck className="text-4xl text-green-600" />

          <div>
            <h2 className="text-3xl font-bold">
              {delivered}
            </h2>

            <p className="text-gray-500">
              Delivered
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border flex items-center gap-5">
          <FaShoppingCart className="text-4xl text-yellow-500" />

          <div>
            <h2 className="text-3xl font-bold">
              {processing}
            </h2>

            <p className="text-gray-500">
              Processing
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border flex items-center gap-5">
          <FaTimesCircle className="text-4xl text-red-500" />

          <div>
            <h2 className="text-3xl font-bold">
              {cancelled}
            </h2>

            <p className="text-gray-500">
              Cancelled
            </p>
          </div>
        </div>

      </div>

      {/* Orders Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="px-8 py-6 border-b">
          <h2 className="text-2xl font-bold">
            All Orders
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-8 py-4">
                  Order ID
                </th>

                <th className="text-left px-8 py-4">
                  Customer
                </th>

                <th className="text-left px-8 py-4">
                  Date
                </th>

                <th className="text-left px-8 py-4">
                  Total
                </th>

                <th className="text-left px-8 py-4">
                  Status
                </th>

                <th className="text-left px-8 py-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-8 py-5 font-semibold text-indigo-600">
                    #{order.id}
                  </td>

                  <td className="px-8 py-5">
                    {order.customer.fullName}
                  </td>

                  <td className="px-8 py-5">
                    {order.orderDate}
                  </td>

                  <td className="px-8 py-5 font-semibold">
                    ₹{order.total}
                  </td>

                  <td className="px-8 py-5">

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Orders;