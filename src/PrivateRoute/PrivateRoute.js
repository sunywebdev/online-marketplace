import React from "react";
import { LinearProgress } from "@mui/material";
import useAuth from "../context/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
	let { user, isLoading } = useAuth();
	let location = useLocation();
	if (isLoading) {
		return (
			<>
				<LinearProgress />
				<LinearProgress />
				<LinearProgress />
				<LinearProgress />
			</>
		);
	}
	if (user?.email) {
		return children;
	}
	return <Navigate to='/login' state={{ from: location }} />;
};
export default PrivateRoute;
