import DefaultText from "../components/login-register-screen/default-text.jsx";
import TextButton from "../components/login-register-screen/text-button.jsx";

import './login-screen-style.css'
import InputField from "../components/login-register-screen/input-field.jsx";
import Button from "../components/login-register-screen/button.jsx";

import { useNavigate } from "react-router-dom";

export default function LoginScreen() {

    const navigate = useNavigate();
    // TODO: implement logic
    function signUp(){
        console.log("Sign Up");
        return navigate("/register");
    }

    function signIn(){
        return navigate("/main");
    }

    return (
        <div className={"login-main"}>
            <img src={'src/assets/compal-logo.svg'} alt={"compal-logo"}/>

            <div className={'horizontal-align'} style={{paddingTop: '46px', paddingBottom: '20px'}}>
                <img className={'credit-card'} src={'src/assets/credit-card-grey.svg'} alt={"credit-card"}/>
                <DefaultText style={'logo-text'} text={"Compal"}/>
            </div>

            <DefaultText style={'bold-text'} text={'Entre em sua conta'}/>

            <div className={'horizontal-align'} style={{padding: '64'}}>
                <DefaultText style={'body-text'} text={"Novo por aqui?"}/>
                <TextButton style={'text-button'} text={"Crie uma conta"}  onClick={signUp}/>
            </div>

            <div className={'vertical-align'} style={{paddingTop: '30px'}}>
                <InputField placeholder={"Email"} type={"email"}/>
                <InputField placeholder={"Senha"} type={"password"}/>
            </div>

            <Button text={"Entrar"} onClick={signIn}/>

        </div>
    )
}
