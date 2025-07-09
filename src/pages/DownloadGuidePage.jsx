import {
  ChevronLeft,
  Download,
  FileText,
  Headphones,
  Laptop,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

function DownloadGuidePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          راهنمای دانلود و استفاده
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          چگونه از کتاب‌های خود لذت ببرید
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-12 items-center justify-start">
          <Link to="/" className="hover:text-amber-500">
            خانه
          </Link>
          <ChevronLeft size={20} className="mx-1" />
          <span className="font-semibold text-gray-700">راهنمای دانلود</span>
        </nav>

        <div className="space-y-12 text-right">
          {/* Step 1: General Download Process */}
          <div className="p-8 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-end gap-4 mb-4">
              <h2 className="text-2xl font-bold text-blue-800">
                مراحل کلی دانلود
              </h2>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                <Download size={24} />
              </div>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed pr-5">
              <li>پس از تکمیل فرآیند خرید، وارد حساب کاربری خود شوید.</li>
              <li>
                به بخش <strong>«کتابخانه من»</strong> یا{" "}
                <strong>«دانلودها»</strong> مراجعه کنید.
              </li>
              <li>
                لیست تمام کتاب‌های خریداری شده شما در این بخش قابل مشاهده است.
              </li>
              <li>
                روی دکمه «دانلود» کنار هر کتاب کلیک کنید تا فایل مربوطه روی
                دستگاه شما ذخیره شود.
              </li>
            </ol>
          </div>

          {/* Step 2: Ebooks Guide */}
          <div className="p-8 bg-green-50 rounded-lg">
            <div className="flex items-center justify-end gap-4 mb-4">
              <h2 className="text-2xl font-bold text-green-800">
                راهنمای کتاب‌های الکترونیک (PDF و EPUB)
              </h2>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600">
                <FileText size={24} />
              </div>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                کتاب‌های الکترونیک ما در دو فرمت محبوب PDF و EPUB ارائه می‌شوند
                تا بهترین تجربه مطالعه را داشته باشید.
              </p>
              <div className="flex items-start gap-3 pt-2">
                <Laptop
                  size={28}
                  className="text-green-600 mt-1 flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold">در کامپیوتر و لپ‌تاپ:</h4>
                  <p className="text-sm">
                    می‌توانید فایل‌های PDF را با مرورگر یا نرم‌افزار Adobe
                    Acrobat Reader و فایل‌های EPUB را با نرم‌افزارهایی مانند
                    Calibre یا Freda مطالعه کنید.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <Smartphone
                  size={28}
                  className="text-green-600 mt-1 flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold">
                    در موبایل و تبلت (اندروید و iOS):
                  </h4>
                  <p className="text-sm">
                    اپلیکیشن‌های متعددی مانند Google Play Books, Apple Books,
                    Adobe Acrobat Reader و Lithium برای مطالعه هر دو فرمت وجود
                    دارند که می‌توانید از فروشگاه اپلیکیشن دستگاه خود دانلود
                    کنید.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Audiobooks Guide */}
          <div className="p-8 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-end gap-4 mb-4">
              <h2 className="text-2xl font-bold text-purple-800">
                راهنمای کتاب‌های صوتی (MP3)
              </h2>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600">
                <Headphones size={24} />
              </div>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                کتاب‌های صوتی با فرمت استاندارد MP3 ارائه می‌شوند که با تمام
                دستگاه‌ها سازگار است.
              </p>
              <p>
                پس از دانلود، می‌توانید فایل‌ها را در هر نرم‌افزار پخش موسیقی
                روی کامپیوتر، موبایل یا تبلت خود باز کرده و از شنیدن کتاب لذت
                ببرید. همچنین می‌توانید آن‌ها را به دستگاه پخش MP3 یا خودروی خود
                منتقل کنید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadGuidePage;
