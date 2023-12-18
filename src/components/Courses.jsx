import { Typography, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import axios from "axios";

function Courses(){
    const [courses, setCourses] = useState([]);

    const init = async () => {
        const response = await axios.get(`${BASE_URL}/admin/courses/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourses(response.data.courses)
    }

    useEffect(() => {
        init();
    }, []);

    return <div>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
            {courses.map((crs=>{
                return <Course course = {crs}/>
            }))}
        </div>
    </div>

    function Course({course}) {
        const navigate = useNavigate();
        
        const courseLink = "/course/"+course._id;
        return <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200
        }}>
            <Typography onClick={()=>{
                navigate(courseLink)
            }} style={{textAlign:"center", backgroundColor:"red",color:"white"}}>{course.title}</Typography>
            <Typography style={{textAlign:"center", backgroundColor:"blue", color:"white"}}>{course.description}</Typography>
            <img src={course.imageLink} style={{
                width: 300,
                height: 175
            }}/>
        </Card>
    } 
}

export default Courses;