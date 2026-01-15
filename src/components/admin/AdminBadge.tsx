export default function AdminBadge({
    label,
    color = 'gray',
}: {
    label: string
    color?: 'green' | 'gray'
}) {
    const styles = {
        green: 'bg-green-100 text-green-700 border border-green-200',
        gray: 'bg-gray-100 text-gray-600 border border-gray-200',
    }

    return (
        <span
            className={`px-3 py-1 text-xs rounded-full font-semibold ${styles[color]}`}
        >
            {label}
        </span>
    )
}
