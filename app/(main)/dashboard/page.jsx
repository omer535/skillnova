
import { getIndustryInsights } from "@/action/dashboard";
import { getUserOnboardingStatus } from "@/action/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dash-board-view";

const IndustryInsightsPage = async () => {

    const { isOnboarded } = await getUserOnboardingStatus();
    const insights = await getIndustryInsights();

    if (!isOnboarded) {
        redirect("/onboarding");
    }
    return (
        <div className="container mx-auto">
            <DashboardView insights={insights} />
        </div>
    );
}

export default IndustryInsightsPage;