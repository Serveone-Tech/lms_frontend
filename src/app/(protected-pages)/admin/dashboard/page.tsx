export default function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>

            <div className="grid grid-cols-4 gap-4">
                <StatCard title="Total Courses" />
                <StatCard title="Total Users" />
                <StatCard title="Total Orders" />
                <StatCard title="Total Reviews" />
            </div>
        </div>
    )
}
