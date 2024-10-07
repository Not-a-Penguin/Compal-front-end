import FormTitleText from "../validation-components/validation-form/form-title-text.jsx";
import './bid-outros-dropdown-style.css'

export default function BidOutrosDropdown(props) {
    const selections = props.dropdownData;
    // console.log(selections);

    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            // alignItems: 'start',
            justifyContent: 'space-between',
            gap: '10px',
            // padding: "20px"
        }}>
            {/*<FormTitleText text={props.title}/>*/}
            <div className={'bid-outros-dropdown-title'}>
                {props.title}
            </div>
            <select className={'bid-outros-dropdown'} id={props.id}>
                <option value="" disabled selected hidden>
                    Escolha uma opção
                </option>
                {selections.map((selection, index) => {
                    return <option id={index} key={index} value={selection}>{selection}</option>
                })}
            </select>
        </div>
    )
}