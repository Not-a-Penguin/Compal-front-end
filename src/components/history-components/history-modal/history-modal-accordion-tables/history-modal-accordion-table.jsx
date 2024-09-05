import './history-modal-accordion.css'

export default function HistoryModalAccordionTable(props){

    console.log(props.data)

    return(
        <div>
            <div className={'regular-modal-text'}>Itens do pedido</div>
            <div>
                <table className={'history-modal-table'}>
                    <thead>
                    <tr>
                        <th className={'history-modal-table-th'}>
                            Quantidade
                        </th>
                        <th  className={'history-modal-table-th'}>
                            Part number
                        </th>
                        <th  className={'history-modal-table-th'}>
                            Descrição
                        </th>
                        <th  className={'history-modal-table-th'}>
                            Valor unitário
                        </th>
                        <th  className={'history-modal-table-th'}>
                            Total
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.data.map((item, key) => (
                        <tr key={key}>
                            <td  className={'history-modal-table-td'}>
                                {item.quantidade}
                            </td>
                            <td  className={'history-modal-table-td'}>
                                {item.part_number}
                            </td>
                            <td  className={'history-modal-table-td'}>
                                {item.descricao}
                            </td>
                            <td  className={'history-modal-table-td'}>
                                {item.valor_unitario}
                            </td>
                            <td  className={'history-modal-table-td'}>
                                {item.valor_total}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={'regular-modal-text'}>Data do pedido:</div>
            <div className={'regular-modal-text'}>Transportadora:</div>
        </div>
    )
}