import Layout from "../../../components/Layout";
import Navigation from "../../../components/Navigation";

export interface SideDrawerLayoutProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const SideDrawerLayout = ({ open, setOpen }: SideDrawerLayoutProps) => {
  if (!open) {
    return null;
  }
  return (
    <Layout.SideDrawer onClose={() => setOpen(false)}>
      <Navigation />
    </Layout.SideDrawer>
  );
};

export default SideDrawerLayout;
