import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, /*setAuthUser,*/ isLoading } = useAuthContext();
  console.log("Auth User", authUser);

  if(isLoading) return "Loading..."
  
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
