import React, { useEffect, useState } from "react";
import { TypeProject } from '../../components/HomePageComponent/TypeProjectComponent'
import { WrapperStyleButton, WrapperStyleFilter, WrapperStyleProject } from "../../components/HomePageComponent/Style";
import { CardComponent, DropDownOptionFilter } from "../../components/HomePageComponent/Component";
import { Col, Row } from "antd";
import {

} from '@ant-design/icons';
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";



const HomePage = () => {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

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


    useEffect(() => {
        async function getProjects() {
            const endpoint = `${process.env.REACT_APP_API_KEY}/project/getprojectbymanagerid`;
            try {
                console.log(token);
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("get project fail!");
                }

                const responseData = await response.json();
                setProjects(responseData.data);
            } catch (error) {
                console.log(error);
            }
        }
        async function getTasks() {
            const endpoint = `${process.env.REACT_APP_API_KEY}/task/gettaskbymanagerid`;
            try {
                console.log(token);
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
                console.log(error);
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



    return (
        <div>
            <HeaderComponent setNameMission={setNameMissionWantToSearch} search={handleSearchMission}/>
            <div style={{ padding: "0 120px", backgroundColor: "#e6e6e6", height: "1000px" }}>
                <div style={{ display: "flex" }}>
                    <WrapperStyleProject>
                        <WrapperStyleButton onClick={() => { setTypeMissionCondition(true); setIsFilter(false) }}><TypeProject size={"10px"} name={"Project"} /></WrapperStyleButton>
                        <WrapperStyleButton onClick={() => { setTypeMissionCondition(false); setIsFilter(false) }}><TypeProject size={"10px"} name={"Task"} /></WrapperStyleButton>
                    </WrapperStyleProject>


                    <WrapperStyleFilter>
                        <DropDownOptionFilter items={items}></DropDownOptionFilter>
                    </WrapperStyleFilter>



                </div>
                <hr style={{
                    height: "1px",
                    backgroundColor: "#fff", // Màu xanh
                    border: "none",
                }} />
                {missionWantToSearch.length > 0 && missionWantToSearch.map(mission => {
                    return (
                        <Col span={5} style={{ marginTop: "30px" }} key={mission._id}>
                            <CardComponent IdProject={mission._id} NameProject={mission.name} Status={mission.status} DueDate={mission.due_date} StartDate={mission.start_date} TypeProject={TypeMissionCondition} />
                        </Col>
                    )
                })}

                <hr style={{
                    height: "1px",
                    backgroundColor: "#fff", // Màu xanh
                    border: "none",
                }} />

                <Row gutter={20}>
                    {!isFilter ?                       //điều kiện trang lọc hoặc tất cả các mission
                        ((TypeMissionCondition ? projects : tasks).map((project) => {  //tất cả các mission
                            return (
                                <Col span={5} style={{ marginTop: "30px" }} key={project._id}>
                                    <CardComponent IdProject={project._id} NameProject={project.name} Status={project.status} DueDate={project.due_date} StartDate={project.start_date} TypeProject={TypeMissionCondition} />
                                </Col>
                            );
                        })) :

                        (isInProgress ?             //điều kiện mission in progress
                            ((TypeMissionCondition ? projectInProgress : taskInProgress).map((project) => {
                                return (
                                    <Col span={5} style={{ marginTop: "30px" }} key={project._id}>
                                        <CardComponent IdProject={project._id} NameProject={project.name} Status={project.status} DueDate={project.due_date} StartDate={project.start_date} TypeProject={TypeMissionCondition} />
                                    </Col>
                                );
                            })) :

                            (isCompleted ?    //điều kiện mission complete
                                ((TypeMissionCondition ? projectCompleted : taskCompleted).map((project) => {
                                    return (
                                        <Col span={5} style={{ marginTop: "30px" }} key={project._id}>
                                            <CardComponent IdProject={project._id} NameProject={project.name} Status={project.status} DueDate={project.due_date} StartDate={project.start_date} TypeProject={TypeMissionCondition} />
                                        </Col>
                                    );
                                })) :

                                ((TypeMissionCondition ? projectNotStarted : taskNotStarted).map((project) => {  //điều kiện mission not started
                                    return (
                                        <Col span={5} style={{ marginTop: "30px" }} key={project._id}>
                                            <CardComponent IdProject={project._id} NameProject={project.name} Status={project.status} DueDate={project.due_date} StartDate={project.start_date} TypeProject={TypeMissionCondition} />
                                        </Col>
                                    );
                                }))
                            )
                        )
                    }
                </Row>

            </div>
        </div>
    );
}

export default HomePage;