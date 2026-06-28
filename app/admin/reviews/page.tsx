import type { Metadata } from "next";
import { AdminReviews } from "@/components/reviews/AdminReviews";

export const metadata: Metadata = {
  title: "Admin · Reseñas",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminReviewsPage() {
  return (
    <div className="container-page py-24 sm:py-32">
      <AdminReviews />
    </div>
  );
}
