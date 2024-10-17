import { Button, Form } from "antd";
import styled from "styled-components";

export const WrapperStyleCreateProjectPage = styled.div`
    margin: 50px;
    margin-top: 0px;
    background-color: white;
    height: 1000px;
`
export const WrapperStyleCreateProjectTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: gray;
    padding: 20px;
    font-family: Arial;
`
export const WrapperStyleCreateProjectForm = styled(Form)`
    margin-left: 450px;
    margin-top: 50px;
`
export const WrapperStyleSubmitButton = styled(Button)`
    background-color: green;
    color: white;
    width: 100px;
    margin-left: 340px;
`