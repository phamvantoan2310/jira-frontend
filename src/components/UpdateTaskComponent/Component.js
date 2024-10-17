import React, { useEffect, useState } from "react";
import { WrapperStyleSubmitButton, WrapperStyleUpdateForm, WrapperStyleUpdateTaskForm } from "./Style";
import { DatePicker, Form, Input, Upload, } from 'antd';
import GetBase64 from "../../service/GetBase64";
import moment from 'moment'
import { useNavigate } from "react-router-dom";

import {
    CloseCircleFilled
} from '@ant-design/icons';

const { TextArea } = Input;

export const UpdateTask = ({ taskName, description, startDate, dueDate, taskId, onClose }) => {  //nhận onClose từ detailTaskForm để đóng form

    const token = localStorage.getItem("tokenLogin");

    console.log(startDate, dueDate);

    const validStartDate = moment(startDate, "YYYY-MM-DD", true);  //format string sang date
    const validDueDate = moment(dueDate, "YYYY-MM-DD", true);

    const [taskNameUpdate, setTaskName] = useState("");
    const [descriptionUpdate, setDescription] = useState("");
    const [startDateUpdate, setStartDate] = useState("");
    const [dueDateUpdate, setDueDate] = useState("");
    const [instructionFile, setInstructionFile] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

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

    const handleUpdateTask = async () => {
        const endpoint = `${process.env.REACT_APP_API_KEY}/task/updatetask/${taskId}`;

        let updateData = {};

        if (taskNameUpdate) {
            updateData.name = taskNameUpdate;
        }
        if (descriptionUpdate) {
            updateData.description = descriptionUpdate;
        }
        if (startDateUpdate) {
            updateData.start_date = moment(startDateUpdate).format("YYYY-MM-DD").toString();
        }
        if (dueDateUpdate) {
            updateData.due_date = moment(dueDateUpdate).format("YYYY-MM-DD").toString();
        }
        if (instructionFile) {
            updateData.instructionFile = instructionFile;
        }

        console.log(updateData)

        try {
            await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            }).then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("update task fail");
                    }
                }
            ).then(
                result => {
                    if (result.status === "OK") {
                        alert("update success");
                        console.log(result);
                        navigate(`/task/${taskId}`);
                    }
                }
            )
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    useEffect(() => {
        setTaskName(taskName);
        setDescription(description);
        setStartDate(validStartDate);
        setDueDate(validDueDate);
    }, [taskName, description, startDate, dueDate]);

    return (
        <WrapperStyleUpdateForm>
            <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end" }} onClick={onClose} />
            <h2>
                Update Task
            </h2>
            <WrapperStyleUpdateTaskForm labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">
                <Form.Item label="Task Name">
                    <Input onChange={(e) => setTaskName(e.target.value)} value={taskNameUpdate} />
                </Form.Item>

                <Form.Item label="Description">
                    <TextArea rows={4} onChange={(e) => setDescription(e.target.value)} value={descriptionUpdate} />
                </Form.Item>

                <Form.Item label="Start Date">
                    <DatePicker onChange={(date) => setStartDate(date ? date.format("YYYY-MM-DD") : "")}
                        value={startDateUpdate ? moment(startDateUpdate, "YYYY-MM-DD") : null}
                        format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item label="Due Date">
                    <DatePicker onChange={(date) => setDueDate(date ? date.format("YYYY-MM-DD") : "")}
                        value={dueDateUpdate ? moment(dueDateUpdate, "YYYY-MM-DD") : null}
                        format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item label="Instruction file" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card" accept=".pdf,.doc,.docx,.xlsx,.png,.jpg,.jpeg" onChange={handleChangeFile}>
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <WrapperStyleSubmitButton onClick={handleUpdateTask}>Update</WrapperStyleSubmitButton>
                </Form.Item>

                {error && <div style={{ color: 'red', marginLeft: "50px", marginBottom: "40px" }}>{error}</div>}
            </WrapperStyleUpdateTaskForm>
        </WrapperStyleUpdateForm>
    );
}