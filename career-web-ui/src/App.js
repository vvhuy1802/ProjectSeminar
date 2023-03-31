import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MainContainer } from "./components";
import {Route,Routes} from "react-router-dom"
import { db } from "./firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { setTotalJobs } from "./redux/Slices/Global";
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/SearchDiv/Search";
import Job from "./components/JobDiv/Job";
import Value from "./components/ValueDiv/Value";
import Footer from "./components/FooterDiv/Footer";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getJobs = async () => {
      var arr = [];
      const querySnapshot = await getDocs(collection(db, "Totals"));
      querySnapshot.forEach((doc) => {
        arr.push(doc.data().data);
      });
      dispatch(setTotalJobs(arr));
    };
    getJobs();
  }, []);

  return (
    <div className="w-[85%] m-auto bg-white">
      <NavBar/>
      <Search/>
      <Job/>
      <Value/>
      <Footer/>
    </div>
  );
}

export default App;
