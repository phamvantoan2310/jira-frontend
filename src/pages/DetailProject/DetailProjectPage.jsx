import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WrapperStyleAddTaskButton, WrapperStyleAddUserButton, WrapperStyleDeleteButton, WrapperStyleDetailProject, WrapperStyleProjectName, WrapperStyleTaskButton, WrapperStyleTaskInProject, WrapperStyleUpdate, WrapperStyleUpdateProjectButton, WrapperStyleUserButton, WrapperStyleUserInProject } from "../../components/DetailProjectComponent/Style";
import { AddUserComponent, DateComponent, FreeTaskListComponent, InstructionProjectComponent, StatusComponent } from "../../components/DetailProjectComponent/Component";
import {
    CheckOutlined,
    CloseOutlined,
    PlayCircleOutlined,
    CloseCircleFilled,
} from '@ant-design/icons';
import { UpdateProject } from "../../components/UpdateProjectComponent/Component";
import moment from "moment";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { Button, Col, Row } from "antd";


export const DetailProjectPage = () => {
    const { IdProject } = useParams();

    const token = localStorage.getItem("tokenLogin");
    const [isExpiredToken, setIsExpiredToken] = useState(false);

    const navigate = useNavigate();

    const handleLinkToTask = (IdTask) => {
        navigate(`/task/${IdTask}`);
    }
    const handleLinkToHomePage = () => {
        navigate(`/`);
    }

    const [Project, setProject] = useState();
    const [TasksInProject, setTasksInProject] = useState([]);
    const [UserInProject, setUserInProject] = useState([]);


    //free task
    const [Tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getDetailProject() {
            const endpoint = `${process.env.REACT_APP_API_KEY}/project/getprojectbyprojectid/${IdProject}`;
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

                    throw new Error("get project fail");
                }

                setIsExpiredToken(false);
                const responseData = await response.json();
                setProject(responseData.data);
                setTasksInProject(responseData.data.tasks);
                setUserInProject(responseData.data.users);
            } catch (error) {
                alert("lấy project thất bại!");
                console.log(error);
            }
        }
        getDetailProject();
    }, [])


    //set status project
    const [status, setStatus] = useState(Project?.status);
    useEffect(() => {
        async function setStatusProject() {
            const due_date = new Date(Project?.due_date);
            const current_date = new Date();

            if (due_date < current_date) {
                setStatus("Complete");
            } else {
                setStatus("In-Progress");
            }
        }
        setStatusProject();
    }, [Project])

    useEffect(() => {
        if (status !== "") {
            const updateProjectStatus = async () => {
                const endpoint = `${process.env.REACT_APP_API_KEY}/project/updateproject/${IdProject}`;
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
                                throw new Error("update project fail");
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
            updateProjectStatus();
        }
    })




    //update
    const [isShowUpdateForm, setIsShowUpdateForm] = useState(false);

    const handleIsShowUpdateForm = () => {
        setIsShowUpdateForm(isShowUpdateForm ? false : true);
    }

    //delete
    const handleDeleteProject = async () => {
        if (window.confirm("Are you sure you want to delete the project? All project tasks will be deleted! ")) {
            try {
                const endpoint = `${process.env.REACT_APP_API_KEY}/project/deleteproject/${IdProject}`;
                const response = await fetch(endpoint, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error("delete project fail!");
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

    //addTask
    const handleGetAllTask = async () => {
        const endpoint = `${process.env.REACT_APP_API_KEY}/task/gettaskfreebymanagerid`;
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error("get tasks fail");
            };

            const result = await response.json();
            if (result.status === "OK") {
                setTasks(result.result.data);
                console.log(result.result.data);
            } else {
                console.log(result.status);
                alert(result.message);
            }

        } catch (error) {
            console.log(error);
            alert("error: ", error);
        }
    }

    const [isShowListTask, setIsShowListTask] = useState(false);

    const handleIsShowListTask = () => {
        setIsShowListTask(isShowListTask ? false : true);
    }


    //add user
    const [isShowAddUser, setIsShowAddUser] = useState(false);

    const handleIsShowAddUser = () => {
        setIsShowAddUser(isShowAddUser ? false : true);
    }


    //show user list in project 
    const [isShowMemberList, setIsShowMemberList] = useState(false);
    const handleShowMemberList = () => {
        setIsShowMemberList(isShowMemberList ? false : true);
    }

    //remove user from project 
    const handleRemoveUserFromProject = async (userId) => {
        if (window.confirm("Are you sure you want to remove user ", userId)) {
            try {
                const endpoint = `${process.env.REACT_APP_API_KEY}/project/removeuserfromproject/${IdProject}`;
                const response = await fetch(endpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ userId: userId }),
                });

                if (!response) {
                    throw new Error("remove user to project fail");
                }

                const result = await response.json();
                if (result.status === 'OK') {
                    alert(`remove user success`);
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
                alert("err: ", error);
            }
        }
    }


    return (
        <div>
            <HeaderComponent error={isExpiredToken} />
            <div style={{ height: '100vh', padding: '20px', marginBottom:"100px" }}>
                <Row type="flex" style={{ height: '100%' }} justify="space-around" align="middle">
                    <Col flex="auto" style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
                        <WrapperStyleProjectName>
                            {Project?.name}
                        </WrapperStyleProjectName>
                        <div style={{ height: '50%' }}>
                            <StatusComponent status={Project?.status} />
                            <DateComponent startDate={Project?.start_date} dueDate={Project?.due_date} />
                            <InstructionProjectComponent content={Project?.description} instructionFile={Project?.instruction_file} />
                        </div>
                        <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            Cột 1
                        </div>
                    </Col>
                    <Col flex="auto" style={{ backgroundColor: '#d9d9d9', height: '100%' }}>
                        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            Cột 2
                        </div>
                    </Col>
                    <Col flex="auto" style={{ backgroundColor: '#bfbfbf', height: '100%' }}>
                        <CloseCircleFilled style={{ display: "flex", justifyContent: "flex-end", padding: "3px", fontSize: "20px" }} onClick={() => handleLinkToHomePage()} />
                        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            Cột 3
                        </div>
                    </Col>
                </Row>
            </div>

            <WrapperStyleDetailProject>

                

                <hr style={{ margin: "50px" }} />

                <WrapperStyleTaskInProject>
                    <p style={{ color: "gray" }}>Task:</p>
                    {TasksInProject.map((task) => {
                        return (
                            task.status == "In-Progress" ?
                                <WrapperStyleTaskButton style={{ backgroundColor: "green", color: "white", marginLeft: "80px" }} onClick={() => handleLinkToTask(task._id)}>{task.name}<PlayCircleOutlined /></WrapperStyleTaskButton> :
                                task.status == "Completed" ?
                                    <WrapperStyleTaskButton type="primary" style={{ marginLeft: "80px" }} onClick={() => handleLinkToTask(task.id)}>{task.name}<CheckOutlined /></WrapperStyleTaskButton> :
                                    <WrapperStyleTaskButton style={{ backgroundColor: "orange", color: "white", marginLeft: "80px" }} onClick={() => handleLinkToTask(task._id)}>{task.name}<CloseOutlined /></WrapperStyleTaskButton>
                        );
                    })}
                </WrapperStyleTaskInProject>

                <hr style={{ margin: "50px", marginBottom: "20px" }} />
                <Button style={{ marginLeft: "50px" }} onClick={handleShowMemberList}>Member list</Button>
                {isShowMemberList &&
                    <WrapperStyleUserInProject>
                        {UserInProject.map((user) => {
                            return (
                                <div>
                                    <WrapperStyleUserButton onClick={() => handleRemoveUserFromProject(user._id)}>{user.email}</WrapperStyleUserButton>
                                </div>
                            );
                        })}
                    </WrapperStyleUserInProject>
                }

                <WrapperStyleUpdate>
                    <WrapperStyleUpdateProjectButton onClick={handleIsShowUpdateForm}>Update Project</WrapperStyleUpdateProjectButton>
                    <WrapperStyleAddUserButton onClick={handleIsShowAddUser}>Add User</WrapperStyleAddUserButton>
                    <WrapperStyleDeleteButton onClick={handleDeleteProject}>Delete</WrapperStyleDeleteButton>
                    <WrapperStyleAddTaskButton onClick={() => { handleGetAllTask(); handleIsShowListTask(); }}>Add Task</WrapperStyleAddTaskButton>
                </WrapperStyleUpdate>

                {isShowUpdateForm && <UpdateProject projectName={Project?.name} description={Project?.description} startDate={Project?.start_date} dueDate={Project?.due_date} projectId={Project?._id} onClose={handleIsShowUpdateForm} />}
                {isShowListTask && <FreeTaskListComponent tasks={Tasks} projectId={IdProject} onClose={handleIsShowListTask} />}
                {isShowAddUser && <AddUserComponent projectId={IdProject} key={IdProject} onClose={handleIsShowAddUser} />}
            </WrapperStyleDetailProject>
        </div>
    );
}