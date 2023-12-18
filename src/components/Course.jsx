import { useEffect, useState } from "react";
import { Button, TextField, Card, Typography, Grid} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Loading} from "./Loading";
import { BASE_URL } from "../config.js";
import { courseState } from "../store/atoms/course";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice, courseImage, courseDesc, isCourseLoading} from "../store/selectors/course";

function Course(){
    let { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);

    useEffect(() => {
        setCourse({isLoading: true, course: null})
        axios.get(`${BASE_URL}/admin/course/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse({isLoading: false, course: res.data.course});
        })
        .catch(e => {
            setCourse({isLoading: false, course: null});
        });
    }, []);

    if (courseLoading) {
        return <Loading />
    }

    return <div style={{background:"lightblue", height:"100vh", width:"100vw"}}>
        <GrayTopper />
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard />
            </Grid>
        </Grid>
    </div>

}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);
    return <div style={{height: "30vh", background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard(){
    const [courseDetails, setCourse] = useRecoilState(courseState);
    console.log(courseDetails)

    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [checked, setChecked] = useState(courseDetails.course.published);
    const [price, setPrice] = useState(courseDetails.course.price);

    return (
    <div>
        <center>
        <Card style={{width: 350, padding:20, marginTop: 180, marginRight:250, backgroundColor: "rgb(256,256,256)"}}>
            <TextField onChange={(e)=>{setTitle(e.target.value)}} fullWidth={true} id="title" label="Title" variant="outlined" size="small" value={title}/>
            <br /><br />
            <TextField value={description} onChange={(e)=>{setDescription(e.target.value)}} fullWidth={true} id="description" label="Description" variant="outlined" size="small"/>
            <br /><br />
            <img style={{width:350, height:200}} src={image}/>
            <br/><br/>
            <TextField value={image} onChange={(e)=>{setImage(e.target.value)}} fullWidth={true} id="image" label="Image Link" variant="outlined" size="small"/>
            <br /><br />
            <TextField value={price} onChange={(e)=>{setPrice(e.target.value)}} fullWidth={true} id="price" label="Price" variant="outlined" size="small"/>
            <br /><br />
            <Typography> Publish <input value="Publish" type="checkbox" checked={checked} onChange={(e)=>{setChecked(e.target.checked)}} /></Typography>
            <br /><br />
            <Button onClick={async () => {
                    let updatedCourse = {
                        title,
                        description,
                        imageLink: image,
                        published: checked,
                        price
                    }

                    axios.put(`${BASE_URL}/admin/courses/` + courseDetails.course._id, updatedCourse,{
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    updatedCourse.id = courseDetails.course._id
                    
                    setCourse({isLoading: false, course: updatedCourse});
                }} variant="outlined">Update</Button> 
        </Card>
        </center>
    </div>)
}

function CourseCard() {
    const desc = useRecoilValue(courseDesc);
    const imageLink = useRecoilValue(courseImage);

    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        marginTop:100,
        width: 300,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={imageLink} style={{width: 300}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{desc}</Typography>
            <Price />
        </div>
    </Card>
    </div>
}

function Price() {

    const price = useRecoilValue(coursePrice);
    return <>
        <Typography variant="subtitle2" style={{color: "gray"}}>
            Price
        </Typography>
        <Typography variant="subtitle1">
            <b>Rs {price} </b>
        </Typography>
    </>
}

export default Course;