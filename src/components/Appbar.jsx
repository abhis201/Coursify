import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isUserLoading } from "../store/selectors/isUserLoading";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { userEmailState } from "../store/selectors/userEmail"
import { userState } from "../store/atoms/user.js";

function Appbar(){
    const navigate = useNavigate()
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    if (userLoading) {
        return <></>
    }

    if(userEmail){
        return <div>
            <div style={{
                display: "flex",
                justifyContent:"space-between"}}>
                <Typography variant={"h6"} onClick={()=>{window.location = "/";}}>Coursify</Typography>
                <div>
                    <Button onClick={()=>{
                        navigate('/addcourse')
                    }}>Add Course</Button>
                    <Button onClick={()=>{
                        navigate('/courses')
                    }}>Show Courses</Button>
                </div>
                <div>
                    <Button>{userEmail}</Button>
                    <Button onClick={()=>{
                        localStorage.setItem('token', null);
                        setUser({
                            isLoading: false,
                            userEmail: null
                        })
                    }}>Logout</Button>
                </div>
            </div>
        </div>
    }
    else if(!userEmail){
        return (
        <div>
            <div style={{
                display: "flex",
                justifyContent:"space-between"}}>
                <Typography variant={"h6"}>Coursify</Typography>
                <div>
                    <Button onClick={() => {
                                navigate("/register")
                            }}>Sign Up</Button>
                    <Button onClick={() => {
                                navigate("/login")
                            }}>Sign In</Button>
                </div>
            </div>
        </div>)
    }
    
}

export default Appbar;