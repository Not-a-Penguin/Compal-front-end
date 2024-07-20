import HeaderText from '../components/general-text/header-text.jsx';
import BodyText from '../components/general-text/body-text.jsx';
import Logo from '../components/logo/logo.jsx';
import Field from '../components/fields/field.jsx';
import IconC from '../components/logo/icon.jsx';
import { useState } from 'react';
import ButtonPrimary from '../components/button-primary/button';
/*import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';*/
/*import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';*/
/*import '../components/fields/login.css';*/

function InitialLogin(){
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    /*const IconPassword = () =>{}*/

    /*Ativada quando o formulario for preenchido e o botao "Enviar" acionado*/
    const handleSubmit = (event) => {
      event.preventDefault();

      console.log(`Usuario ${username} foi cadastrado com a senha: ${password}`);
      console.log("Envio");

        const handleSubmit= (event) => {
        event.preventDefault();
      }
    }
    return(
        <div>
            <Logo/>
            <IconC/>
            <HeaderText text="Entre em sua conta"/>
            <BodyText text= "Novo por aqui?" text2="Crie uma conta"/>
            <Field type="email"name="email" required placeholder="E-mail" onChange={(e) => setUsername(e.target.value)}
            />
            
            <Field type="password"name="password" variant="outilined" fullWidth required placeholder="Senha" onChange={(e) => setPassword(e.target.value)}
            />
              
            <ButtonPrimary text="Entrar" action={handleSubmit}/>
            
        </div>      
    )
}     
          
export default InitialLogin;

/*<RemoveRedEyeIcon InputProps = {{
            iconPassword:<IconPassword/>,
            }}/>*/
              

