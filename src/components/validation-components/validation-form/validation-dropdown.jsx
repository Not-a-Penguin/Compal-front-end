import FormTitleText from "./form-title-text.jsx";

export default function ValidationDropdown(props){

    const selections= props.dropdownData;
    // console.log(selections);

    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'start',
            gap: '10px',
            padding: "20px"
        }}>
            <FormTitleText text={props.title}/>
            <select className={'cte-dropdown'} id={props.id}>
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