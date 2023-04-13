import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  MainContainer,
  NavBar,
  Footer,
  ResultSearch,
  Detail_Jobs,
} from "./components";
import { Route, Routes } from "react-router-dom";
import { db } from "./firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { setTotalJobs } from "./redux/Slices/Global";
function App() {
  const dispatch = useDispatch();
  const [isJob, setIsJob] = useState(false);
  useEffect(() => {
    const getJobs = async () => {
      var arr = [];
      const querySnapshot = await getDocs(collection(db, "Totals"));
      querySnapshot.forEach((doc) => {
        arr.push(doc.data().data);
      });
      if (arr.length > 0) {
        dispatch(setTotalJobs(arr));
        setIsJob(true);
      }
    };
    getJobs();
  }, []);

  return (
    <div className="bg-[##f4f4f4}">
      <div className="w-[90%] m-auto">
        <NavBar />
        {isJob ? (
          <main>
            <Routes>
              <Route path="/" element={<MainContainer />} />
              <Route path="/search/:search" element={<ResultSearch />} />
              <Route path="/it-job/:job_name" element={<div className="pb-10"><Detail_Jobs /></div>} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </main>
        ) : (
          <div className="flex justify-center items-center h-[100vh]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;
