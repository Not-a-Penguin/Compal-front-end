import HeaderText from '../components/general-text/header-text.jsx';
import BodyText from '../components/general-text/body-text.jsx';
import Logo from '../components/logo/logo.jsx';
import Field from '../components/fields/field.jsx';
import IconC from '../components/logo/icon.jsx';
/*import { useState } from 'react';*/
import ButtonPrimary from '../components/button-primary/button';

//import das rotas
import { useEffect, useState } from 'react'
import blogFetch  from '../components/config';

function InitialLogin(){
    //constante de post
    const [posts,setPosts] = useState([]);
    const getPosts = async() => {
        try {
            const response = await blogFetch.get ("/posts");
            
            /*const data = response.data;*/

            /*setPosts(data);*/
            console.log(response);
        }   catch (error) {
            console.log(error);
            
        }

    };
    useEffect(() => {
        getPosts();
    },[])

    //constante de email e senha
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Ativada quando o formulario for preenchido e o botao "Enviar" acionado
    const handleSubmit = (event) => {
      event.preventDefault();

      console.log(`Usuario ${username} foi cadastrado com a senha: ${password}`);
      console.log("Envio");
        
    }
    return(
        <div>
            <Logo/>
            <IconC/>
            <HeaderText text="Entre em sua conta"/>
            <BodyText text= "Novo por aqui?" text2="Crie uma conta"/>
            <Field type="email"name="email" required placeholder="E-mail" onChange={(e) => setUsername(e.target.value)}
            />
            
            <Field type="password"name="password" variant="outilined" required placeholder="Senha" onChange={(e) => setPassword(e.target.value)}
            />
              
            <ButtonPrimary text="Entrar" action={handleSubmit}/>
            
        </div>      
    )
}     
          
export default InitialLogin;

/*<RemoveRedEyeIcon InputProps = {{
            iconPassword:<IconPassword/>,
            }}/>*/
              

