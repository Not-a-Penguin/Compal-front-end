// import './history-modal-accordion.css'

export default function BidDetailAccordionTable(props){
    return(
        <div>
            <div>
                <table className={'history-modal-table'}>
                    <thead>
                    <tr>
                        <th className={'history-modal-table-th'}>
                            Descrição
                        </th>
                        <th  className={'history-modal-table-th'}>
                            Porcentagem
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.data.map((item, key) => (
                        <tr key={key}>
                            <td  className={'history-modal-table-td'}>
                                {item.descricao}
                            </td>
                            <td  className={'history-modal-table-td'}>
                                {item.porcentagem}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}