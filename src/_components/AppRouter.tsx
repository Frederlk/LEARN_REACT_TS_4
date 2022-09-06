import { FC } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { privateRoutes, publicRoutes, RouteNames } from "../routes";
import Event from "../_pages/Event";
import Login from "../_pages/Login";

const AppRouter: FC = () => {
    const { isAuth } = useTypedSelector((state) => state.auth);

    return isAuth ? (
        <Routes>
            {privateRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={<Event />} />
            ))}
            <Route path="*" element={<Navigate to={RouteNames.EVENT} replace />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={<Login />} />
            ))}
            <Route path="*" element={<Navigate to={RouteNames.LOGIN} replace />} />
        </Routes>
    );
};

export default AppRouter;
