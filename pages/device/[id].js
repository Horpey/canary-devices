import DashboardLayout from "../../layouts/DashboardLayout";
import Head from "../../components/Head";
import DeviceView from "../../container/DeviceView";

const ViewDevice = ({ id }) => {
  return (
    <>
      <Head title="Device" />
      <DashboardLayout>
        <DeviceView id={id} />
      </DashboardLayout>
    </>
  );
};

ViewDevice.getInitialProps = async (ctx) => {
  let { id } = ctx.query;

  return { id };
};

export default ViewDevice;
