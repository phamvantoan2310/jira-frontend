import { Button, Card, Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import {
    StarFilled,
    ClockCircleOutlined,
    RightCircleOutlined,
    FilterOutlined,
    FolderAddOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

export const CardComponent = ({ IdProject, NameProject, Status, DueDate, StartDate, TypeProject }) => {

    const navigate = useNavigate();

    const handleLinkToDetailProject = () => {
        TypeProject ? navigate(`/project/${IdProject}`) : navigate(`/task/${IdProject}`);
    }




    return (
        <Card title={NameProject} bordered={false} style={{ width: "260px", height: "300px" }}>
            <div style={{ marginTop: "-80px", marginLeft: "210px", fontSize: "20px" }}>
                <RightCircleOutlined style={{ color: "#3399ff" }} onClick={() => handleLinkToDetailProject()} />
            </div>


            <div style={{
                marginTop: "50px",
                fontSize: "20px",
                color: ((Status === "In-Progress") ? "green" : (Status === "Complete") ? "blue" : "orange"),
                display: "flex"
            }}>
                <StarFilled />
                <h3 style={{ marginLeft: "20px" }}>{Status}</h3>
            </div>



            <div style={{ marginTop: "20px", fontSize: "15px" }}>
                <div style={{ color: "blue", display: "flex" }}>
                    <ClockCircleOutlined /> Start:
                    <div style={{ marginLeft: "10px" }}>
                        {StartDate}
                    </div>
                </div>
                <div style={{ color: "gray", display: "flex" }}>
                    <ClockCircleOutlined /> Due:
                    <div style={{ marginLeft: "10px" }}>
                        {DueDate}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", color: "gray" }}>
                ID: {IdProject}
            </div>
        </Card>
    );
}




// DropDown

export const DropDownOptionFilter = ({ items }) => {
    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <FilterOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>

    );
}
export const WrapperCreateButton = (props) => {
    const { size, type } = props;
    const navigate = useNavigate();
    const handleLinkToCreateMission = () => {
        type == "project" ? navigate("/project/createproject") : navigate("/task/createtask");
    }
    return (
        <div>
            <Button size={size} style={{ backgroundColor: "#809fff", width: "150px", color: "white" }} onClick={() => handleLinkToCreateMission()}><FolderAddOutlined /></Button>
        </div>
    );
}
