import { Button } from "antd";
import React from "react";
import styled from "styled-components";

export const WrapperStyleDetailProject = styled.div`
    margin: 120px;
    background-color: #f2f2f2;
    height: 1100px;
    margin-top: 0px;
    font-family: Arial;
    font-size: 20px;
`

export const WrapperStyleProjectName = styled.div`
    display: flex;
    justify-content: flex-start;
    font-weight: bold;
    font-size: 30px;
    padding-top: 60px; 
    padding-left: 60px;  
`

export const WrapperStyleStatusProject = styled(Button)`
    justify-content: center;
    margin-top: 100px;
    margin-left: 100px;
    font-size: 20px;
    height: 100px;
    width : 300px;
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
`

export const WrapperStyleInstruction = styled.div`
    margin-left: 100px;
    margin-top : 50px;
`

export const WrapperStyleTaskInProject = styled.div`
    margin-left: 50px;
`
export const WrapperStyleUserInProject = styled.div`
    margin-left: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap; /* Để các nút có thể xuống dòng khi không đủ không gian */ 
`

export const WrapperStyleTaskButton = styled(Button)`
    width: 500px;
    margin-top: 20px;
    margin-right: 20px
`

export const WrapperStyleUserButton = styled(Button)`
    width: 500px;
    margin-top: 20px;
    margin-right: 20px;
    margin-left: 80px;
`

export const WrapperStyleUpdateProjectButton = styled(Button)`
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
    margin-right: 20px;
    
`
export const WrapperStyleAddTaskButton = styled(Button)`
    border: 1px solid green;
    width: 150px;
    
`
export const WrapperStyleUpdate = styled.div`
    margin-left: 565px;
    display: flex;
`

export const WrapperStyleAddTaskForm = styled.div`
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
export const WrapperStyleAddUserForm = styled.div`
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