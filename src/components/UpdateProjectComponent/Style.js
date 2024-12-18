import { Button, Form } from "antd"
import styled from "styled-components"

export const WrapperStyleUpdateForm = styled.div`
    width: 700px;
    height: 600px;
    background-color: #e4e3e8;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 20px;
    text-align: center;
    padding: 20px;
    border: 1px solid violet;
    border-radius: 10px;
`

export const WrapperStyleUpdateProjectForm = styled(Form)`
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