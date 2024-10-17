import React, { useEffect, useState } from "react";
import { WrapperStyleAddUserForm, WrapperStyleDate, WrapperStyleFileResponse, WrapperStyleInstruction, WrapperStyleInstructionFile, WrapperStyleResponse, WrapperStyleStatusTask } from "./Style";

import {
    FileWordFilled,
    CloseCircleFilled,
} from '@ant-design/icons';
import { Button, Card, Input, List } from "antd";

export const StatusComponent = ({ status }) => {
    return (
        <WrapperStyleStatusTask>
            <p style={{ marginRight: "15px" }}>Status:</p>
            <p style={{ color: "green" }}>{status}</p>
        </WrapperStyleStatusTask>
    );
}

export const DateComponent = ({ dueDate, startDate }) => {
    return (
        <WrapperStyleDate>
            <p style={{ color: "#6699ff" }}>Start: {startDate}</p>
            <p style={{ color: "orange" }}>Due: {dueDate}</p>
        </WrapperStyleDate>
    );
}

export const AssignToComponent = ({ emailUser }) => {
    return (
        <WrapperStyleStatusTask>
            <p style={{ marginRight: "15px" }}>Assign to:</p>
            <p style={{ color: "green" }}>{emailUser}</p>
        </WrapperStyleStatusTask>
    );
}

export const InstructionTaskComponent = ({ content, instructionFile }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    useEffect(() => {
        if (instructionFile) {
            const base64String = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${instructionFile}`;

            // Chuyển đổi Base64 thành Blob
            const base64ToBlob = (base64Data, contentType) => {
                const byteCharacters = atob(base64Data.split(',')[1]);
                const byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }

                return new Blob(byteArrays, { type: contentType });
            };

            // Chuyển Base64 thành Blob và tạo URL
            const pdfBlob = base64ToBlob(base64String, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            const url = URL.createObjectURL(pdfBlob);

            // Lưu URL
            setPdfUrl(url);
        }
    }, [instructionFile]);


    return (
        <WrapperStyleInstruction>
            <div style={{ display: "flex" }}>
                <p style={{ marginRight: "30px", color: "gray" }}>Note: </p>
                <p>{content}</p>
            </div>
            <WrapperStyleInstructionFile href={pdfUrl} download="file.docx" style={{ color: 'blue', textDecoration: 'underline' }}>
                download instruction file
                <FileWordFilled />
            </WrapperStyleInstructionFile>
        </WrapperStyleInstruction>
    );
}

export const TaskResponseComponent = () => {
    return (
        <WrapperStyleResponse>
            <div>Submit: </div>
            <WrapperStyleFileResponse>
                <input type="file" id="inputGroupFile01" />
            </WrapperStyleFileResponse>
        </WrapperStyleResponse>
    );
}

export const AddUserToTaskComponent = ({ projectId, taskId, onClose }) => {
    const token = localStorage.getItem("tokenLogin");

    const [userIdInput, setUserIdInput] = useState("")
    const [userIdWantToAdd, setUserIdWantToAdd] = useState("");

    //lấy user trong project chứa task bằng id project
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function getDetailProject() {
            const endpoint = `${process.env.REACT_APP_API_KEY}/project/getprojectbyprojectid/${projectId}`;
            try {
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });


                if (!response.ok) {
                    throw new Error("get project fail");
                }

                const responseData = await response.json();
                setUsers(responseData.data.users);
            } catch (error) {
                console.log(error);
            }
        }
        getDetailProject();
    }, [projectId])


    const handleAddUserToTask = async () => {
        const endpoint = `${process.env.REACT_APP_API_KEY}/task/assigntasktouser/${taskId}`;
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ assign_to: userIdWantToAdd }),
            });

            if (!response.ok) {
                throw new Error("Assign task to user fail");
            }

            const result = await response.json();
            if (result.status === "OK") {
                alert("Assign success");
            }
            else {
                alert(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <WrapperStyleAddUserForm>
            <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "1px" }} onClick={onClose} />
            <h3>Add User</h3>

            {!projectId && <div style={{ display: "flex" }}>
                <Input placeholder="User ID" onChange={(e) => setUserIdInput(e.target.value)} />
                <Button style={{ backgroundColor: "blanchedalmond", color: "gray" }} onClick={() => setUserIdWantToAdd(userIdInput)}>ADD</Button>
            </div>}

            {/*show id cần tìm nếu không phải rỗng */}
            {userIdWantToAdd !== "" &&
                <div>
                    <Button style={{ width: "300px", marginTop: "20px", marginRight: "10px" }}>{userIdWantToAdd}</Button>
                    <Button style={{ backgroundColor: "#e6e6e6", border: "none" }} onClick={(() => setUserIdWantToAdd(""))}><CloseCircleFilled style={{ color: "gray" }} /></Button>
                </div>}

            <List
                style={{ marginTop: "40px", height: "300px", overflowY: "scroll" }}
                grid={{ gutter: 16, column: 3 }}
                dataSource={users}
                renderItem={(user) => (
                    <List.Item>
                        <Button onClick={() => setUserIdWantToAdd(user._id)}>
                            <Card title={user._id}>{user.email}</Card>
                        </Button>
                    </List.Item>
                )}
            />

            <Button style={{ marginTop: "70px", marginLeft: "460px", display: "block", backgroundColor: "grey" }} onClick={handleAddUserToTask}>Submit</Button>

        </WrapperStyleAddUserForm >
    )
}