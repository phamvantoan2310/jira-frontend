import { Button, Form } from "antd";
import styled from "styled-components";

export const WrapperStyleCreateTaskPage = styled.div`
    margin: 50px;
    margin-top: 0px;
    background-color: white;
    height: 1000px;
`
export const WrapperStyleCreateTaskTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: gray;
    padding: 20px;
    font-family: Arial;
`
export const WrapperStyleCreateTaskForm = styled(Form)`
    margin-left: 450px;
    margin-top: 50px;
`
export const WrapperStyleChooseProjectButton = styled(Button)`
    background-color: #e0e0eb;
    width: 150px;
    margin-left: 100px;
`

export const WrapperStyleSubmitButton = styled(Button)`
    background-color: green;
    color: white;
    width: 100px;
    margin-left: 340px;
`