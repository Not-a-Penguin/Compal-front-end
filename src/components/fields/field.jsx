/*import '../fields/fields.css'*/
import './login.css';
import { useState } from 'react';
import ButtonPrimary from '../button-primary/button';

function Field(){
    const [username, setUsername] = useState("");
    const [passoword, setPassword] = useState("");

    /*Ativada quando o formulario for preenchido e o botao "Enviar" acionado*/
    const handleSubmit = (event) => {
      event.preventDefault();

      console.log("teste", username, passoword);
      console.log("Envio");

      const handleSubmit = (event) => {
        event.preventDefault();
      }
    }

  return(
    <div className='container'>
        <div className='input-field'>
          <input
            type='email'
            placeholder='E-mail'
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      
        <div className='input-field'>
          <input
            type='passoword'
            placeholder='Senha'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>  
      <ButtonPrimary text="Entrar" action={handleSubmit}/>
    </div>
    
        
    )
}
export default Field;