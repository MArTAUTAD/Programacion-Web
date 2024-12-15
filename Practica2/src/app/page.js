"use client"

import { useState , useEffect} from "react";
import Image from "next/image";
import LoginUser from "./user/onBoarding/login/page";
import Register from "./user/onBoarding/register/page";
import Clients from "./pages/clients/page";

export default function Home() {
  const [token, setToken] = useState(null)
  
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
        setToken(storedToken);
    }
  }, []);

  return(
    
    <div>
      <h1>CLIENTES</h1>
      <Clients token={token}></Clients>
    </div>
  )
  
}


// const [view, setView] = useState("login")
//   const [token, setToken] = useState(null)

//   useEffect(() => {
//     const storedToken = localStorage.getItem("jwt");
//     if (storedToken) {
//         setToken(storedToken);
//     }
//   }, []);

//   const showLogin = () => setView("login");
//   const showRegister = () => setView("register");
//   const showVerification = () => setView("verification");
//   const showPages = () => setView("Pages");

//   return (
//     <div>
//       <div>
//         {view === "login" &&(
//           <div>
//             <h1>Login</h1>
//             <LoginUser setToken={(newToken) =>{
//               setToken(newToken)
//               showPages()

//             }}></LoginUser>

//             <div>
//               <button onClick={showRegister}>No tengo cuenta</button>
//             </div>
//           </div>
//         )}

//         {view === "register" &&(
//           <div>
//             <h1>Register</h1>
//             <Register onRegister={() => showVerification()}></Register>

//             <div>
//               <button onClick={showVerification}>No tengo cuenta</button>
//               <button onClick={showLogin}>Ya tienes cuenta</button>
//             </div>
//           </div>
//         )}

//         {view === "verification" &&(
//           <div>
//             <h1>Register</h1>
//             <Register onRegister={() => showVerification()}></Register>

//             <div>
//               <button onClick={showVerification}>No tengo cuenta</button>
//               <button onClick={showLogin}>Ya tienes cuenta</button>
//             </div>
//           </div>
//         )}

//       </div>

//     </div>
//   )
