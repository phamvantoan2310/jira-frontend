import React, { useEffect, useState } from "react";
import { WrapperStyleAddTaskForm, WrapperStyleAddUserForm, WrapperStyleDate, WrapperStyleInstruction, WrapperStyleInstructionFile, WrapperStyleStatusProject } from "./Style";
import {
    FileWordFilled,
    CloseCircleFilled,
} from '@ant-design/icons';
import { Button } from "antd";
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
    console.log(startDate, dueDate);
    const [dateRange, setDateRange] = useState([null, null]);

    useEffect(() => {
        if (startDate && dueDate) {
            setDateRange([moment(startDate), moment(dueDate)]);
        }
    }, [startDate, dueDate]);

    return (
        <WrapperStyleDate>
            <RangePicker
                status="error"
                value={dateRange}
                style={{ fontSize: "30px", fontWeight: "bold" }}
                disabled
            />
        </WrapperStyleDate>
    );
}

export const InstructionProjectComponent = ({ content, instructionFile }) => {
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
                <p style={{ color: "gray" }}>Note: </p>
                <p>{content}</p>
            </div>
            <WrapperStyleInstructionFile href={pdfUrl} download="instruction-file.docx" style={{ textDecoration: 'underline' }}>
                tải file hướng dẫn
                <FileWordFilled />
            </WrapperStyleInstructionFile>
        </WrapperStyleInstruction>
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

            {tasks.map(task => (<Button style={{ border: "1px solid green", width: "200px", height: "200px", margin: "10px", fontSize: "20px", color: "blueviolet" }} key={task._id} onClick={() => handleAddTaskToProject(projectId, task._id)}>
                {task.name}
            </Button>))
            }
        </WrapperStyleAddTaskForm >
    )
}

export const AddUserComponent = ({ projectId, onClose }) => {
    const token = localStorage.getItem("tokenLogin");

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