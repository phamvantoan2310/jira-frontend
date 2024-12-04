import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { WrapperStyleChangePasswordForm, WrapperStyleChangePasswordLable, WrapperStyleChangePasswordPage } from "../../components/ChangePasswordComponent/Style";
import { useNavigate, useParams } from "react-router-dom";



const ChangePasswordPage = () => {
    const {email} = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChangeConfirmPassword = () => {
        if (confirmPassword !== password) {
            setError("Nhập lại mật khẩu chưa chính xác")
        } else {
            setError("");
        }
    }

    const handleChangePassword = async() => {
        try {
            const endpoint = `${process.env.REACT_APP_API_KEY}/user/changepassword/${email}`;
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ password: password }),
            });

            if (!response.ok) {
                throw new Error("change password fail");
            }

            const result = await response.json();
            if (result.status == "OK") {
                alert("change password success!");
                navigate("/loginPage");
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <WrapperStyleChangePasswordPage>
            <WrapperStyleChangePasswordForm
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <WrapperStyleChangePasswordLable>Đặt lại mật khẩu</WrapperStyleChangePasswordLable>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="Confirm Password"
                    rules={[{ required: true, message: 'Please input your confirm password!' }]}
                >
                    <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ marginTop: "40px" }} onClick={() => (handleChangeConfirmPassword(), handleChangePassword())}>
                        Đổi mật khẩu
                    </Button>
                </Form.Item>

                {error != "" && <div style={{ color: 'red', marginLeft: "50px", marginBottom: "40px" }}>{error}</div>}

            </WrapperStyleChangePasswordForm>
        </WrapperStyleChangePasswordPage>
    );
}

export default ChangePasswordPage;