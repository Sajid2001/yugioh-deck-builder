import { useDispatch } from "react-redux";
import { logoutUser } from "../Redux/Features/User";
import { setDecks } from "../Redux/Features/Decks";


export const useLogout = () => {

    const dispatch = useDispatch();

    const logout = () => {

        localStorage.removeItem('user')
        {dispatch(logoutUser())}
        {dispatch(setDecks([]))}

    }

    return {logout}
}