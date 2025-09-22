import {useRecoilValue} from "recoil";
import {UserState} from "../States/UserState";

const UserData = () => {

    const userData = useRecoilValue(UserState);
    console.log(userData);

    return (
        <p>{userData.loggedIn}</p>
    )
}

export default UserData;