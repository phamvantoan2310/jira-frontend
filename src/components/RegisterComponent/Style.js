import { Button, Form } from "antd";
import React from "react";
import styled from "styled-components";

export const WrapperStyleRegisterPage = styled.div`
    background-color: gray;
    display: flex;
    justify-content: center;
    height: 800px;
`

export const WrapperStyleFormRegister = styled(Form)`
    width: 1000px;   
    height: 700px;
    background-color: white;
    margin-top: 50px;
    padding: 30px;
    padding-top: 20px;
    border-radius: 10px;
`

export const WrapperStyleRegisterLable = styled.h2`
    display: flex;
    justify-content: center;
    margin-top: 230px;
    color: blue;
    font-size: 30px;
`

export const WrapperStyleRegisterSubmitButton = styled(Button)`
    margin-left: 425px;
    margin-top: 50px;
    width: 100px;
    background-color: #0066ff;
    color: #fff;
`