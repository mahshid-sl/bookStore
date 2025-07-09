import {
  ChevronLeft,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const borderStyle =
  "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-right";

function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., send to an API)
    toast.success("پیام شما با موفقیت ارسال شد!");
    e.target.reset(); // Clear form fields after submission
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs & Title */}
          <div className="text-right mb-10">
            <nav className="flex text-sm text-gray-500 items-center justify-start mb-4">
              <Link to="/" className="hover:text-amber-500">
                خانه
              </Link>
              <ChevronLeft size={20} className="mx-1" />
              <span className="font-semibold text-gray-700">تماس با ما</span>
            </nav>
            <h1 className="text-3xl font-extrabold mt-8 text-gray-900 border-r-4 border-amber-500 pr-4">
              ارتباط با ما
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
                ارسال پیام
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="sr-only">
                    نام
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="نام شما"
                    required
                    className={`${borderStyle}`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ایمیل شما"
                    required
                    className={`${borderStyle}`}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="sr-only">
                    موضوع
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="موضوع پیام"
                    required
                    className={`${borderStyle}`}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    متن پیام
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="متن پیام شما..."
                    rows="5"
                    required
                    className={`${borderStyle}`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-transform hover:scale-105"
                >
                  ارسال پیام
                </button>
              </form>
            </div>

            {/* Right Column: Contact Info & Map */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-md space-y-4 text-right">
                <div className="flex items-center justify-start gap-3">
                  <MapPin className="text-amber-500" />
                  <p className="text-gray-700">تهران، خیابان آزادی، کوچه ۱۲</p>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <Phone className="text-amber-500" />
                  <a
                    href="tel:02112345678"
                    className="text-gray-700 hover:text-amber-600"
                  >
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </a>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <Mail className="text-amber-500" />
                  <a
                    href="mailto:BookStore@info"
                    className="text-gray-700 hover:text-amber-600"
                  >
                    BookStore@info
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg shadow-md">
                <iframe
                  className="w-full h-80 border-0 filter grayscale hover:grayscale-0 transition-all duration-300"
                  src="https://maps.google.com/maps?q=tehran&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen=""
                  loading="lazy"
                  title="موقعیت ما روی نقشه"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
