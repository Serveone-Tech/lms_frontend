'use client'

export default function PromoBanners() {
    return (
        <div
            className="
                w-full
                rounded-2xl
                border border-[#E6C9D5]
                bg-[#F4E9EE]
                px-6 py-5
                flex flex-col md:flex-row
                items-start md:items-center
                justify-between
                gap-4
            "
        >
            {/* Left content */}
            <div>
                <h2 className="text-lg font-semibold text-[#7A3E55]">
                    🎉 Special Offer for You
                </h2>
                <p className="text-sm text-[#7A3E55]/80 mt-1">
                    Apply coupon <span className="font-medium">WELCOME10</span>{' '}
                    and get instant discount on your first course
                </p>
            </div>

            {/* Right action */}
            <div className="flex gap-3">
                <div
                    className="
                        px-4 py-2
                        rounded-lg
                        border border-[#7A3E55]
                        text-[#7A3E55]
                        text-sm font-medium
                        bg-white
                    "
                >
                    WELCOME10
                </div>

                <button
                    className="
                        rounded-lg
                        px-5 py-2
                        text-sm font-medium
                        bg-[#7A3E55]
                        text-white
                        hover:opacity-90
                        transition
                    "
                >
                    Apply Coupon
                </button>
            </div>
        </div>
    )
}
