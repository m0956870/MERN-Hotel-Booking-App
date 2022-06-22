import "./App.css";
import React, { createContext, useReducer } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Account from "./pages/Account";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Basic Pages
import Login from "./pages/basic/Login";
import Signup from "./pages/basic/Signup";
import Logout from "./pages/basic/Logout";
import Errorpage from "./pages/basic/Errorpage";

import ForgetPassword from "./pages/basic/ForgetPassword";
import ResetPassword from "./pages/basic/ResetPassword";

// Main pages
import HomePage from "./pages/HomePage";
import AllRoomPage from "./pages/AllRoomPage";
import CategoryPage from "./pages/CategoryPage";

import RoomPage from "./pages/RoomPage";
import BookingPage from "./pages/BookingPage";
import BookingSummery from "./pages/BookingSummery";
// import Wishlist from "./pages/Wishlist";

import { reducer, initialState } from "./reducer/UserReducer";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms/:route" element={<AllRoomPage />} />
            <Route path="/rooms/category/:route" element={<CategoryPage />} />

            <Route path="/room/:_id" element={<RoomPage />} />

            <Route path="/booking" element={<BookingPage />} />
            <Route
              path="/booking-summery"
              element={<BookingSummery route={"my-bookings"} />}
            />
            {/* <Route path="/wishlist" element={<Wishlist />} /> */}

            <Route path="/account/" element={<Account />} />
            <Route path="/account/:route" element={<Account />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Errorpage />} />

            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
