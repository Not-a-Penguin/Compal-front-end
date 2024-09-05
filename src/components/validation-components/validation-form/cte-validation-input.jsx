import './cte-validation-form-style.css'

export default function CteValidationInput(props) {

    // console.log("Inside CTE validation input. Id =", props.id)
    let disabled = false;
    props.disabled ? disabled = true : disabled = false;
    return(
        <div>
            {disabled ? <input className={'cte-validation-input'} placeholder={props.placeholder} disabled id={props.id} value={props.value}/> :
                <input type={props.inputType} className={'cte-validation-input'} placeholder={props.placeholder} id={props.id} value={props.value}></input>}
        </div>
    )
}