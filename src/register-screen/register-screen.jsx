import './register-screen-style.css'
import InputField from "../components/login-register-screen/input-field.jsx";
import DefaultText from "../components/login-register-screen/default-text.jsx";
import TextButton from "../components/login-register-screen/text-button.jsx";

import {useNavigate} from "react-router-dom";
import Button from "../components/login-register-screen/button.jsx";

export default function RegisterScreen(props){

    const navigate = useNavigate();

    function signIn(){
        return navigate("/login")
    }
    function signUp(){
        return 1;
    }

    return(
            <div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <div className="register-screen">
                        <div className="register-screen-form">

                            <div className={'horizontal-align'} style={{padding: '46px'}}>
                                <img className={'credit-card'} src={'src/assets/credit-card-grey.svg'}
                                     alt={"credit-card"}/>
                                <DefaultText style={'logo-text'} text={"Compal"}/>
                            </div>

                            <div className={'horizontal-align'} style={{padding: '64'}}>
                                <DefaultText style={'body-text'} text={"Já possui uma conta?"}/>
                                <TextButton style={'text-button'} text={"Entrar"} onClick={signIn}/>
                            </div>

                            <InputField placeholder={"Nome"}/>
                            <InputField placeholder={"Email"} type={"email"}/>
                            <InputField placeholder={"Senha"} type={"password"}/>

                            <Button text={"Criar conta"} onClick={signUp}/>
                        </div>
                        <img src={'src/assets/signup-image.svg'} alt="Signup image"/>
                    </div>
                </div>
            </div>
    )
}