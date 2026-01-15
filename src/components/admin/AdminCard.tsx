export default function AdminCard({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
            {children}
        </div>
    )
}
