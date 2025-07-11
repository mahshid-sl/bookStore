import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, CreditCard, ShoppingBag, Trash2 } from "lucide-react";

// Sample data for the cart
// In a real application, this data would come from a global state (like Context or Redux)
const initialCartItems = [
  {
    id: 1,
    title: "هفت مونولوگ برای آغاز دیالوگ",
    author: { name: "گروه نویسندگان" },
    image: "/images/books/heft_monolog_1.webp",
    price: 110000,
    quantity: 1,
  },
  {
    id: 86,
    title: "زن‌ها مردها را از دست می‌دهند، چرا؟",
    author: { name: "جس مک‌کن" },
    image: "/images/books/women-lose-men.webp",
    price: 115000,
    quantity: 1,
  },
];

// Component to display each item in the cart
function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-start sm:items-center gap-4 py-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-28 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex-grow text-right">
        <h3 className="font-bold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{item.author.name}</p>
        <p className="text-sm font-semibold text-amber-600 mt-2">
          {item.price.toLocaleString()} تومان
        </p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}

// Main component for the Cart page
function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 0; // You can implement discount logic here
  const total = subtotal - discount;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs & Title */}
        <div className="text-right mb-10">
          <nav className="flex text-sm text-gray-500 items-center justify-start mb-4">
            <Link to="/" className="hover:text-amber-500">
              خانه
            </Link>
            <ChevronLeft size={20} className="mx-1" />
            <span className="font-semibold text-gray-700">سبد خرید</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900 border-r-4 border-amber-500 pr-4">
            سبد خرید شما
          </h1>
        </div>

        {cartItems.length > 0 ? (
          // State when the cart has items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Right Column: List of items */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-right mb-4">
                {cartItems.length} کتاب در سبد شما
              </h2>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>

            {/* Left Column: Order Summary */}
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md sticky top-24 space-y-8">
              {/* Payment Method Section */}
              <div>
                <h2 className="text-xl font-bold text-right mb-4">
                  شیوه پرداخت
                </h2>
                {/* --- اصلاح شده: ترتیب عناصر برای چیدمان صحیح راست‌چین --- */}
                <label
                  htmlFor="online"
                  className="flex justify-between items-center border rounded-lg p-4 bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="payment"
                      id="online"
                      defaultChecked
                      className="form-radio text-amber-500 focus:ring-amber-500"
                    />
                    <div className="text-right">
                      <h3 className="text-sm font-semibold">
                        درگاه پرداخت آنلاین
                      </h3>
                      <p className="text-xs text-gray-500">
                        پرداخت با کارت های عضو شتاب
                      </p>
                    </div>
                  </div>
                  <img className="h-7" src="/images/shetab.png" alt="shetab" />
                </label>
              </div>

              {/* Discount Code Section */}
              <div>
                <h2 className="text-xl font-bold text-right mb-4">کد تخفیف</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-grow border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 text-right"
                    placeholder="کد تخفیف"
                  />

                  <button className="bg-amber-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-600 transition-colors">
                    اعمال
                  </button>
                </div>
              </div>

              {/* Factor Section */}
              <div>
                <h2 className="text-xl font-bold text-right mb-4 pt-4 border-t border-t-gray-300">
                  فاکتور
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>جمع کل</span>
                    <span>{subtotal.toLocaleString()} تومان</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>سود شما از این خرید</span>
                    <span className="text-green-500">
                      {discount.toLocaleString()} تومان
                    </span>
                  </div>
                  <div className="border-t border-gray-200 my-4"></div>
                  <div className="flex justify-between font-bold text-lg text-gray-900">
                    <span>مبلغ قابل پرداخت</span>
                    <span>{total.toLocaleString()} تومان</span>
                  </div>
                  <div className="pt-4">
                    <button className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-transform hover:scale-105">
                      <CreditCard size={20} />
                      ادامه و پرداخت
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // State when the cart is empty
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <ShoppingBag
              className="mx-auto h-24 w-24 text-gray-300"
              strokeWidth={1}
            />
            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              سبد خرید شما خالی است
            </h2>
            <p className="mt-3 text-gray-500">
              به نظر می‌رسد هنوز کتابی به سبد خرید خود اضافه نکرده‌اید.
            </p>
            <Link
              to="/"
              className="mt-8 inline-block rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white hover:bg-amber-600"
            >
              شروع خرید
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
