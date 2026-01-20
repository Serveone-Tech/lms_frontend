import BrowseCourses from "./_components/BrowseCourses";
import EnrolledCourses from "./_components/EnrolledCourses";
import PromoBanners from "./_components/PromoBanners";


export default function DashboardPage() {
    return (
        <div className="space-y-10">
            <PromoBanners />

            <section>
                <h2 className="text-xl font-semibold mb-4">
                    Enrolled Courses
                </h2>
                <EnrolledCourses />
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">
                    Browse Courses
                </h2>
                <BrowseCourses />
            </section>
        </div>
    )
}
