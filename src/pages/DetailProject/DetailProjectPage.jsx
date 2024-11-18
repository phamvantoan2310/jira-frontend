import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WrapperStyleAddTaskButton, WrapperStyleAddUserButton, WrapperStyleDeleteButton, WrapperStyleDetailProject, WrapperStyleFilter, WrapperStyleProjectName, WrapperStyleTaskButton, WrapperStyleTaskInProject, WrapperStyleUpdate, WrapperStyleUpdateProjectButton, WrapperStyleUserButton, WrapperStyleUserInProject } from "../../components/DetailProjectComponent/Style";
import { AddUserComponent, DateComponent, DescriptionComponent, DropDownOptionFilter, FreeTaskListComponent, InstructionProjectComponent, StatusComponent, UserInformationComponent } from "../../components/DetailProjectComponent/Component";
import {
    CheckOutlined,
    CloseOutlined,
    PlayCircleOutlined,
    CloseCircleFilled,
    ManOutlined,
    WomanOutlined,
    ProjectOutlined,
    TeamOutlined,
    UserAddOutlined,
    FolderAddOutlined
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


    //filter
    const items = [
        {
            label: (
                <a target="_blank" onClick={() => { setIsFilter(false) }}>
                    Bỏ lọc
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a target="_blank" onClick={() => { setIsFilter(true); setStatusFilter("In-Progress") }}>
                    In-Progress
                </a>
            ),
            key: '1',
        },
        {
            label: (
                <a target="_blank" onClick={() => { setIsFilter(true); setStatusFilter("Complete") }}>
                    Complete
                </a>
            ),
            key: '2',
        },
        {
            label: (
                <a target="_blank" onClick={() => { setIsFilter(true); setStatusFilter("Not-Started") }}>
                    Not-Started
                </a>
            ),
            key: '3',
        },

    ];

    const [inProgressTasks, setTaskInProgress] = useState([]);
    const [NotStartedTasks, setTaskNotStarted] = useState([]);
    const [CompletedTasks, setTaskCompleted] = useState([]);

    const [statusFilter, setStatusFilter] = useState("");

    const [isFilter, setIsFilter] = useState(false);
    useEffect(() => {
        setTaskInProgress(TasksInProject.filter(task => (task.status == "In-Progress")))
        setTaskCompleted(TasksInProject.filter(task => (task.status == "Complete")))
        setTaskNotStarted(TasksInProject.filter(task => (task.status == "Not-Started")))
    }, [isFilter])


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

    //show description  show ở InstructionProjectComponent, close ở DescriptionComponent
    const [isShowDescription, setIsShowDesCription] = useState(false);


    //show members or tasks
    const [isShow, setIsShow] = useState(true);

    //show information user
    const [isShowUser, setIsShowUser] = useState(false);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [id, setId] = useState("")

    const setInformation = (email, name, phoneNumber, id) => {
        setEmail(email);
        setName(name);
        setPhoneNumber(phoneNumber);
        setId(id);
    }

    return (
        <WrapperStyleDetailProject>
            <HeaderComponent error={isExpiredToken} />
            <div style={{ height: '100vh', padding: '20px', marginBottom: "100px" }}>
                <Row type="flex" style={{ height: '100%' }} justify="space-around" align="middle">

                    <Col flex="auto" style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
                        <WrapperStyleProjectName>
                            {Project?.name}
                        </WrapperStyleProjectName>
                        <div style={{ height: '50%' }}>
                            <StatusComponent status={Project?.status} />
                            <DateComponent startDate={Project?.start_date} dueDate={Project?.due_date} />
                            <InstructionProjectComponent content={Project?.description} instructionFile={Project?.instruction_file} showDescription={() => setIsShowDesCription(true)} />
                        </div>
                        <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <WrapperStyleUpdateProjectButton onClick={handleIsShowUpdateForm}>Update Project</WrapperStyleUpdateProjectButton>
                            <WrapperStyleDeleteButton onClick={handleDeleteProject}>Delete</WrapperStyleDeleteButton>
                        </div>
                    </Col>


                    {/* tasks list */}
                    {isShow && <Col flex="auto" style={{ backgroundColor: '#d9d9d9', height: '100%', width: "750px" }}>
                        <div style={{ display: "flex" }}>
                            <TeamOutlined style={{ fontSize: "30px", margin: "10px" }} onClick={() => (setIsShow(false))} />
                            <CloseCircleFilled style={{ padding: "3px", fontSize: "20px", marginLeft: "785px" }} onClick={() => handleLinkToHomePage()} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <p style={{ color: "gray", fontWeight: "bold", fontSize: "20px", margin: "20px" }}>Tasks:</p>
                            <WrapperStyleFilter>
                                <DropDownOptionFilter items={items}></DropDownOptionFilter>
                            </WrapperStyleFilter>
                        </div>

                        <WrapperStyleAddTaskButton onClick={() => { handleGetAllTask(); handleIsShowListTask(); }}><FolderAddOutlined style={{ fontSize: "20px" }} /></WrapperStyleAddTaskButton>

                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '20px',
                            marginLeft: "150px",
                            width: "600px",
                            height: "500px",
                            overflowY: "auto", //scroll theo chiều dọc
                            overflowX: "hidden", // Ẩn scroll ngang

                        }}>
                            {!isFilter
                                ?
                                TasksInProject.map((task) => {       //filter false => lấy toàn bộ Task
                                    return (
                                        task.status == "In-Progress" ?
                                            <WrapperStyleTaskButton style={{ backgroundColor: "green", color: "white" }} onClick={() => handleLinkToTask(task._id)}>{task.name}<PlayCircleOutlined /></WrapperStyleTaskButton> :
                                            task.status == "Complete" ?
                                                <WrapperStyleTaskButton type="primary" onClick={() => handleLinkToTask(task._id)}>{task.name}<CheckOutlined /></WrapperStyleTaskButton> :
                                                <WrapperStyleTaskButton style={{ backgroundColor: "orange", color: "white" }} onClick={() => handleLinkToTask(task._id)}>{task.name}<CloseOutlined /></WrapperStyleTaskButton>
                                    );
                                })
                                :
                                (statusFilter == "In-Progress")         //filter true, status==In-progress ==> in-progress tasks
                                    ?
                                    inProgressTasks.map((task) => {
                                        return (
                                            <WrapperStyleTaskButton style={{ backgroundColor: "green", color: "white" }} onClick={() => handleLinkToTask(task._id)}>{task.name}<PlayCircleOutlined /></WrapperStyleTaskButton>
                                        );
                                    })
                                    :
                                    (statusFilter == "Complete")           //filter true, status==complete ==> complete tasks
                                        ?
                                        CompletedTasks.map((task) => {
                                            return (
                                                <WrapperStyleTaskButton type="primary" onClick={() => handleLinkToTask(task._id)}>{task.name}<PlayCircleOutlined /></WrapperStyleTaskButton>
                                            );
                                        })
                                        :
                                        NotStartedTasks.map((task) => {   ////filter true, status==not-started ==> not-started tasks
                                            return (
                                                <WrapperStyleTaskButton style={{ backgroundColor: "orange", color: "white" }} onClick={() => handleLinkToTask(task._id)}>{task.name}<PlayCircleOutlined /></WrapperStyleTaskButton>
                                            );
                                        })
                            }
                        </div>
                    </Col>}


                    {/* members list*/}
                    {!isShow && <Col flex="auto" style={{ backgroundColor: '#bfbfbf', height: '100%', width: "750px" }}>
                        <div style={{ display: "flex" }}>
                            <ProjectOutlined style={{ fontSize: "30px", margin: "10px" }} onClick={() => setIsShow(true)} />
                            <CloseCircleFilled style={{ padding: "3px", fontSize: "20px", marginLeft: "785px" }} onClick={() => handleLinkToHomePage()} />
                        </div>

                        <p style={{ color: "gray", fontWeight: "bold", fontSize: "20px", margin: "60px" }}>Members</p>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginLeft: "50px",
                            width: "800px",
                            height: "500px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            gap: "10px",
                        }}>
                            <WrapperStyleUserInProject>
                                {UserInProject.map((user) => {
                                    return (
                                        (<Button style={{ margin: "20px" }} onClick={() => { setIsShowUser(true); setInformation(user?.email, user?.name, user?.phone_number, user?._id) }}>
                                            {user.email} {user.gender == "male" ? (<ManOutlined style={{ color: "blue" }} />) : (<WomanOutlined style={{ color: "pink" }} />)}
                                        </Button>)
                                    );
                                })}
                            </WrapperStyleUserInProject>
                        </div>
                        <WrapperStyleAddUserButton onClick={handleIsShowAddUser}><UserAddOutlined style={{ fontSize: "20px" }} /></WrapperStyleAddUserButton>
                    </Col>}
                </Row>
            </div>






            {isShowUpdateForm && <UpdateProject projectName={Project?.name} description={Project?.description} startDate={Project?.start_date} dueDate={Project?.due_date} projectId={Project?._id} onClose={handleIsShowUpdateForm} />}
            {isShowListTask && <FreeTaskListComponent tasks={Tasks} projectId={IdProject} onClose={handleIsShowListTask} />}
            {isShowAddUser && <AddUserComponent projectId={IdProject} key={IdProject} onClose={handleIsShowAddUser} />}
            {isShowDescription && <DescriptionComponent description={Project?.description} hiddenDescription={() => setIsShowDesCription(false)} />}
            {isShowUser && <UserInformationComponent email={email} id={id} name={name} phonenumber={phoneNumber} hiddenInformation={() => setIsShowUser(false)} removeFromProject={() => handleRemoveUserFromProject(id)} />}
        </WrapperStyleDetailProject>
    );
}