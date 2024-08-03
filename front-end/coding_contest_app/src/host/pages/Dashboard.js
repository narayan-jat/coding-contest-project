import React from "react";
import Header from "../components/header/Header";
import ContestHistory from "../components/dashboard/Dashboard";

const HostDashboard = () => {

    return (
        <div>
            <Header headerType= {"host"} />
            <ContestHistory />
        </div>
    )
}

export default HostDashboard;