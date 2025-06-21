import { ChevronLeft } from "lucide-react";

function Hero() {
  return (
    <main className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-10 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ">
        {/* ===right-col===*/}
        <div className="text-center lg:text-right">
          <div className=" -mt-10 flex flex-col items-start ">
            <h1 className="font-extrabold text-4xl mb-10 pr-12">
              کتاب فروش آنلاین
            </h1>
            {/*--logo_image-- */}
            <img
              src="/images/bookstore-name.png"
              alt="لوگوی بوک استور"
              className="w-auto mx-auto lg:mx-0 mb-6"
            />
            <p className="text-gray-600 text-xl leading-relaxed pr-12">
              هر کتاب، یک سفر جدید! همین امروز سفر خود را شروع کنید.
            </p>
          </div>
          <button className="bg-[#fb9e22] hover:bg-orange-500 text-[#333333] px-10 py-3 rounded-md text-lg font-semibold transition-all shadow-lg hover:shadow-orange-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mr-12 mt-5">
            خرید کنید
          </button>
        </div>

        {/* ===left-col===*/}

        <div className="relative w-full flex items-center justify-center min-h-[500px]">
          {/* ---book Name */}
          <div className="absolute top-10 text-center max-w-sm mx-auto z-20">
            <h3 className="font-semibold text-gray-800">شهر تاریکی</h3>
            <p className="text-sm text-gray-500">نوشته جیمز تورین</p>
          </div>

          {/* ---book container--- */}
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-[480px] h-[520px] rounded-lg overflow-hidden">
              <img
                src="/images/cityofdark.png"
                alt="City of Dark Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ---book shadow---*/}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black/20 rounded-full blur-2xl z-0" />

          {/*navigation btn*/}
          <button
            aria-label="کتاب قبلی"
            className="absolute left-0
            top-1/2
            w-10 h-10 flex items-center justify-center rounded-full bg-[#fb9e22] text-[#33333] shadow-md hover:scale-110  transition-transform z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-[#f2f2f2] lg:col-span-2 w-full h-[50px] -mt-70 z-0"></div>
      </div>
    </main>
  );
}

export default Hero;
