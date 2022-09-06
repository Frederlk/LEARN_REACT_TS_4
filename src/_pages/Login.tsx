import { FC } from "react";
import { Layout, Row, Card } from "antd";
import LoginForm from "../_components/LoginForm";

const Login: FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <Card>
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;
