import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice"
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";

function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data))
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
