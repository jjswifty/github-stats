import React, { ElementType } from 'react';
import { AuthPage } from "@/ui/pages/auth";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "@/apollo/queries/local/login";
import { isUserLoggedIn } from "@/apollo/queries/local/__generated__/isUserLoggedIn";
import { Route, Routes } from "react-router-dom";
import { Profile } from "@/ui/pages/profile";
import { ProtectedRoute } from "@/ui/components/common/ProtectedRoute";
import { MainLayout } from "@/ui/layouts/MainLayout";
import { Navigation } from "@/ui/components/Navigation";

interface IRoute {
    path: string
    isAuthRequired: boolean
    component: ElementType
    id: number
}

const ROUTES: Array<IRoute> = [
    {
        path: '/auth',
        isAuthRequired: false,
        component: AuthPage,
        id: 0,
    },
    {
        path: '/profile',
        isAuthRequired: true,
        component: Profile,
        id: 1
    },

]

const App = () => {

    const { data } = useQuery<isUserLoggedIn>(IS_LOGGED_IN)
    const isAuth = data?.isLoggedIn

    return (
        <MainLayout backgroundColor='bg-slate-700'>
            {
                isAuth !== undefined &&
                <Navigation /> &&
                <Routes>
                    {
                        ROUTES.map(e => {
                            if (e.isAuthRequired) {
                                return <Route
                                    key={e.id}
                                    path={e.path}
                                    element={
                                        <ProtectedRoute
                                            isAuthenticated={isAuth}
                                            outlet={<e.component/>}
                                        />
                                    }
                                />
                            } else {
                                return <Route
                                    path={e.path}
                                    element={<e.component/>}
                                    key={e.id}
                                />
                            }
                        })
                    }
                </Routes>
            }
        </MainLayout>
    )
};

export default App;
