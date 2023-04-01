import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MainContainer, NavBar, Footer } from "./components";
import { Route, Routes } from "react-router-dom";
import { db } from "./firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { setTotalJobs } from "./redux/Slices/Global";
import Detail_Jobs from "./components/Detail_Jobs";
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
    <div className="w-[90%] m-auto bg-white">
      <NavBar />
      <main>
        <Routes>
          <Route path="/*" element={<MainContainer />} />
          <Route path="/it-job" element={<Detail_Jobs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
