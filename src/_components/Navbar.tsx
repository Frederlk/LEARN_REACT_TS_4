import { Row } from "antd";
import { Layout, Menu } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RouteNames } from "../routes";

const Navbar: FC = () => {
    const navigate = useNavigate();
    const { isAuth, user } = useTypedSelector((state) => state.auth);
    const { logout } = useActions();

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ? (
                    <>
                        <div style={{ color: "#fff" }}>{user.username}</div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item onClick={() => logout()} key="log-out">
                                Log Out
                            </Menu.Item>
                        </Menu>
                    </>
                ) : (
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item onClick={() => navigate(RouteNames.LOGIN)} key="login">
                            Login
                        </Menu.Item>
                    </Menu>
                )}
            </Row>
        </Layout.Header>
    );
};

export default Navbar;
