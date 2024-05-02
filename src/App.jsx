import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Jobcard from "./components/Jobcard";
import jobData from "./JobDummyData";
import { useEffect, useState } from "react";
import { db } from "./firebase.config";
import { collection, where, query, getDocs, orderBy } from "firebase/firestore";

function App() {
  const [jobs, setJobs] = useState([]);
  const[customSearch,setCustomSearch] = useState(false);
  
  const fetchJobs = async () => {
    setCustomSearch(false);
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(q);
    const jobs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      postedOn: doc.data().postedOn.toDate(),
    }));
    setJobs(jobs);
    console.log(jobs);
  };

  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"));
    const q = query(
      jobsRef,
      where("type", "==", jobCriteria.type),
      where("title", "==", jobCriteria.title),
      where("experience", "==", jobCriteria.experience),
      where("location", "==", jobCriteria.location),
      orderBy("postedOn", "desc")
    );
    const req = await getDocs(q);

    req.forEach((job) => {
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />
      {customSearch && 
      <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
        <p className="bg-blue-500 px-10 py-2 rounded-md text-white">Clear Filters</p>
      </button>
      }
      {jobs.map((job) => (
        <Jobcard key={job.id} {...job} />
      ))}{" "}
    </div>
  );
}
export default App;
