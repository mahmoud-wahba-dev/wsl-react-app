import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
    return useContext(AuthContext)
}


// we will use this custom hook like this const { user, login, logout } = useAuth();
// not like const {user, login , logout} = useContext(authContext)