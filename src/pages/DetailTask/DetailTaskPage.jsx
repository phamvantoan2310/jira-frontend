import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { WrapperStyleAddUserButton, WrapperStyleDeleteButton, WrapperStyleDetaiTask, WrapperStyleRemoveFromProjectButton, WrapperStyleTaskName, WrapperStyleUpdate, WrapperStyleUpdateTaskButton } from "../../components/DetailTaskComponent/Style";
import { AddUserToTaskComponent, AssignToComponent, DateComponent, DescriptionComponent, InstructionTaskComponent, StatusComponent, TaskInProjectComponent, TaskResponseComponent } from "../../components/DetailTaskComponent/Component";
import { UpdateTask } from "../../components/UpdateTaskComponent/Component";

import {
    CloseCircleFilled
} from '@ant-design/icons';
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { Col, Row } from "antd";

export const DetailTaskPage = () => {
    const { IdTask } = useParams();

    const navigate = useNavigate();

    const handleLinkToHomePage = () => {
        navigate(`/`);
    }

    const token = localStorage.getItem("tokenLogin");
    const [isExpiredToken, setIsExpiredToken] = useState(false);

    const [task, setTask] = useState();
    const [assign_to, setAssign_to] = useState();
    const [project, setProject] = useState();

    useEffect(() => {
        async function getDetailTask() {
            const endpoint = `${process.env.REACT_APP_API_KEY}/task/gettaskbytaskid/${IdTask}`;
            try {
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });


                if (!response.ok) {
                    const errorResult = await response.json();
                    if (errorResult.message == "token expired") {
                        alert("Phiên đăng nhập hết hạn!");
                        setIsExpiredToken(true);
                    }
                    throw new Error("get task fail");
                }

                setIsExpiredToken(false);
                const responseData = await response.json();
                setTask(responseData.data);
                setAssign_to(responseData.data.assigned_to);
                setProject(responseData.data.project);
            } catch (error) {
                alert("lấy task thất bại!");
                console.log(error);
            }
        }
        getDetailTask();
    }, [])


    //update
    const [isShowUpdateForm, setIsShowUpdateForm] = useState(false);

    const handleIsShowUpdateForm = () => {
        setIsShowUpdateForm(isShowUpdateForm ? false : true);
    }

    //delete
    const handleDeleteTask = async () => {
        if (window.confirm("Are you sure you want to delete the task?")) {
            try {
                const endpoint = `${process.env.REACT_APP_API_KEY}/task/deletetask/${IdTask}`;
                const response = await fetch(endpoint, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error("delete task fail!");
                }

                const result = await response.json();
                if (result.status == "OK") {
                    alert("delete success!");
                    navigate("/");
                } else {
                    alert("delete fail");
                }
            } catch (error) {
                console.log(error);
                alert(error);
            }
        }
    }

    //remove from project
    const handleRemoveFromProject = async () => {
        try {
            const endpoint = `${process.env.REACT_APP_API_KEY}/task/removefromproject/${IdTask}`;
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error("remove task from project fail!");
            }

            const result = await response.json();
            if (result.status == "OK") {
                alert("remove task from project success!");
            } else {
                alert("remove task from project fail");
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    //add user
    const [isShowAddUserForm, setIsShowAddUserForm] = useState(false);

    const handleIsShowAddUserForm = () => {
        setIsShowAddUserForm(isShowAddUserForm ? false : true);
    }

    //set status task
    const [status, setStatus] = useState(task?.status);
    useEffect(() => {
        async function setStatusTask() {
            const due_date = new Date(task?.due_date);
            const current_date = new Date();

            if (due_date < current_date) {
                setStatus("Complete");
            } else {
                setStatus("In-Progress");
            }
        }
        setStatusTask();
    }, [task])

    useEffect(() => {
        if (status !== "") {
            const updateTaskStatus = async () => {
                const endpoint = `${process.env.REACT_APP_API_KEY}/task/updatetask/${IdTask}`;
                try {
                    await fetch(endpoint, {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({ status: status }),
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
                                console.log(result);
                            }
                        }
                    )
                } catch (error) {
                    alert(error);
                    console.log(error);
                }
            }
            updateTaskStatus();
        }
    })

    //show description  show ở InstructionProjectComponent, close ở DescriptionComponent
    const [isShowDescription, setIsShowDesCription] = useState(false);


    return (
        <div>
            <HeaderComponent error={isExpiredToken} />
            <div style={{ height: '100vh', padding: '20px' }}>
                <Row type="flex" style={{ height: '100%' }} justify="space-around" align="middle">
                    <Col flex="auto" style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
                        <WrapperStyleTaskName>
                            {task?.name}
                        </WrapperStyleTaskName>
                        <div style={{ height: '50%' }}>
                            <StatusComponent status={task?.status} />
                            <DateComponent startDate={task?.start_date} dueDate={task?.due_date} />
                            <InstructionTaskComponent content={task?.description} instructionFile={task?.instruction_file} showDescription={() => setIsShowDesCription(true)} />
                        </div>
                        <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <WrapperStyleUpdateTaskButton onClick={handleIsShowUpdateForm}>Update Task</WrapperStyleUpdateTaskButton>
                            <WrapperStyleDeleteButton onClick={handleDeleteTask}>Delete</WrapperStyleDeleteButton>
                        </div>
                    </Col>
                    <Col flex="auto" style={{ backgroundColor: '#d9d9d9', height: '100%', width: "750px" }}>
                        <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "5px", fontSize: "20px" }} onClick={() => handleLinkToHomePage()} />
                        <p style={{ color: "#4d4d4d", fontWeight: "bold", fontSize: "20px", margin: "5px" }}>Task detail</p>
                        <div style={{ height: '100vh', padding: '20px' }}>
                            <Row style={{ height: '100%' }}>
                                <Col span={24} style={{ backgroundColor: 'white', height: '40%', marginBottom: "-100px", borderRadius: "10px" }}>
                                    <p style={{ color: "gray", fontWeight: "bold", fontSize: "15px", margin: "5px" }}>project</p>
                                    <TaskInProjectComponent projectName={project?.name} projectId={project?._id} status={project?.status} startDate={project?.start_date} dueDate={project?.due_date} />
                                    <WrapperStyleRemoveFromProjectButton onClick={handleRemoveFromProject}>Remove from project</WrapperStyleRemoveFromProjectButton>
                                </Col>
                                <Col span={24} style={{ backgroundColor: '#f0f0f0', height: '40%', borderRadius: "10px" }}>
                                    <p style={{ color: "gray", fontWeight: "bold", fontSize: "20px", margin: "5px" }}>assign to</p>
                                    <AssignToComponent emailUser={assign_to?.email} name={assign_to?.name} phonenumber={assign_to?.phone_number} />
                                    <WrapperStyleAddUserButton onClick={handleIsShowAddUserForm}>Assign User</WrapperStyleAddUserButton>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* <TaskResponseComponent /> */}

            {isShowUpdateForm && <UpdateTask taskName={task?.name} description={task?.description} startDate={task?.start_date} dueDate={task?.due_date} taskId={task?._id} onClose={handleIsShowUpdateForm} />}  {/* truyền hàm handleIsShowUpdateFrom để đóng updateform*/}
            {isShowAddUserForm && <AddUserToTaskComponent projectId={task?.project ? task.project._id : ""} taskId={task?._id} onClose={handleIsShowAddUserForm} />}
            {isShowDescription && <DescriptionComponent description={task?.description} hiddenDescription={() => setIsShowDesCription(false)} />}

           
        </div>
    );
}