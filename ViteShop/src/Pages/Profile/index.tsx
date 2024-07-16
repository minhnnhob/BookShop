import React from "react";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import PersonalInformation from "./personalInformation";
import Addresses from "./addresses";
import Orders from "./orders";
import AuthorizedPage from "../../Components/Authorization/authorizedPage";

export default function Profile() {
  return (
    <AuthorizedPage>
      <div className="container-fluid">
        <PersonalInformation />
        <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
          <Addresses />
        </AuthorizedComponent>
        <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
          <Orders />
        </AuthorizedComponent>
      </div>
    </AuthorizedPage>
  );
}
