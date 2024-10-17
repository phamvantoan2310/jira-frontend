import React from "react";
import { Button, Row } from "antd";
import styled from "styled-components";
import Search from "antd/es/transfer/search";
import {
    AuditOutlined,
    LoginOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";



export const WrapperHeaderSearch = (props) => {
    const { size, placehoder, textbutton, setSearchTerm, onSearch } = props;

    return (
        <div style={{ display: "flex" }}>
            <Search
                placeholder={placehoder}
                allowClear
                enterButton="Search"
                size={size}
                onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <Button size={size} placehoder={placehoder} style={{ backgroundColor: "" }} onClick={onSearch}>{textbutton}</Button>
        </div>
    );
}

export const WrapperHeaderButton = (props) => {
    const { size, backgroundcolor, textbutton, typeMission } = props;
    const navigate = useNavigate();
    const handleLinkToCreateMission = ( typeMission ) => {
        typeMission ? navigate("/project/createproject") : navigate("/task/createtask");
    }
    return (
        <div>
            <Button size={size} style={{ backgroundColor: backgroundcolor, marginLeft: "30px", width: "200px", color: "white" }} onClick={() => handleLinkToCreateMission(typeMission)}><AuditOutlined />{textbutton}</Button>
        </div>
    );
}
export const WrapperHeaderButtonLogin = () => {
    const navigate = useNavigate();

    const handleLinkToLoginFrom = () => {
        navigate("/loginPage");
    }

    return (
        <div>
            <Button size="large" style={{ backgroundColor: "rgba(0, 0, 255, 0.3)", marginLeft: "100px", color: "white" }} onClick={() => handleLinkToLoginFrom()}><LoginOutlined /></Button>
        </div>
    );
}

export const WrapperHeaderButtonUser = () => {
    const navigate = useNavigate();

    const handleLinkToUserDetailPage = () => {
        navigate("/user/userdetail");
    }

    return (
        <div>
            <Button size="large" style={{ backgroundColor: "rgba(0, 0, 255, 0.3)", marginLeft: "100px", color: "white" }} onClick={handleLinkToUserDetailPage}><UserOutlined /></Button>
        </div>
    );
}