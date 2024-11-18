import { Button } from "antd";
import React from "react";
import styled from "styled-components";

export const WrapperStyleDetailProject = styled.div`
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
    border : 1px solid black;   
`

export const WrapperStyleInstruction = styled.div`
    margin-left: 100px;
    margin-top : 50px;
`
export const WrapperStyleUserInProject = styled.div`
    margin-left: 50px;
    padding: 20px;
    gap: 5px;
`

export const WrapperStyleTaskButton = styled(Button)`
    width: 150px;
    height: 150px;
    font-size: 20px;
    font-weight: bold;
`

export const WrapperStyleUpdateProjectButton = styled(Button)`
    border: 1px solid orange;
    width: 150px;
    margin-right: 20px;
`
export const WrapperStyleAddUserButton = styled(Button)`
    border: 1px solid blue;
    width: 150px;
    margin-left : 600px;
`
export const WrapperStyleDeleteButton = styled(Button)`
    border: 1px solid red;
    width: 150px;
    margin-right: 20px;
    
`
export const WrapperStyleAddTaskButton = styled(Button)`
    border: 1px solid green;
    width: 150px;
    margin-left: 490px;
    margin-bottom: 20px;
`
export const WrapperStyleUpdate = styled.div`
    display: flex;
`

export const WrapperStyleAddTaskForm = styled.div`
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
export const WrapperStyleAddUserForm = styled.div`
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

export const WrapperStyleFilter = styled.div`
    display: flex;
    font-size: 20px;
    align-items: center;
    margin-right: 100px;
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
export const WrapperStyleUserInformation = styled.div`
    width: 500px;
    height: 300px;
    background-color: #e4e3e8;
    color: gray;
    position: fixed;
    top: 30%;
    left: 33%;
    border: 1px solid violet;
    padding: 10px;
    border-radius: 10px;
`