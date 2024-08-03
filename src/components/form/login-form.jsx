
import './login.css';

function LoginForm({type,htmlFor,name,id,required,placeholder,variant,onChange,value}){

  return(
    <div className='container'>
      <div className='input-field'>
        <input
        type={type}
        name={name}
        id={id}
        htmlFor={htmlFor}
        required={required}
        placeholder={placeholder}
        variant={variant} 
        onChange={onChange}
        value={value}
        
        />
      </div>
    </div>

  )
}
export default LoginForm;