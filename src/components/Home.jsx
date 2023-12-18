import { Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import { userEmailState } from "../store/selectors/userEmail"
import {isUserLoading} from "../store/selectors/isUserLoading.js";
import {Button} from "@mui/material";

function Home(){
    const navigate = useNavigate()
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);

    return <div>
        <div style={{
            justifyContent:"center",
            marginTop:200}}>
            <Typography variant="h4" style={{textAlign:"center", fontWeight:"bold"}} >Welcome to Coursify</Typography>
            <Typography style={{
                textAlign:"center"}}>
                <br />Admins can add courses, view courses
                <br />Users can purchase courses</Typography>
                <br/>
                {!userLoading && !userEmail && <div style={{display: "flex",justifyContent:"center", marginTop: 20}}>
                    <div style={{marginRight: 10}}>
                        <Button
                            size={"large"}
                            variant={"contained"}
                            onClick={() => {
                                navigate("/register")
                            }}
                        >Signup</Button>
                    </div>
                    <div>
                        <Button
                            size={"large"}
                            variant={"contained"}
                            onClick={() => {
                                navigate("/login")
                            }}
                        >Signin</Button>
                    </div>
                </div>}
                {userEmail && !userLoading && <div style={{display:"flex", justifyContent:"center"}}>
                    <Button>{userEmail}</Button>
                    <Button onClick={()=>{
                        localStorage.setItem('token', null);
                        window.location = "/";
                    }}>Logout</Button>
                </div>
                }
        </div>
    </div>
}

export default Home;