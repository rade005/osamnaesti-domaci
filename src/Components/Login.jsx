import {UserState} from "../States/UserState";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {useForm} from "react-hook-form";

export const Login = () => {



    const setUserState = useSetRecoilState(UserState);

    const userData = useRecoilValue(UserState);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()


    const handleLogin = (data) => {
        setError("errorData", {
            type: "manual", message: "Uneti podaci nisu tačni",
        });

        if(data.email !== "admin@admin.com" || data.password !== "123456") {
            return; }
        setUserState({
            "loggedIn": true,
            "email": data.email,
        });



    }

    const logoutUser = () => {
        setUserState({})
    }

    return (
        <>
            { !userData.loggedIn ? (
                <form onSubmit={handleSubmit(handleLogin)}>
                    {errors.errorData && <p>{errors.errorData.message}</p>}
                    <input {...register("email")} type="text" placeholder="Enter your email"/>
                    <input {...register("password")} type="password" placeholder="Enter your password"/>
                    <button>Login</button>
                </form>
            ) : (
                <button onClick={logoutUser}>Logout</button>
            )}
        </>
    )
}