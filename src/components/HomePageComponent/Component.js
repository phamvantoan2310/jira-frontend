import { Card, Dropdown, Space } from "antd";
import React, { useEffect } from "react";
import {
    StarFilled,
    ClockCircleOutlined,
    RightCircleOutlined,
    FilterOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

export const CardComponent = ({ IdProject, NameProject, Status, DueDate, StartDate, TypeProject }) => {

    const navigate = useNavigate();

    const handleLinkToDetailProject = () =>{
        TypeProject ? navigate(`/project/${IdProject}`) : navigate(`/task/${IdProject}`);
    }




    return (
        <Card title={NameProject} bordered={false} style={{ width: "250px", height: "340px" }}>
            <div style={{ marginTop: "-80px", marginLeft: "200px", fontSize: "20px" }}>
                <RightCircleOutlined style={{ color: "#3399ff" }} onClick={()=>handleLinkToDetailProject()}/>
            </div>


            {Status == "In-Progress" ?                             //toán tử 3 ngôi lồng nhau(inprogress: green, completed: blue, not started: orange)
                (<div style={{ marginTop: "50px", fontSize: "20px", color: "green", display: "flex" }}>
                    <StarFilled />
                    <h3 style={{ marginLeft: "20px" }}>{Status}</h3>
                </div>) :

                (Status == "Complete" ?
                    (<div style={{ marginTop: "50px", fontSize: "20px", color: "blue", display: "flex" }}>
                        <StarFilled />
                        <h3 style={{ marginLeft: "20px" }}>{Status}</h3>
                    </div>) :

                    <div style={{ marginTop: "50px", fontSize: "20px", color: "orange", display: "flex" }}>
                        <StarFilled />
                        <h3 style={{ marginLeft: "20px" }}>{Status}</h3>
                    </div>
                )}


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
            <div style={{ marginTop: "55px", display: "flex", justifyContent: "center", color: "gray" }}>
                ID: {IdProject}
            </div>
        </Card>
    );
}




// DropDown

export const DropDownOptionFilter = ({items}) => {
    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                    <FilterOutlined/>
                    </Space>
                </a>
            </Dropdown>
        </div>

    );
}
