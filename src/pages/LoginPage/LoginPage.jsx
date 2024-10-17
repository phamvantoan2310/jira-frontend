import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { WrapperStyleLoginForm, WrapperStyleLoginLable, WrapperStyleLoginPage } from "../../components/LoginComponent/Style";
import { RegisterLinkComponent } from "../../components/LoginComponent/Component";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const endpoint = `${process.env.REACT_APP_API_KEY}/user/sign-in`;
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Đăng nhập thất bại");
                }
            }
        ).then(
            data => {
                if (data.status === "OK") {
                    const jwt = data.jwt;
                    console.log(jwt)
                    //lưu token vào localStorage
                    localStorage.setItem('tokenLogin', jwt);
                    navigate("/");
                    setError("đăng nhập thành công")
                } else {
                    <Navigate replace to="/loginPage" />
                    setError(data.message);
                }
            }
        ).catch(
            error => {
                console.log(error);
                setError("error", error);
            }
        )
    }



    return (
        <WrapperStyleLoginPage>
            <WrapperStyleLoginForm
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <WrapperStyleLoginLable>Đăng Nhập</WrapperStyleLoginLable>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <RegisterLinkComponent></RegisterLinkComponent>
                {error && <div style={{ color: 'red', marginLeft:"50px", marginBottom:"40px" }}>{error}</div>}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={() => handleLogin()}>
                        Submit
                    </Button>
                </Form.Item>
            </WrapperStyleLoginForm>
        </WrapperStyleLoginPage>
    );
};

export default LoginPage;
