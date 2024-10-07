import '../history-components/table-row-style.css'

export default function BidTableRow(props){

    const transportadora = props.data.transportadora.descricao;
    const origem = props.data.origem.descricao;
    const destino = props.data.destino.descricao;
    const id = props.data.id;

    function renderFillBid(id){
        return(
            <button className={'button-table-row-valid'} style={{width: '130px'}} onClick={function (){props.fillBidButton(id)}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '5px',
                }}>
                    <img src={'src/assets/arrow-square.svg'}/>
                    Editar BID
                </div>
            </button>
        )
    }

    function renderDetailsBid(id){
        return(
            <button className={'button-table-row-valid'} style={{width: '130px'}} onClick={function (){props.detailBidButton(id)}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '5px',
                }}>
                    <img src={'src/assets/arrow-square.svg'}/>
                    Detalhes
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
                {renderFillBid(id)}
                {renderDetailsBid(id)}
            </td>
        </tr>
    )
}