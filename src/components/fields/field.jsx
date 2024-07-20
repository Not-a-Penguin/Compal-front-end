/*import '../fields/fields.css'*/
import './login.css';
/*import ButtonPrimary from '../components/button-primary/button';*/;

function Field({type,htmlFor,name,id,required,placeholder,variant,fullWidth, onChange,value}){

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
        fullWidth={fullWidth}
        onChange={onChange}
        value={value}
        
        />
      </div>
    </div>

  )
}
export default Field;