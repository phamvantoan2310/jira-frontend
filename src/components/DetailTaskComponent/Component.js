import React, { useEffect, useState } from "react";
import { WrapperStyleAddUserForm, WrapperStyleAssignTo, WrapperStyleDate, WrapperStyleDescription, WrapperStyleFileResponse, WrapperStyleInstruction, WrapperStyleInstructionFile, WrapperStyleProject, WrapperStyleResponse, WrapperStyleStatusTask } from "./Style";

import {
    FileWordFilled,
    CloseCircleFilled,
    MailOutlined,
    SmileOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import { Button, Card, Input, List } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export const StatusComponent = ({ status }) => {
    return (
        <WrapperStyleStatusTask>
            <p style={{ marginRight: "15px" }}>Status:</p>
            <p style={{ color: "green" }}>{status}</p>
        </WrapperStyleStatusTask>
    );
}

export const DateComponent = ({ dueDate, startDate }) => {
    const [dateRange, setDateRange] = useState([null, null]);

    useEffect(() => {
        if (startDate && dueDate) {
            setDateRange([moment(startDate), moment(dueDate)]);
        }
    }, [startDate, dueDate]);
    return (
        <WrapperStyleDate>
            <RangePicker
                status="warning"
                value={dateRange}
                style={{ fontSize: "30px", fontWeight: "bold" }}
                disabled
            />
        </WrapperStyleDate>
    );
}

export const AssignToComponent = ({ emailUser, name, phonenumber }) => {
    return (
        <WrapperStyleAssignTo>
            <div style={{ display: "flex", fontSize:"20px" }}>
                <SmileOutlined style={{marginRight:"15px", color:"black"}}/>
                <p style={{ color: "gray" }}>{name}</p>
            </div>
            <div style={{ display: "flex", fontSize:"20px" }}>
                <MailOutlined style={{marginRight:"15px", color:"black"}}/>
                <p style={{ color: "gray" }}>{emailUser}</p>
            </div>
            <div style={{ display: "flex", fontSize:"20px" }}>
                <PhoneOutlined style={{marginRight:"15px", color:"black"}}/>
                <p style={{ color: "gray" }}>{phonenumber}</p>
            </div>

        </WrapperStyleAssignTo>
    );
}

export const TaskInProjectComponent = ({ projectName, projectId, startDate, dueDate, status }) => {
    const navigate = useNavigate();
    const handleNavigateProjectDetail = () => {
        navigate(`/project/${projectId}`)
    }

    const [dateRange, setDateRange] = useState([null, null]);

    useEffect(() => {
        if (startDate && dueDate) {
            setDateRange([moment(startDate), moment(dueDate)]);
        }
    }, [startDate, dueDate]);

    return (
        <WrapperStyleProject>
            <div style={{ display: 'flex', gap: "10px" }}>
                <div style={{ marginRight: "80px" }}>
                    <Button style={{ fontSize: "40px", backgroundColor: "#2828d0", height: "60px", width: "300px" }} onClick={() => handleNavigateProjectDetail()}><p style={{ color: "white" }}>{projectName}</p></Button>
                    <p style={{ paddingTop: "20px", fontSize: "20px", color: "green" }}>{status}</p>
                </div>
                <RangePicker
                    status="warning"
                    value={dateRange}
                    style={{ fontSize: "30px" }}
                    disabled
                />
            </div>

        </WrapperStyleProject>
    );
}


export const InstructionTaskComponent = ({ content, instructionFile, showDescription }) => {
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
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <p style={{ color: "gray", marginRight: "10px" }}>Note: </p>
                <p style={{
                    maxWidth: "350px",
                    display: "-webkit-box",     // Hiển thị dưới dạng box
                    WebkitBoxOrient: "vertical", // Định hướng dọc
                    overflow: "hidden",         // Ẩn nội dung vượt quá
                    WebkitLineClamp: 3,         // Giới hạn 3 dòng
                    textOverflow: "ellipsis",   // Hiển thị dấu "..." khi vượt quá
                }} onClick={() => showDescription()}>
                    {content}
                </p>
            </div>
            <WrapperStyleInstructionFile href={pdfUrl} download="instruction-file.docx" style={{ textDecoration: 'underline' }}>
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

    const navigate = useNavigate();

    const [userIdInput, setUserIdInput] = useState("")
    const [userIdWantToAdd, setUserIdWantToAdd] = useState("");

    //lấy danh sách user trong project chứa task bằng id project
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
                navigate(0);
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
            <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "1px", fontSize:"20px" }} onClick={onClose} />
            <h3 style={{fontSize:"30px"}}>Assign User</h3>

            {/*hiển thị search nếu task không nằm trong project nào*/}
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
                style={{ marginTop: "40px", height: "450px", overflowY: "scroll", overflowX:"hidden" }}
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

            <Button style={{ marginLeft: "460px", display: "block", backgroundColor: "grey" }} onClick={handleAddUserToTask}>Submit</Button>

        </WrapperStyleAddUserForm >
    )
}

export const DescriptionComponent = ({ description, hiddenDescription }) => {
    return (
        <WrapperStyleDescription>
            <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "1px" }} onClick={() => hiddenDescription()} />
            <p style={{ display: "flex", justifyContent: "center" }}> Description</p>
            <p>{description}</p>
        </WrapperStyleDescription>
    );
}