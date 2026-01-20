'use client'

export default function PromoBanners() {
    return (
        <div
            className="
                w-full
                rounded-2xl
                border border-[#8CC6CB]
                bg-[#E6F3F4]
                px-6 py-5
                flex flex-col md:flex-row
                items-start md:items-center
                justify-between
                gap-4
            "
        >
            {/* Left content */}
            <div>
                <h2 className="text-lg font-semibold text-[#006c74]">
                    🎉 Special Offer for You
                </h2>
                <p className="text-sm text-[#006c74]/80 mt-1">
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
                        border border-[#006c74]
                        text-[#006c74]
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
                        bg-[#006c74]
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
