import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { WrapperStyleAddUserButton, WrapperStyleDeleteButton, WrapperStyleDetaiTask, WrapperStyleTaskName, WrapperStyleUpdate, WrapperStyleUpdateTaskButton } from "../../components/DetailTaskComponent/Style";
import { AddUserToTaskComponent, AssignToComponent, DateComponent, InstructionTaskComponent, StatusComponent, TaskResponseComponent } from "../../components/DetailTaskComponent/Component";
import { UpdateTask } from "../../components/UpdateTaskComponent/Component";

import {
    CloseCircleFilled
} from '@ant-design/icons';
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

export const DetailTaskPage = () => {
    const { IdTask } = useParams();

    const navigate = useNavigate();

    const handleLinkToHomePage = () => {
        navigate(`/`);
    }

    const token = localStorage.getItem("tokenLogin");

    const [task, setTask] = useState();
    const [assign_to, setAssign_to] = useState();

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
                    throw new Error("get task fail");
                }

                const responseData = await response.json();
                setTask(responseData.data);
                setAssign_to(responseData.data.assigned_to);
                console.log(responseData.data.assigned_to);
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

    //add user
    const [isShowAddUserForm, setIsShowAddUserForm] = useState(false);

    const handleIsShowAddUserForm = () => {
        setIsShowAddUserForm(isShowAddUserForm ? false : true);
    }

    //set status task
    const [status, setStatus] = useState("");
    useEffect(() => {
        async function setStatusTask() {
            const due_date = new Date(task?.due_date);
            const current_date = new Date();

            if (due_date < current_date) {
                setStatus("Complete");
            } else if (task?.status === "Not-Started") {
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


    return (
        <div>
            <HeaderComponent />
            <WrapperStyleDetaiTask>
                <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "5px" }} onClick={() => handleLinkToHomePage()} />
                <WrapperStyleTaskName>
                    {task?.name}
                </WrapperStyleTaskName>

                <StatusComponent status={task?.status} />
                <DateComponent startDate={task?.start_date} dueDate={task?.due_date} />
                <AssignToComponent emailUser={assign_to?.email} />


                <InstructionTaskComponent content={task?.description} instructionFile={task?.instruction_file} />

                <hr style={{ margin: "50px" }} />

                <TaskResponseComponent />
                <hr style={{ margin: "50px" }} />

                <WrapperStyleUpdate>
                    <WrapperStyleUpdateTaskButton onClick={handleIsShowUpdateForm}>Update Task</WrapperStyleUpdateTaskButton>
                    <WrapperStyleAddUserButton onClick={handleIsShowAddUserForm}>Assign User</WrapperStyleAddUserButton>
                    <WrapperStyleDeleteButton onClick={handleDeleteTask}>Delete</WrapperStyleDeleteButton>
                </WrapperStyleUpdate>

                {isShowUpdateForm && <UpdateTask taskName={task?.name} description={task?.description} startDate={task?.start_date} dueDate={task?.due_date} taskId={task?._id} onClose={handleIsShowUpdateForm} />}  {/* truyền hàm handleIsShowUpdateFrom để đóng updateform*/}
                {isShowAddUserForm && <AddUserToTaskComponent projectId={task?.project ? task.project : ""} taskId={task?._id} onClose={handleIsShowAddUserForm} />}
            </WrapperStyleDetaiTask>
        </div>
    );
}