import { Button, TextField, Card, Typography} from "@mui/material";
import { useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../config.js"

function Addcourse(){
    const [title, setTitle] = useState("") 
    const [description, setDescription] = useState("")
    const [checked, setChecked] = useState(false)
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")

    return <div>
        <center style={{
            backgroundColor:"#eeeeee",
            height:"100vh"
        }}>
            <Typography style={{
                paddingTop: 150,
                marginBottom: 10}}>
                Fill the below form to add Course!
            </Typography>
            <Card style={{width: 400, padding:20}}>
            <TextField onChange={(e)=>{setTitle(e.target.value)}} fullWidth={true} id="title" label="Title" variant="outlined" size="small" />
            <br /><br />
            <TextField onChange={(e)=>{setDescription(e.target.value)}} fullWidth={true} id="description" label="Description" variant="outlined" size="small"/>
            <br /><br />
            <TextField onChange={(e)=>{setImage(e.target.value)}} fullWidth={true} id="image" label="Image Link" variant="outlined" size="small"/>
            <br /><br />
            <TextField onChange={(e)=>{setPrice(e.target.value)}} fullWidth={true} id="price" label="Price" variant="outlined" size="small"/>
            <br /><br />
            <Typography> Publish <input value="Publish" type="checkbox" onChange={(e)=>{setChecked(e.target.checked)}} /></Typography>
            <br /><br />
            <Button onClick={async () => {
                        await axios.post(`${BASE_URL}/admin/courses`, {
                            title: title,
                                description: description,
                                imageLink: image,
                                published: checked,
                                price
                        }, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert("Added course!");
                        window.location = "/"
                    }} variant="outlined">Add Course</Button> 
            </Card>
        </center>
    </div>
}

export default Addcourse;