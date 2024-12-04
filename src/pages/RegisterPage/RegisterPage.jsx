import React, { useState } from "react";
import {
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
} from 'antd';
import { WrapperStyleFormRegister, WrapperStyleRegisterLable, WrapperStyleRegisterPage, WrapperStyleRegisterSubmitButton } from "../../components/RegisterComponent/Style";
import { Navigate, useNavigate } from "react-router-dom";
import {
    ManOutlined,
    WomanOutlined,
    LockOutlined,
    PhoneOutlined,
    MailOutlined,
    CalendarOutlined
} from '@ant-design/icons';





export const RegisterPage = () => {

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const [error, setError] = useState("");

    const handleChangeConfirmPassword = (confirmpassword) => {
        if (confirmpassword !== password) {
            setError("password is not equal");
        } else {
            setConfirmPassword(confirmpassword);
            setError("");
        }
    }

    const navigate = useNavigate();


    const handleRegister = async () => {
        const endpoint = `${process.env.REACT_APP_API_KEY}/user/sign-up`;
        try {
            await fetch(endpoint, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone_number: phonenumber,
                    password: password,
                    confirm_password: confirmPassword,
                    gender: gender,
                    birthday: birthday,
                })
            }).then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("register fail");
                    }
                }
            ).then(
                result => {
                    if (result.status === "OK") {
                        navigate("/loginPage");
                        alert("register success, login please!");
                    } else {
                        <Navigate replace to="/registerPage" />
                        setError(result.message);
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <WrapperStyleRegisterPage>
            <WrapperStyleFormRegister labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 1000 }}>
                <Row type="flex" style={{ height: '100%' }} justify="space-around" align="middle">
                    <Col flex="auto" style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
                        <p style={{ color: "gray", fontWeight: "bold", fontSize: "35px", margin: "20px" }}>JIRA CLONE</p>
                        <WrapperStyleRegisterLable>Đăng ký</WrapperStyleRegisterLable>
                        <div style={{display:"flex", justifyContent:"center", marginTop: "10px"}}>
                            <a href="/loginPage">bạn đã có sẵn tài khoản?</a>
                        </div>
                    </Col>



                    <Col flex="auto" style={{ backgroundColor: '#d9d9d9', height: '100%', width: "400px" }}>
                        <div style={{ marginTop: "150px", marginLeft: "100px" }}>
                            <Form.Item label="name" name={"name"} rules={[{ required: true, message: 'Please input your name!' }]}>
                                <Input onChange={(e) => setName(e.target.value)} placeholder="name" />
                            </Form.Item>

                            <Form.Item label="gen" name={"gender"} rules={[{ required: true, message: 'Please input your gender!' }]}>
                                <Radio.Group onChange={(e) => setGender(e.target.value)}>
                                    <Radio value="male"> <ManOutlined /> </Radio>
                                    <Radio value="female"> <WomanOutlined /> </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label={<LockOutlined />} name={"password"} rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                            </Form.Item>

                            <Form.Item label={<LockOutlined />} name={"confirmpassword"} rules={[{ required: true, message: 'Please input your confirm password!' }]}>
                                <Input onChange={(e) => handleChangeConfirmPassword(e.target.value)} placeholder="confirm password" />
                            </Form.Item>

                            <Form.Item label={<PhoneOutlined />} name={"phonenumber"} rules={[{ required: true, message: 'Please input your phone number!' }]}>
                                <Input onChange={(e) => setPhonenumber(e.target.value)} placeholder="phone number" />
                            </Form.Item>

                            <Form.Item label={<MailOutlined />} name={"email"} rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                            </Form.Item>

                            <Form.Item label={<CalendarOutlined />} name={"birthday"} rules={[{ required: true, message: 'Please input your birth day!' }]}>
                                <DatePicker onChange={(date, dateString) => setBirthday(dateString)} placeholder="birthday" />
                            </Form.Item>
                        </div>
                        <WrapperStyleRegisterSubmitButton onClick={handleRegister}>Register</WrapperStyleRegisterSubmitButton>
                    </Col>
                </Row>



                {error && <div style={{ color: 'red', marginLeft: "400px", marginBottom: "10px" }}>{error}</div>}





            </WrapperStyleFormRegister>
        </WrapperStyleRegisterPage>
    );
}