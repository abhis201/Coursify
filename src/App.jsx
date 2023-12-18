import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Appbar from './components/Appbar.jsx'
import Addcourse from './components/Addcourse.jsx';
import Courses from './components/Courses';
import Home from './components/Home';
import Course from './components/Course';
import {RecoilRoot,useSetRecoilState} from 'recoil';
import axios from "axios";
import {BASE_URL} from "./config.js";
import {useEffect} from "react";
import { userState } from './store/atoms/user';

function App() {

  return (
    <>
    <RecoilRoot>
      <Router>
        <Appbar />
        <hr />
        <InitUser/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Signin />}/>
                <Route path="/register" element={<Signup />} />
                <Route path="/addcourse" element={<Addcourse />}/>
                <Route path="/courses" element={<Courses />}/>
                <Route path="/course/:courseId" element={<Course />}/>
            </Routes>
        </Router>
      </RecoilRoot>
    </>
  )

}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
      try {
          const response = await axios.get(`${BASE_URL}/admin/me`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })

          if (response.data.username) {
              setUser({
                  isLoading: false,
                  userEmail: response.data.username
              })
          } else {
              setUser({
                  isLoading: false,
                  userEmail: null
              })
          }
      } catch (e) {

          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  useEffect(() => {
      init();
  }, []);

  return <></>
}

export default App
