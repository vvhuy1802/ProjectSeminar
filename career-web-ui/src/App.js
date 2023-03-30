import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MainContainer } from "./components";
import {Route,Routes} from "react-router-dom"
import { db } from "./firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { setTotalJobs } from "./redux/Slices/Global";
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
    <div className="w-screen h-auto flex flex-col bg-primary">
      {/* <Header /> */}
      <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full '>
        <Routes>
          <Route path="/*" element={<MainContainer/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
