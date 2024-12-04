import React, { useEffect, useState } from "react";
import { WrapperStyleFilter } from "../../components/HomePageComponent/Style";
import { CardComponent, DropDownOptionFilter, WrapperCreateButton } from "../../components/HomePageComponent/Component";
import { Button, Col, Row } from "antd";
import {
    AuditOutlined,
    MailOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";


const HomePage = () => {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    //filter
    const [projectInProgress, setProjectInProgress] = useState([]);
    const [projectNotStarted, setProjectNotStarted] = useState([]);
    const [projectCompleted, setProjectCompleted] = useState([]);
    const [taskInProgress, setTaskInProgress] = useState([]);
    const [taskNotStarted, setTaskNotStarted] = useState([]);
    const [taskCompleted, setTaskCompleted] = useState([]);


    const handleInProgressMission = () => {
        if (TypeMissionCondition) {
            setProjectInProgress(projects.filter(project => project.status === "In-Progress"));
            setIsInProgress(true);
            setIsCompleted(false);
            setIsNotStarted(false);
        } else {
            setTaskInProgress(tasks.filter(task => task.status === "In-Progress"));
            setIsInProgress(true);
            setIsCompleted(false);
            setIsNotStarted(false);
        }
    };

    const handleNotStartedMission = () => {
        if (TypeMissionCondition) {
            setProjectNotStarted(projects.filter(project => project.status === "Not-Started"));
            setIsInProgress(false);
            setIsCompleted(false);
            setIsNotStarted(true);
        } else {
            setTaskNotStarted(tasks.filter(task => task.status === "Not-Started"));
            setIsInProgress(false);
            setIsCompleted(false);
            setIsNotStarted(true);
        }
    };

    const handleCompletedMission = () => {
        if (TypeMissionCondition) {
            setProjectCompleted(projects.filter(project => project.status === "Complete"));
            setIsInProgress(false);
            setIsCompleted(true);
            setIsNotStarted(false);
        } else {
            setTaskCompleted(tasks.filter(task => task.status === "Complete"));
            setIsInProgress(false);
            setIsCompleted(true);
            setIsNotStarted(false);
        }
    };

    const [TypeMissionCondition, setTypeMissionCondition] = useState(true);

    const [isFilter, setIsFilter] = useState(false);

    const [isInProgress, setIsInProgress] = useState(false);
    const [isNotStarted, setIsNotStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);



    const items = [
        {
            label: (
                <a target="_blank" onClick={() => { handleInProgressMission(); setIsFilter(true); }}>
                    In-Progress
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a target="_blank" onClick={() => { handleCompletedMission(); setIsFilter(true) }}>
                    Complete
                </a>
            ),
            key: '1',
        },
        {
            label: (
                <a target="_blank" onClick={() => { handleNotStartedMission(); setIsFilter(true) }}>
                    Not-Started
                </a>
            ),
            key: '2',
        },
    ];

    const token = localStorage.getItem("tokenLogin");
    const [isExpiredToken, setIsExpiredToken] = useState(false);

    const [manager, setManager] = useState();


    useEffect(() => {
        async function getProjects() {
            const endpoint = `${process.env.REACT_APP_API_KEY}/project/getprojectbymanagerid`;
            try {
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorResult = await response.json();
                    if (errorResult.message == "token expired") {
                        alert("Phiên đăng nhập hết hạn!");
                        setIsExpiredToken(true);
                    }
                    throw new Error("get project fail!");
                }

                setIsExpiredToken(false);
                const responseData = await response.json();
                setProjects(responseData.data);
                setManager(responseData.data[0].manager);
            } catch (error) {
                console.log(error);
            }
        }
        async function getTasks() {
            const endpoint = `${process.env.REACT_APP_API_KEY}/task/gettaskbymanagerid`;
            try {
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("get tasks fail!");
                }

                const responseData = await response.json();
                setTasks(responseData.data);
            } catch (error) {
                console.log(error.name);
            }
        }
        getProjects();
        getTasks();
    }, [])


    //search
    const [nameMissionWantToSearch, setNameMissionWantToSearch] = useState("");
    const [missionWantToSearch, setMissionWantToSearch] = useState([])
    const handleSearchMission = () => {
        setMissionWantToSearch(TypeMissionCondition ? (projects.filter(project => project.name == nameMissionWantToSearch.trim())) : (tasks.filter(task => task.name == nameMissionWantToSearch.trim())))
    }

    const [isShowSearchResult, setIsShowSearchResult] = useState(false);
    useEffect(() => {
        if (missionWantToSearch.length == 0) {
            setIsShowSearchResult(false);
        } else {
            setIsShowSearchResult(true);
        }
    }, [missionWantToSearch])



    return (
        <div>
            <HeaderComponent setNameMission={setNameMissionWantToSearch} search={handleSearchMission} error={isExpiredToken} />

            <div style={{ height: '80vh', padding: '5px' }}>
                <Row type="flex" style={{ height: '100%' }} justify="space-around" >

                    {/* user */}
                    <Col flex="auto" style={{ backgroundColor: '#f0f0f0', height: '100vh', width: "150px" }}>
                        <p style={{ color: "gray", fontWeight: "bold", fontSize: "20px", marginLeft: "10px" }}>Hello {manager?.name}, have a good day!</p>

                        <hr style={{
                            height: "1px",
                            backgroundColor: "white",
                            border: "none",
                            margin: "5px",
                            marginTop: "40px"
                        }} />

                        <p style={{ color: "gray", fontWeight: "bold", fontSize: "20px", marginLeft: "10px" }}>You have: </p>

                        <Button onClick={() => { setTypeMissionCondition(true); setIsFilter(false) }} style={{ width: "350px", fontSize: "20px", backgroundColor: "green", color: "white", marginBottom: "20px" }}>{projects.length} Project<AuditOutlined /></Button>
                        <Button onClick={() => { setTypeMissionCondition(false); setIsFilter(false) }} style={{ width: "350px", fontSize: "20px", backgroundColor: "blue", color: "white" }}>{tasks.length} Task<AuditOutlined /></Button>

                        <hr style={{
                            height: "1px",
                            backgroundColor: "white",
                            border: "none",
                            margin: "5px",
                            marginTop: "40px"
                        }} />

                        <p style={{ color: "gray", fontWeight: "bold", fontSize: "20px", marginLeft: "10px" }}>Contact: </p>
                        <p style={{ color: "gray", fontWeight: "bold", fontSize: "20px", marginLeft: "10px" }}><MailOutlined style={{ marginRight: "10px" }} />{manager?.email} </p>
                        <p style={{ color: "gray", fontWeight: "bold", fontSize: "20px", marginLeft: "10px" }}><PhoneOutlined style={{ marginRight: "10px" }} />{manager?.phone_number} </p>
                    </Col>





                    {/* mission list */}
                    <Col flex="auto" style={{ height: '100vh', width: "750px", padding: "0 120px", backgroundColor: "#e6e6e6" }}>

                        <div style={{ display: "flex" }}>
                            <p style={{ color: "gray", fontWeight: "bold", fontSize: "20px", marginLeft: "10px" }}>Mission</p>

                            <WrapperStyleFilter>
                                <DropDownOptionFilter items={items}></DropDownOptionFilter>
                            </WrapperStyleFilter>
                        </div>

                        <div style={{ marginLeft: "637px", marginBottom: "10px" }}>
                            {TypeMissionCondition ?
                                <WrapperCreateButton size={"large"} type={"project"} />
                                :
                                <WrapperCreateButton size={"large"} type={"task"} />}
                        </div>


                        {missionWantToSearch.length > 0 && missionWantToSearch.map(mission => {          //dựa vào length để hiển thị kết quả tìm kiếm
                            return (
                                <Col span={7} style={{ marginTop: "30px" }} key={mission._id}>
                                    <CardComponent IdProject={mission._id} NameProject={mission.name} Status={mission.status} DueDate={mission.due_date} StartDate={mission.start_date} TypeProject={TypeMissionCondition} />
                                </Col>
                            )
                        })}

                        {!isShowSearchResult &&    //nếu có kết quả tìm kiếm thì không hiện toàn bộ danh sách
                            <div style={{ width: "900px", height: "600px", overflowY: "auto", paddingRight: "10px" }}>
                                <Row gutter={20}>
                                    {!isFilter ?                       //điều kiện trang lọc hoặc tất cả các mission
                                        ((TypeMissionCondition ? projects : tasks).map((project) => {  //tất cả các mission
                                            return (
                                                <Col span={7} style={{ marginTop: "30px" }} key={project._id}>
                                                    <CardComponent IdProject={project._id} NameProject={project.name} Status={project.status} DueDate={project.due_date} StartDate={project.start_date} TypeProject={TypeMissionCondition} />
                                                </Col>
                                            );
                                        })) :

                                        (isInProgress ?             //điều kiện mission in progress
                                            ((TypeMissionCondition ? projectInProgress : taskInProgress).map((project) => {
                                                return (
                                                    <Col span={7} style={{ marginTop: "30px" }} key={project._id}>
                                                        <CardComponent IdProject={project._id} NameProject={project.name} Status={project.status} DueDate={project.due_date} StartDate={project.start_date} TypeProject={TypeMissionCondition} />
                                                    </Col>
                                                );
                                            })) :

                                            (isCompleted ?    //điều kiện mission complete
                                                ((TypeMissionCondition ? projectCompleted : taskCompleted).map((project) => {
                                                    return (
                                                        <Col span={7} style={{ marginTop: "30px" }} key={project._id}>
                                                            <CardComponent IdProject={project._id} NameProject={project.name} Status={project.status} DueDate={project.due_date} StartDate={project.start_date} TypeProject={TypeMissionCondition} />
                                                        </Col>
                                                    );
                                                })) :

                                                ((TypeMissionCondition ? projectNotStarted : taskNotStarted).map((project) => {  //điều kiện mission not started
                                                    return (
                                                        <Col span={7} style={{ marginTop: "30px" }} key={project._id}>
                                                            <CardComponent IdProject={project._id} NameProject={project.name} Status={project.status} DueDate={project.due_date} StartDate={project.start_date} TypeProject={TypeMissionCondition} />
                                                        </Col>
                                                    );
                                                }))
                                            )
                                        )
                                    }
                                </Row>
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default HomePage;