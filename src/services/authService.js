import { userLogin, userRegister } from "../redux/features/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e,email,password,role) =>{
    e.preventDefault()
    try {
        if(!role || !email || !password) {
            return alert('Please Provide All Fields');
        }
        // console.log("login",e,email,password,role);
        store.dispatch(userLogin({email,password,role}));

    } catch (error) {
        console.log(error)
    }
}
export const handleRegister = ( e,
    name,
    role,
    email,
    password,
    phone,
    organisationName,
    address,
    hospitalName,
    website)=>{
    e.preventDefault()
    try {
        // console.log("register",e,role,  name,email,password,organisationName,hospitalName,website,address,phone)
        store.dispatch(userRegister({name,
            role,
            email,
            password,
            phone,
            organisationName,
            address,
            hospitalName,
            website,}))
    } catch (error) {
        console.log(error)
    }
}