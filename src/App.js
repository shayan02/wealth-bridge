import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Dashboard from "./components/dashboard.component";
import Logout from "./components/logout.component";
import PostCreate from "./components/post/add.component";
import HomePage from "./pages/home.page";
import AddMember from "./components/member/add.component";
import ListComponent from "./components/member/list.component";
import Profile from "./pages/profile.page";
import CartComponent from "./components/cart/cart.component";
import ChatComponent from "./components/contact/contact.component";
import NotificationComponent from "./components/notification/notification.component";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/add-post/:id" element={<PostCreate />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/list-member" element={<ListComponent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/carts" element={<CartComponent />} />
          <Route path="/chats" element={<ChatComponent />} />
          <Route path="/notifications" element={<NotificationComponent />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
