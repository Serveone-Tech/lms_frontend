export default function OfferBanner() {
    return (
        <div className="rounded-2xl p-6 bg-[#F4E9EE] border border-[#E6C9D5] flex justify-between items-center">
            <div>
                <h2 className="text-lg font-semibold text-[#7A3E55]">
                    🎉 Limited Time Offer
                </h2>
                <p className="text-sm text-gray-600">
                    Get flat ₹1000 off on any premium course
                </p>
            </div>

            <button
                className="
                    rounded-xl px-5 py-2.5
                    bg-[#7A3E55] text-white text-sm
                    hover:opacity-90
                "
            >
                Explore Courses
            </button>
        </div>
    )
}
