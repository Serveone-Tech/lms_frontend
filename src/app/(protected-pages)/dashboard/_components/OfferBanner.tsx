export default function OfferBanner() {
    return (
        <div className="rounded-2xl p-6 bg-[#E6F3F4] border border-[#8CC6CB] flex justify-between items-center">
            <div>
                <h2 className="text-lg font-semibold text-[#006c74]">
                    🎉 Limited Time Offer
                </h2>
                <p className="text-sm text-gray-600">
                    Get flat ₹1000 off on any premium course
                </p>
            </div>

            <button
                className="
                    rounded-xl px-5 py-2.5
                    bg-[#006c74] text-white text-sm
                    hover:opacity-90
                "
            >
                Explore Courses
            </button>
        </div>
    )
}
