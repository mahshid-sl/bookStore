function HeroSlider({ img, title, author }) {
  return (
    <div className="relative w-full flex items-center justify-center min-h-[500px]">
      {/* ---book Name */}
      <div className="absolute top-10 text-center max-w-sm mx-auto z-20">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{`نوشته:${author}`}</p>
      </div>

      {/* ---book container--- */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-[480px] h-[520px] rounded-lg overflow-hidden">
          <img src={img} alt={title} className="w-full h-full object-cover" />
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
  );
}

export default HeroSlider;
