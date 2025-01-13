import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice"
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import { setAllCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data))
  };

  const fetchCategory = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getCategory,
        });
  
        const { data: responseData } = response;
  
        if (responseData.success) {
          // setCategoryData(responseData.data);
          // console.log(responseData.data);
          
          dispatch(setAllCategory(responseData.data))
        }
  
      } catch (error) {
      } finally {
      }
    };

  useEffect(() => {
    fetchUser();
    fetchCategory();
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
