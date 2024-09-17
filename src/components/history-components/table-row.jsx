import './table-row-style.css'

export default function TableRow(props) {

    function renderButton(Status, id){

        if(Status === "Inválido"){
            return (
                <button className={'button-table-row-invalid'} onClick={function (){props.buttonStatus(Status, id)}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '5px',
                    }}>
                        <img src={'src/assets/arrow-square.svg'}/>
                        {Status}
                    </div>
                </button>
            )
        }
        else{
            return (
                <button className={'button-table-row-valid'} onClick={function (){props.buttonStatus(Status, id)}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <img src={'src/assets/arrow-square.svg'}/>
                        {Status}
                    </div>
                </button>
            )
        }
    }

    const N_pedido = props.data.cte.numeroPedido;
    const N_cte = props.data.cte.numeroCte;
    const qtd_notas_fiscais = props.data.cte._count.nfe;
    const valor_total_cte = props.data.cte.nfe[0].valortotal;
    const transportadora = props.data.bid.transportadora.descricao;
    const remetente = props.data.cte.remetente[0].nome;
    const destinatario = props.data.cte.destinatario[0].nome;
    const status = props.data.status;
    const id = props.data.id;

    return(
        <tr className={'table-row-line'}>
            <td style={{fontWeight: 'bold'}}>
                {N_pedido}
            </td>
            <td>
                {N_cte}
            </td>
            <td>
                {transportadora}
            </td>
            <td>
                {qtd_notas_fiscais}
            </td>
            <td>
                {valor_total_cte}
            </td>
            <td>
                {remetente}
            </td>
            <td>
                {destinatario}
            </td>
            <td>
                {renderButton(status, id)}
            </td>
        </tr>
    )
}