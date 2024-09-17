import '../history-components/table-row-style.css'

export default function BidTableRow(props){

    const transportadora = props.data.transportadora;
    const origem = props.data.origem;
    const destino = props.data.destino;
    const id = props.data.id;

    function renderButton(id){
        return(
            <button className={'button-table-row-valid'} style={{width: '130px'}} onClick={function (){props.buttonStatus(id)}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '5px',
                }}>
                    <img src={'src/assets/arrow-square.svg'}/>
                    Preencher BID
                </div>
            </button>
        )
    }

    return (
        <tr className={'table-row-line'}>
            <td style={{fontWeight: 'bold'}}>
                {transportadora}
            </td>
            <td>
                {origem}
            </td>
            <td>
                {destino}
            </td>
            <td>
                {renderButton(id)}
            </td>
        </tr>
    )
}