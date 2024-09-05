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

    const N_pedido = props.data.N_pedido;
    const N_cte = props.data.N_cte;
    // const N_nota_fiscal = props.data.N_nota_fiscal;
    const Valor_total_cte = props.data.Valor_total_cte;
    const Local_coleta = props.data.Local_coleta;
    const Local_destino = props.data.Local_destino;
    const Status = props.data.Status;
    const id = props.data.id;

    return(
        <tr className={'table-row-line'}>
            <td style={{fontWeight: 'bold'}}>
                {N_pedido}
            </td>
            <td>
                {N_cte}
            </td>
            {/*<td>*/}
            {/*    {N_nota_fiscal}*/}
            {/*</td>*/}
            <td>
                {Valor_total_cte}
            </td>
            <td>
                {Local_coleta}
            </td>
            <td>
                {Local_destino}
            </td>
            <td>
                {renderButton(Status, id)}
            </td>
        </tr>
    )
}