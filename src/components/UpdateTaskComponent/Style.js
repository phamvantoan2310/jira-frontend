import { Button, Form } from "antd";
import styled from "styled-components";

export const WrapperStyleUpdateForm = styled.div`
    width: 700px;
    height: 600px;
    background-color: #e6e6e6;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 20px;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
`

export const WrapperStyleUpdateTaskForm = styled(Form)`
    margin-left : 50px;
    margin-top: 50px;
`

export const WrapperStyleSubmitButton = styled(Button)`
    background-color: green;
    color: white;
    width: 100px;
    margin-left: 230px;
    margin-top : 20px;
`