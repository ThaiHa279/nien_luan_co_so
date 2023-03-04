import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Checkbox,
  Typography,
  Form,
  Input,
  Card,
} from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/apiRequest";
import logo1 from "../assets/images/logos-facebook.svg";
import logo2 from "../assets/images/logo-apple.svg";
import logo3 from "../assets/images/Google__G__Logo.svg.png";

const {Title} = Typography;
const {Header, Footer, Content} = Layout;
const template = [
    <svg
      data-v-4ebdc598=""
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-4ebdc598=""
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill="#111827"
        className="fill-muted"
      ></path>
      <path
        data-v-4ebdc598=""
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill="#111827"
        className="fill-muted"
      ></path>
      <path
        data-v-4ebdc598=""
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill="#111827"
        className="fill-muted"
      ></path>
    </svg>,
  ];
const signup = [
<svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
    data-v-4ebdc598=""
    fillRule="evenodd"
    clipRule="evenodd"
    d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
    fill="#111827"
    className="fill-muted"
    ></path>
</svg>,
];
const signin = [
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
>
    <path
    className="fill-muted"
    d="M12.25,14H1.75A1.752,1.752,0,0,1,0,12.25V3.5A1.752,1.752,0,0,1,1.75,1.75h.876V.875a.875.875,0,0,1,1.75,0V1.75h5.25V.875a.875.875,0,0,1,1.75,0V1.75h.875A1.752,1.752,0,0,1,14,3.5v8.75A1.752,1.752,0,0,1,12.25,14ZM3.5,4.375a.875.875,0,0,0,0,1.75h7a.875.875,0,0,0,0-1.75Z"
    />
</svg>,
];
const Register = () => {
        const [name, setName] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const dispatch = useDispatch(); 
        const navigate = useNavigate();
        const handleRegister = (e) => {
            const newuser = {
                name: name,
                username: username, 
                password: password
            }
            registerUser(newuser, dispatch, navigate)
            return false;
        }

        return(
        <>
            <Layout className="layout-default ant-layout layout-sign-up">
                <Header>
                    <div className="header-col header-brand">
                        <h5>My Dashboard</h5>
                    </div>
                    <div className="header-col header-nav">
                        <Menu mode='horizontal' defaultSelectedKeys={["1"]}>
                            <Menu.Item key="1">
                                <Link to="/dashboard">
                                    {template}
                                    <span> Dashboard</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/sign-in">
                                    {signin}
                                    <span> Sign In</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/sign-up">
                                    {signup}
                                    <span> Sign Up</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Header>
                <Content  className="p-0">
                    <div className="sign-up-header">
                        <div className="content">
                            <Title>Sign Up</Title>
                            <p className="text-lg">
                            Use these awesome forms to login or create new account in your
                            project for free.
                            </p>
                        </div>
                    </div>

                    <Card
                        className="card-signup header-solid h-full ant-card pt-0"
                        title={<h5>Register With</h5>}
                        bordered="false"
                    >
                        <div className="sign-up-gateways">
                            <Button type="false">
                                <img src={logo1} alt="logo 1" />
                            </Button>
                            <Button type="false">
                                <img src={logo2} alt="logo 2" />
                            </Button>
                            <Button type="false">
                                <img src={logo3} alt="logo 3" />
                            </Button>
                        </div>
                        <p className="text-center my-25 font-semibold text-muted">Or</p>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={handleRegister}
                            className="row-col"
                        >
                            <Form.Item
                                name="Name"
                                onChange={(e) => setName(e.target.value)}
                                rules={[
                                    { required: true, message: "Please input your name!" },
                                ]}
                            >
                            <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                            name="account"
                            onChange={(e) => setUsername(e.target.value)}
                            rules={[
                                { required: true, message: "Please input your account!" },
                            ]}
                            >
                            <Input placeholder="Account" />
                            </Form.Item>
                            <Form.Item
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            rules={[
                                { required: true, message: "Please input your password!" },
                            ]}
                            >
                            <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>
                                I agree the{" "}
                                <a href="#pablo" className="font-bold text-dark">
                                Terms and Conditions
                                </a>
                            </Checkbox>
                            </Form.Item>

                            <Form.Item>
                            <Button
                                style={{ width: "100%" }}
                                type="primary"
                                htmlType="submit"
                            >
                                SIGN UP
                            </Button>
                            </Form.Item>
                        </Form>
                        <p className="font-semibold text-muted text-center">
                            Already have an account?{" "}
                            <Link to="/sign-in" className="font-bold text-dark">
                            Sign In
                            </Link>
                        </p>
                    </Card>
                </Content>
                <Footer>
                <p className="copyright">
                    {" "}
                    Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.{" "}
                </p>
                </Footer>
            </Layout>
        </>
        )
    }

export default Register;