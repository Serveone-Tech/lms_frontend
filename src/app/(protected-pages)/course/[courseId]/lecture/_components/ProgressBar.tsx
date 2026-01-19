export default function ProgressBar({ value }: { value: number }) {
    return (
        <div className="mt-2">
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                    className="h-full bg-[#006c74]"
                    style={{ width: `${value}%` }}
                />
            </div>
            <p className="text-xs text-gray-500 mt-1">
                Course Progress: {value}%
            </p>
        </div>
    )
}
