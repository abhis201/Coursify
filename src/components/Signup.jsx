import { Button, TextField, Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";

function Signup(){
    const [username, setUsername] = useState("") 
    const [password, setPassword] = useState("") 
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);

    return <div>
        <center style={{
            backgroundColor:"#eeeeee",
            height:"100vh"
        }}>
            <Typography style={{
                paddingTop: 150,
                marginBottom: 10}}>
                Welcome for Coursify. Sign Up Below
            </Typography>
            <Card style={{width: 400, padding:20}}>
            <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth={true} id="username" label="Username" variant="outlined" size="small" />
            <br /><br />
            <TextField onChange={(e)=>{setPassword(e.target.value)}} fullWidth={true} id="password" label="Password" variant="outlined" type="Password" size="small"/>
            <br /><br />
            <Button onClick={async() => {
                        const response = await axios.post(`${BASE_URL}/admin/signup`, {
                            username,
                            password
                        })
                        if(!response){
                            alert("User already exists")
                        }
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                        // window.location = "/"
                        setUser({userEmail: username, isLoading: false})
                        navigate("/courses")
                    }} variant="outlined">SignUp</Button> 
            </Card>
        </center>
    </div>
}

export default Signup;
