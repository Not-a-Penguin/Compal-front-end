import '../history-components/table-row-style.css'

export default function ProductRegisterTableRow(props) {

    function renderButton(Status, id){
        return (
            <button className={'button-table-row-invalid'} onClick={function (){props.buttonStatus(id)}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <img src={'src/assets/trash-can.svg'}/>
                    Excluir
                </div>
            </button>
        )
    }

    return(
        <tr className={'table-row-line'}>
            {/*<td style={{fontWeight: 'bold'}}>*/}
            {/*    {pn_compal}*/}
            {/*</td>*/}
            {props.columns.map((column, i) => {
                return(
                    <td key={i}>{column}</td>
                )
            })}
            {/*{props.noDelete ? <div></div> : <td>*/}
            {/*    {renderButton(props.columns.id)}*/}
            {/*</td>}*/}

        </tr>
    )
}