import React, { useEffect, useState } from "react";
import { WrapperStyleAddTaskForm, WrapperStyleAddUserForm, WrapperStyleDate, WrapperStyleDescription, WrapperStyleInstruction, WrapperStyleInstructionFile, WrapperStyleStatusProject, WrapperStyleUserInformation } from "./Style";
import {
    DownloadOutlined,
    CloseCircleFilled,
    FilterOutlined,
    PhoneOutlined,
    IdcardOutlined,
    SmileOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { DatePicker } from 'antd';
import moment from "moment";

const { RangePicker } = DatePicker;

export const StatusComponent = ({ status }) => {
    return (
        <WrapperStyleStatusProject>
            <p style={{ marginRight: "15px" }}>Status:</p>
            <p style={{ color: "green" }}>{status}</p>
        </WrapperStyleStatusProject>
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
                format={"YYYY-MM-DD"}
                disabled
            />
        </WrapperStyleDate>
    );
}

export const InstructionProjectComponent = ({ content, instructionFile, showDescription }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    useEffect(() => {
        if (instructionFile) {
            const base64String = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${instructionFile}`;

            // Chuyển đổi Base64 thành Blob
            const base64ToBlob = (base64Data, contentType) => {
                const byteCharacters = atob(base64Data.split(',')[1]);    //chuỗi ký tự nhị phân
                const byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);  //unicode
                    }

                    const byteArray = new Uint8Array(byteNumbers);    //byte arr
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
                tải file hướng dẫn
                <DownloadOutlined />
            </WrapperStyleInstructionFile>
        </WrapperStyleInstruction >
    );
}

export const FreeTaskListComponent = ({ tasks, projectId, onClose }) => {

    const token = localStorage.getItem("tokenLogin");

    const navigate = useNavigate();


    const [taskList, setTaskList] = useState(tasks);

    const handleAddTaskToProject = async (projectId, taskId) => {       //add task to project
        const endpoint = `${process.env.REACT_APP_API_KEY}/project/addtasktoproject/${projectId}`;
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    taskId: taskId,
                }),
            });

            if (!response.ok) {
                throw new Error("add task fail!");
            }

            const result = await response.json();
            if (result.status === 'OK') {
                const updatedTaskList = taskList.filter(task => task._id !== taskId); // Cập nhật task list bằng cách lọc task đã thêm
                setTaskList(updatedTaskList);  // Cập nhật task list
                alert("add task success");
                navigate(0);
                onClose();
            } else {
                alert("add task fail");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <WrapperStyleAddTaskForm>
            <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "1px" }} onClick={onClose} />
            <h3>Add Task</h3>

            {tasks.map(task => (<Button style={{ border: "1px solid green", width: "100px", height: "100px", margin: "10px", fontSize: "20px", color: "blueviolet" }} key={task._id} onClick={() => handleAddTaskToProject(projectId, task._id)} title={task.name}>
                {task.name.includes(':') ? task.name.substring(0, task.name.indexOf(':')) : task.name.substring(0, 7)}
            </Button>))
            }
        </WrapperStyleAddTaskForm >
    )
}

export const AddUserComponent = ({ projectId, onClose }) => {
    const token = localStorage.getItem("tokenLogin");
    const navigate = useNavigate();

    const [listUser, setListUser] = useState([])

    const [userId, setUserId] = useState("");

    const handleAddUserToList = () => {
        if (userId != "") {
            if (listUser.length <= 9) {
                setListUser([...listUser, userId]);
            }
        }
    }

    const handleAddUserToProject = async () => {
        const endpoint = `${process.env.REACT_APP_API_KEY}/project/addusertoproject/${projectId}`
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ users: listUser }),
            });

            if (!response) {
                throw new Error("add user to project fail");
            }

            const result = await response.json();
            if (result.status === 'OK') {
                navigate(0);
                alert(`add user success, ${result.data.data.length} user not found!`);
            }
        } catch (error) {
            console.log(error);
            alert("err: ", error);
        }
    }

    return (
        <WrapperStyleAddUserForm>
            <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "1px" }} onClick={onClose} />
            <h3>Add User</h3>

            <div style={{ display: "flex" }}>
                <Input placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
                <Button style={{ backgroundColor: "blanchedalmond", color: "gray" }} onClick={handleAddUserToList}>ADD</Button>
            </div>

            {listUser.map(userId => (
                <Button style={{ width: "300px", marginTop: "20px", marginRight: "10px" }}>{userId}</Button>
            ))}

            <Button style={{ marginTop: "70px", marginLeft: "305px", display: "block", backgroundColor: "grey" }} onClick={handleAddUserToProject}>Submit</Button>

        </WrapperStyleAddUserForm >
    )
}

// DropDown

export const DropDownOptionFilter = ({ items }) => {
    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <FilterOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>

    );
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

export const UserInformationComponent = ({ id, email, name, phonenumber, hiddenInformation, removeFromProject }) => {
    return (
        <WrapperStyleUserInformation>
            <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "1px" }} onClick={() => hiddenInformation()} />
            <p style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}> {email}</p>
            <p style={{ marginTop: "50px", marginLeft: "60px" }}><SmileOutlined style={{ color: "brown" }} /> {name}</p>
            <p style={{ marginLeft: "60px" }}><PhoneOutlined style={{ color: "red" }} /> {phonenumber}</p>
            <Button style={{ border: "1px solid red", marginLeft: "330px" }} onClick={() => removeFromProject()}>Remove From project</Button>
            <p style={{ marginLeft: "280px", marginTop: "50px", fontSize: "15px" }}><IdcardOutlined style={{ color: "green" }} /> {id}</p>
        </WrapperStyleUserInformation>
    );
}