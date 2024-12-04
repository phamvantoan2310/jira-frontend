import React, { useState } from "react";
import { WrapperStyleCreateProjectForm, WrapperStyleCreateProjectPage, WrapperStyleCreateProjectTitle, WrapperStyleSubmitButton } from "../../components/CreateProjectPageComponent/Style";
import { DatePicker, Form, Input, Upload, } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";

import {
    CloseCircleFilled,
} from '@ant-design/icons';
import GetBase64 from "../../service/GetBase64";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";


const { TextArea } = Input;

export const CreateProjectPage = () => {

    const navigate = useNavigate();
    const handleLinkToHomePage = () => {
        navigate(`/`);
    }

    const token = localStorage.getItem("tokenLogin");
    const [isExpiredToken, setIsExpiredToken] = useState(false);

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [instructionFile, setInstructionFile] = useState("");

    const [error, setError] = useState("");

    const handleChangeFile = async (info) => {
        if (info.fileList && info.fileList.length > 0) {
            const file = info.fileList[0].originFileObj; // Đảm bảo lấy đúng đối tượng File

            if (file) {
                try {
                    const base64 = await GetBase64(file);
                    setInstructionFile(base64);
                } catch (error) {
                    console.error('Error converting file to base64:', error);
                }
            }
        }
    };


    const handleCreateProject = async () => {
        const endpoint = `${process.env.REACT_APP_API_KEY}/project/createproject`;
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: projectName,
                    description: description,
                    start: startDate,
                    due: dueDate,
                    instruction_file: instructionFile
                }),
            }).then(
                async response => {
                    if (response.ok) {
                        setIsExpiredToken(false);
                        return response.json();
                    } else {
                        const errorResult = await response.json();
                        if (errorResult.message == "token expired") {
                            alert("Phiên đăng nhập hết hạn!");
                            setIsExpiredToken(true);
                        }
                        throw new Error("create project fail");
                    }
                }
            ).then(
                result => {
                    if (result.status === "OK") {
                        alert("create project success!");
                        <Navigate replace to="/project/createproject" />
                        setError(result.message);
                    } else {
                        <Navigate replace to="/project/createproject" />
                        setError(result.message);
                    }
                }
            )
        } catch (error) {
            console.log(error);
            alert("create task fail")
        }
    }


    return (
        <div>
            <HeaderComponent error={isExpiredToken}/>
            <div style={{ backgroundColor: "#b3b3cc", height: "700px" }}>
                <WrapperStyleCreateProjectPage>
                    <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "5px", fontSize: "20px" }} onClick={() => handleLinkToHomePage()} />
                    <WrapperStyleCreateProjectTitle>Create Project</WrapperStyleCreateProjectTitle>
                    <WrapperStyleCreateProjectForm labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}>
                        <Form.Item label="Project Name">
                            <Input onChange={(e) => setProjectName(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Description">
                            <TextArea rows={4} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Start Date">
                            <DatePicker onChange={(date, dateString) => setStartDate(dateString)} />
                        </Form.Item>

                        <Form.Item label="Due Date">
                            <DatePicker onChange={(date, dateString) => setDueDate(dateString)} />
                        </Form.Item>

                        <Form.Item label="Instruction file" valuePropName="fileList">
                            <Upload action="/upload.do" listType="picture-card" accept=".docx" onChange={handleChangeFile}>
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <WrapperStyleSubmitButton onClick={handleCreateProject}>Tạo</WrapperStyleSubmitButton>
                        </Form.Item>
                        {error && <div style={{ color: 'red', marginLeft: "200px", marginTop:"-20px" }}>{error}</div>}
                    </WrapperStyleCreateProjectForm>
                </WrapperStyleCreateProjectPage>
            </div>
        </div>
    );
}