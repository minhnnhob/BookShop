import { NavLink, Route, Routes } from "react-router-dom";
import CategoryManagement from "./CategoryManagement";
import OrderManagement from "./OrderManagement";
import ProductManagement from "./ProductManagement";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import StaffManagement from "./StaffManagement";
import Dashboard from "./Dashboard";
import AuthorizedPage from "../../Components/Authorization/authorizedPage";

interface TabItemProps {
  name: string;
  target: string;
}

const TabItem: React.FC<TabItemProps> = ({ name, target }) => {
  return (
    <NavLink
      to={target}
      className={({ isActive }) =>
        isActive
          ? "bg-primary nav-item nav-link p-3"
          : "bg-white nav-item nav-link p-3"
      }
    >
      <h6 className="text-dark m-0">{name}</h6>
    </NavLink>
  );
};

const Console: React.FC = () => {
  return (
    <AuthorizedPage requiredRoles={["MANAGER", "STAFF"]}>
      <div className="container-fluid">
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Management Console</span>
        </h5>
        <div className="row px-xl-4">
          <div className="col-lg-2">
            <AuthorizedComponent requiredRoles={["MANAGER", "STAFF"]}>
              <TabItem name="Dashboard" target="view-dashboard" />
            </AuthorizedComponent>
            <TabItem name="Orders" target="manage-orders" />
            {/* MANAGER TAB */}
            <AuthorizedComponent requiredRoles={["MANAGER"]}>
              <TabItem name="Products" target="manage-products" />
              <TabItem name="Categories" target="manage-categories" />
              <TabItem name="Staff" target="manage-staff" />
            </AuthorizedComponent>
          </div>
          <div className="col-lg-10 p-0">
            <Routes>
              <Route path="view-dashboard" element={<Dashboard />} />
              <Route path="manage-orders" element={<OrderManagement />} />
              {/* MANAGER ROUTE */}
              <Route
                path="manage-products"
                element={
                  <AuthorizedPage requiredRoles={["MANAGER"]}>
                    <ProductManagement />
                  </AuthorizedPage>
                }
              />
              <Route
                path="manage-categories"
                element={
                  <AuthorizedPage requiredRoles={["MANAGER"]}>
                    <CategoryManagement />
                  </AuthorizedPage>
                }
              />
              <Route
                path="manage-staff"
                element={
                  <AuthorizedPage requiredRoles={["MANAGER"]}>
                    <StaffManagement />
                  </AuthorizedPage>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </AuthorizedPage>
  );
};

export default Console;
