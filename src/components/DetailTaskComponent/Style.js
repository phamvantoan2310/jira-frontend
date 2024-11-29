import { Button } from "antd"
import styled from "styled-components"

export const WrapperStyleTaskName = styled.div`
    display: flex;
    justify-content: flex-start;
    font-weight: bold;
    font-size: 30px;
    padding-top: 60px;   
    padding-left: 60px;
    width : 450px;
`

export const WrapperStyleStatusTask = styled(Button)`
    justify-content: center;
    margin-top: 100px;
    margin-left: 100px;
    font-size: 20px;
    height: 100px;
    width : 300px;
`
export const WrapperStyleAssignTo = styled.div`
    margin-top: 25px;
    margin-left: 80px;
`
export const WrapperStyleProject = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-right: 80px;
`

export const WrapperStyleDate = styled.div`
    margin-left: 100px;
    margin-top : 50px;
    font-size: 20px;
    width : 300px; 
`
export const WrapperStyleInstructionFile = styled(Button)`
    text-decoration: none;
    color: gray;
    border : 1px solid black;   
`

export const WrapperStyleInstruction = styled.div`
    margin-left: 100px;
    margin-top : 50px;
`

export const WrapperStyleResponse = styled.div`
    margin-left: 50px;
    color: gray;
`

export const WrapperStyleFileResponse = styled.div`
    border: 1px;
    border-radius: 3px;
    width: 700px;
    background-color: white;
    height: 30px;
    margin-top: 20px;
    margin-left: 80px;
    padding: 10px;
`

export const WrapperStyleUpdateTaskButton = styled(Button)`
    border: 1px solid orange;
    width: 150px;
    margin-right: 20px;
`
export const WrapperStyleRemoveFromProjectButton = styled(Button)`
    border: 1px solid brown;
    width: 150px;
    margin-left: 490px;
    margin-top: 30px;
`
export const WrapperStyleAddUserButton = styled(Button)`
    border: 1px solid blue;
    width: 150px;
    margin-left: 600px;
`
export const WrapperStyleDeleteButton = styled(Button)`
    border: 1px solid red;
    width: 150px;
`

export const WrapperStyleAddUserForm = styled.div`
    width: 1000px;
    height: 700px;
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
export const WrapperStyleDescription = styled.div`
    width: 700px;
    height: 300px;
    background-color: gray;
    color: white;
    position: fixed;
    top: 30%;
    left: 27%;
    padding: 10px;
    border-radius: 10px;
`