import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useInitialAuthCheck from "./hooks/useInitialAuthCheck";
import Home from "./pages/home/Home";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Loader from "./components/loader/Loader";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import NotFound from "./pages/notFound/NotFound";
import AddTask from "./pages/addTask/AddTask";
import EditTask from "./pages/editTask/EditTask";
import Task from "./pages/task/Task";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/tasks/:taskId" element={<PrivateRoute><Task /></PrivateRoute>} />
        <Route path="/tasks/add-task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
        <Route path="/tasks/edit-task/:taskId" element={<PrivateRoute><EditTask /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
