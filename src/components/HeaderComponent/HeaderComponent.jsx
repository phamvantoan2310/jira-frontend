import { Col } from "antd";
import React, { useState } from "react";
import { WrapperHeaderButton, WrapperHeaderButtonLogin, WrapperHeaderButtonUser, WrapperHeaderSearch } from "./Component";
import { WrapperHeader, WrapperHeaderText } from "./style";
const HeaderComponent = ({ setNameMission, search, error }) => {

    const jwt = localStorage.getItem("tokenLogin");


    return (
        <div>
            <WrapperHeader>
                <Col span={7}><WrapperHeaderText>Jira Clone</WrapperHeaderText></Col>

                <Col span={15}>
                    <WrapperHeaderSearch size={"large"} placeholder={"input search"} textbutton={"Search"} onSearch={search} setSearchTerm={setNameMission} />
                </Col>
                
                <Col span={2}>
                    {(!jwt || error==true) ? <WrapperHeaderButtonLogin /> : <WrapperHeaderButtonUser />}
                </Col>
            </WrapperHeader>
        </div>
    );
}

export default HeaderComponent;