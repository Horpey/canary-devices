import DashboardLayout from "../layouts/DashboardLayout";
import Head from "../components/Head";
import HomeView from "../container/HomeView";

export default function Home() {
  return (
    <>
      <Head title="Dashboard" />
      <DashboardLayout>
        <HomeView />
      </DashboardLayout>
    </>
  );
}
