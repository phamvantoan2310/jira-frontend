import { Button } from "antd";
import React from "react";


export const TypeProject = ({ name, color }) => {
    return (
        <div style={{ fontSize: "20px", font: "-moz-initial", color: "gray", paddingRight: "20px" }}>
            {name}
        </div>
    );
}