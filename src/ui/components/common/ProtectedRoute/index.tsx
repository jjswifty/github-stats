import { Navigate } from "react-router-dom";
import React from "react";

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath?: string;
    outlet: JSX.Element;
}

export const ProtectedRoute = ({
    isAuthenticated,
    authenticationPath = "/auth",
    outlet
}: ProtectedRouteProps) => {
    if (isAuthenticated) {
        return outlet
    } else {
        return <Navigate to={{ pathname: authenticationPath }} />
    }
}
