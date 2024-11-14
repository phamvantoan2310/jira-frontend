import { Col } from "antd";
import React, { useState } from "react";
import { WrapperHeaderButton, WrapperHeaderButtonLogin, WrapperHeaderButtonUser, WrapperHeaderSearch } from "./Component";
import { WrapperHeader, WrapperHeaderText } from "./style";
const HeaderComponent = ({ setNameMission, search, error }) => {

    const jwt = localStorage.getItem("tokenLogin");


    return (
        <div>
            <WrapperHeader>
                <Col span={4}><WrapperHeaderText>Jira Clone</WrapperHeaderText></Col>

                <Col span={10}>
                    <WrapperHeaderSearch size={"large"} placeholder={"input search"} textbutton={"Search"} onSearch={search} setSearchTerm={setNameMission} />
                </Col>
                <Col span={8}>
                    <div style={{ display: "flex" }}>
                        <WrapperHeaderButton size={"large"} backgroundcolor={"#809fff"} textbutton={"project"} typeMission={true} />
                        <WrapperHeaderButton size={"large"} backgroundcolor={"#ffcccc"} textbutton={"task"} typeMission={false} />
                    </div>
                </Col>
                <Col span={2}>
                    {(!jwt || error==true) ? <WrapperHeaderButtonLogin /> : <WrapperHeaderButtonUser />}
                </Col>
            </WrapperHeader>
        </div>
    );
}

export default HeaderComponent;