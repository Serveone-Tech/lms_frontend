export default function CouponCard() {
    return (
        <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
                Have a coupon?
            </h3>

            <div className="flex gap-2">
                <input
                    className="flex-1 rounded-lg border px-3 py-2 text-sm"
                    placeholder="Enter coupon code"
                />
                <button
                    className="
                        rounded-lg px-4 py-2 text-sm
                        bg-[#E6F3F4]
                        border border-[#8CC6CB]
                        text-[#006c74]
                    "
                >
                    Apply
                </button>
            </div>

            <p className="text-xs text-gray-400 mt-2">
                Coupon feature will be enabled soon
            </p>
        </div>
    )
}
