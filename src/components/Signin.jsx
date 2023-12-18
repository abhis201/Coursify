import { Button, TextField, Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";
import { BASE_URL } from "../config.js";

function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);

    return <div>
        <center style={{
            backgroundColor: "#eeeeee",
            height: "100vh"
        }}>
            <Typography style={{
                paddingTop: 150,
                marginBottom: 10
            }}>
                Welcome for Coursify. Sign In Below
            </Typography>
            <Card raised={true} style={{ width: 400, padding: 20 }}>
                <TextField onChange={(e) => { setUsername(e.target.value) }} fullWidth={true} id="username" label="Username" variant="outlined" size="small" />
                <br></br>
                <br></br>
                <TextField onChange={(e) => { setPassword(e.target.value) }} fullWidth={true} id="password" label="Password" variant="outlined" type="Password" size="small" />
                <br></br>
                <br></br>
                <Button
                    onClick={async () => {
                        const res = await axios.post(`${BASE_URL}/admin/login`, {
                            username,
                            password
                        }, {
                            headers: {
                                "Content-type": "application/json"
                            }
                        });
                        const data = res.data;
                        localStorage.setItem("token", data.token);
                        setUser({
                            userEmail: username,
                            isLoading: false
                        })
                        navigate("/courses")
                    }} variant="outlined">Login</Button>
            </Card>
        </center>
    </div>
}

export default Signin;
