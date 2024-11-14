import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { WrapperStyleDetailUser, WrapperStyleDetailUserTitle, WrapperStyleLogoutButton, WrapperStylePassWordButton, WrapperStyleSubmitButton } from "../../components/UserDetailPageComponent/Style";
import { DatePicker, Form, Input, Upload } from "antd";

import {
    CloseCircleFilled,
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const UserDetailPage = () => {
    const token = localStorage.getItem("tokenLogin");

    const navigate = useNavigate();

    const [user, setUser] = useState();

    useEffect(() => {
        async function getUser() {
            const endpoint = `${process.env.REACT_APP_API_KEY}/user/getuser`;
            try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error("get user fail");
                }

                const result = await response.json();
                console.log(result);
                if (result.status === 'OK') {
                    setUser(result.data);
                } else {
                    alert("get user fail");
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [])


    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setPhoneNumber(user?.phone_number);
        setBirthday(validBirthday);
    }, [user])



    const validBirthday = moment(user?.birthday, "YYYY-MM-DD", true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("tokenLogin");
        navigate("/loginPage");
    }

    const handleLinkToUpdatePassword = () => {
        navigate(`/changepassword/${user?.email}`)
    }

    const handleBackToHomePage = () => {
        navigate("/");
    }

    return (
        <div>
            <HeaderComponent />
            <WrapperStyleDetailUser>
                <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "5px", fontSize: "20px" }} onClick={() => handleBackToHomePage()} />
                <WrapperStyleDetailUserTitle>Detail User</WrapperStyleDetailUserTitle>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600, marginLeft: "350px", marginTop: "50px" }}>
                    <Form.Item label="ID">
                        <Input style={{color: "black"}} value={user?._id} disabled/>
                    </Form.Item>
                    <Form.Item label="Name">
                        <Input onChange={(e) => setName(e.target.value)} value={name} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input onChange={(e) => setEmail(e.target.value)} value={email} />
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        <Input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                    </Form.Item>

                    <Form.Item label="Birthday">
                        <DatePicker onChange={(date) => setBirthday(date ? date.format("YYYY-MM-DD") : "")}
                            value={birthday ? moment(birthday, "YYYY-MM-DD") : null}
                            format="YYYY-MM-DD" />
                    </Form.Item>

                    <div style={{ display: "flex" }}>
                        <Form.Item>
                            <WrapperStyleSubmitButton >Update</WrapperStyleSubmitButton>
                        </Form.Item>
                        <Form.Item>
                            <WrapperStylePassWordButton onClick={() => handleLinkToUpdatePassword()}>Change Password</WrapperStylePassWordButton>
                        </Form.Item>
                    </div>
                </Form>
                <WrapperStyleLogoutButton onClick={handleLogout}>logout</WrapperStyleLogoutButton>
            </WrapperStyleDetailUser>
        </div>
    )
}