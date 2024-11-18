import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { WrapperStyleForgotPasswordForm, WrapperStyleForgotPasswordLable, WrapperStyleForgotPasswordPage } from "../../components/ForgotPasswordComponent/Style";
import { useNavigate } from "react-router-dom";


const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const sendOTP = async () => {
        try {
            const endpoint = `${process.env.REACT_APP_API_KEY}/user/forgotpassword`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                throw new Error("send email fail!");
            }

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.log(error);
        }
    }

    const [email, setEmail] = useState("");

    const [isAbleInputOTP, setIsAlbeInputOTP] = useState(false);

    const [OTP, setOTP] = useState("");

    const handleSendOTP = async () => {
        try {
            const endpoint = `${process.env.REACT_APP_API_KEY}/user/verifyotp`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ OTP }),
            });

            if (!response.ok) {
                throw new Error("OTP verify fail");
            }

            const result = await response.json();
            if (result.status == "OK") {
                if (result.message == "Xác minh thành công") {
                    alert(result.message);
                    navigate(`/changepassword/${email}`)
                } else {
                    alert(result.message);
                }

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <WrapperStyleForgotPasswordPage>
            <WrapperStyleForgotPasswordForm
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <WrapperStyleForgotPasswordLable>Xác thực OTP</WrapperStyleForgotPasswordLable>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                {isAbleInputOTP ?
                    <Form.Item
                        label="OTP"
                        name="OTP"
                        rules={[{ required: true, message: 'Please input OTP!' }]}
                    >
                        <Input onChange={(e) => setOTP(e.target.value)} />
                    </Form.Item>
                    :
                    <Form.Item
                        label="OTP"
                        name="OTP"
                        rules={[{ message: 'Please input OTP!' }]}
                    >
                        <Input disabled />
                    </Form.Item>}



                {isAbleInputOTP ?
                    <div style={{ display: "flex" }}>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => handleSendOTP()}>
                                Xác nhận
                            </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => (setIsAlbeInputOTP(true), sendOTP())}>
                                Gửi lại OTP
                            </Button>
                        </Form.Item>
                    </div>
                    :
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={() => (setIsAlbeInputOTP(true), sendOTP())}>
                            Nhận OTP
                        </Button>
                    </Form.Item>
                }

            </WrapperStyleForgotPasswordForm>
        </WrapperStyleForgotPasswordPage>
    );
}

export default ForgotPasswordPage;