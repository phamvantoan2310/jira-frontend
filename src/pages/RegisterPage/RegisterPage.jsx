import React, { useState } from "react";
import {
    DatePicker,
    Form,
    Input,
    Radio,
    Upload,
} from 'antd';
import { WrapperStyleFormRegister, WrapperStyleRegisterLable, WrapperStyleRegisterPage, WrapperStyleRegisterSubmitButton } from "../../components/RegisterComponent/Style";
import GetBase64 from "../../service/GetBase64";
import { Navigate, useNavigate } from "react-router-dom";
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};





export const RegisterPage = () => {

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [image, setImage] = useState("");

    const [error, setError] = useState("");

    const handleChangeConfirmPassword = (confirmpassword) => {
        if (confirmpassword !== password) {
            setError("password is not equal");
        } else {
            setConfirmPassword(confirmpassword);
        }
    }

    const handleChangeImage = async (info) => {
        if (info.fileList && info.fileList.length > 0) {
            const file = info.fileList[0].originFileObj; // Đảm bảo lấy đúng đối tượng File

            if (file) {
                try {
                    const base64 = await GetBase64(file);
                    setImage(base64);
                    console.log(image)
                } catch (error) {
                    console.error('Error converting file to base64:', error);
                }
            }
        }
    };

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
                    image: image
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
                        alert("login success, login please!");
                    }else{
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

                <WrapperStyleRegisterLable>Đăng ký</WrapperStyleRegisterLable>

                <Form.Item label="Full Name" name={"name"} rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input onChange={(e) => setName(e.target.value)} />
                </Form.Item>

                <Form.Item label="Gender" name={"gender"} rules={[{ required: true, message: 'Please input your gender!' }]}>
                    <Radio.Group onChange={(e) => setGender(e.target.value)}>
                        <Radio value="male"> male </Radio>
                        <Radio value="female"> female </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Password" name={"password"} rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item label="Confirm Password" name={"confirmpassword"} rules={[{ required: true, message: 'Please input your confirm password!' }]}>
                    <Input onChange={(e) => handleChangeConfirmPassword(e.target.value)} />
                </Form.Item>

                <Form.Item label="PhoneNumber" name={"phonenumber"} rules={[{ required: true, message: 'Please input your phone number!' }]}>
                    <Input onChange={(e) => setPhonenumber(e.target.value)} />
                </Form.Item>

                <Form.Item label="Email" name={"email"} rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item label="Birth day" name={"birthday"} rules={[{ required: true, message: 'Please input your birth day!' }]}>
                    <DatePicker  onChange={(date, dateString) => setBirthday(dateString)} />
                </Form.Item>


                <Form.Item label="Ảnh đại diện" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="" listType="picture-card" onChange={handleChangeImage}>
                        <button
                            style={{
                                border: 0,
                                background: 'none',
                            }}
                            type="button"
                        >

                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </button>
                    </Upload>
                </Form.Item>
                {error && <div style={{ color: 'red', marginLeft:"50px", marginBottom:"40px" }}>{error}</div>}
                <Form.Item>
                    <WrapperStyleRegisterSubmitButton onClick={handleRegister}>Submit</WrapperStyleRegisterSubmitButton>
                </Form.Item>

            </WrapperStyleFormRegister>
        </WrapperStyleRegisterPage>
    );
}