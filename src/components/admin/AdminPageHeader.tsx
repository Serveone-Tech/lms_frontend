type Props = {
    title: string
    action?: React.ReactNode
}

export default function AdminPageHeader({ title, action }: Props) {
    return (
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">
                {title}
            </h1>
            {action}
        </div>
    )
}
