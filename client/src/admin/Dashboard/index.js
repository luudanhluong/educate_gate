import DefaultNavbar from "admin/Navbar/DefaultNavbar";
import MKBox from "components/MKBox";

const Dashboard = () => {
  return (
    <MKBox sx={{ display: "flex", alignItems: "center", height: "100%", gap: "1.5rem" }}>
      <DefaultNavbar />
    </MKBox>
  );
};

export default Dashboard;
