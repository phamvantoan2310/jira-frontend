import { Button } from "antd"
import styled from "styled-components"

export const WrapperStyleDetaiTask = styled.div`
    margin: 120px;
    background-color: #dbd6df;
    height: 1100px;
    margin-top: 0px;
    font-family: Arial;
    font-size: 20px;
`

export const WrapperStyleTaskName = styled.div`
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 30px;
    padding-top: 60px;   
`

export const WrapperStyleStatusTask = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    margin-right: 80px;
`

export const WrapperStyleDate = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin-right: 80px;
`
export const WrapperStyleInstructionFile = styled.a`
    text-decoration: none;
    padding-left: 78px;
    color: #009933;
`

export const WrapperStyleInstruction = styled.div`
    width: 900px;
    margin-left: 50px;
    margin-top: -60px;
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
export const WrapperStyleAddUserButton = styled(Button)`
    border: 1px solid blue;
    width: 150px;
    margin-right: 20px;
`
export const WrapperStyleDeleteButton = styled(Button)`
    border: 1px solid red;
    width: 150px;
`
export const WrapperStyleUpdate = styled.div`
    margin-left: 735px;
    display: flex;
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