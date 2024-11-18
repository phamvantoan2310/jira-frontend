import { Button, Form } from "antd";
import styled from "styled-components";

export const WrapperStyleCreateTaskPage = styled.div`
    margin-left: 430px;
    background-color: white;
    height: 650px;
    width: 700px;
    font-family: Arial;
    border-radius: 10px;
`
export const WrapperStyleCreateTaskTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: gray;
    padding: 20px;
    font-family: Arial;
`
export const WrapperStyleCreateTaskForm = styled(Form)`
    margin-left: 100px;
    margin-top: 50px;
`

export const WrapperStyleSubmitButton = styled(Button)`
    background-color: green;
    color: white;
    width: 100px;
    margin-left: 450px;
`