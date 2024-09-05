import './input-field-style.css'

export default function InputField(props) {

   return(
       <div style={{padding: "8px"}}>
           <input className={'input-field-style'} type={props.type} placeholder={props.placeholder}></input>
       </div>

   )
}