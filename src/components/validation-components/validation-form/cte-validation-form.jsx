import FormTitleText from "./form-title-text.jsx";
import CteValidationInput from "./cte-validation-input.jsx";

export default function CteValidationForm(props) {

    const title = props.title;
    const placeholder = props.placeholder;
    const disabled = props.disabled;

    let inputType = "text"
    if(props.inputType){
        inputType = props.inputType;
    }

    // console.log(inputType);
    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'start',
            gap: '10px',
            padding: "20px"
        }}>
            <FormTitleText text={title}/>
            <CteValidationInput placeholder={placeholder} disabled={disabled} inputType={inputType} id={props.id} value={props.value}/>
        </div>
    )
}