// import './history-modal-accordion.css'

export default function BidDetailAccordionTable(props){

    if(props.fretes){
        return (
            <div>
                <div>
                    <table className={'history-modal-table'}>
                        <thead>
                        <tr>
                            <th className={'history-modal-table-th'}>
                                Descrição
                            </th>
                            <th className={'history-modal-table-th'}>
                                Valor mínimo
                            </th>
                            <th className={'history-modal-table-th'}>
                                Valor máximo
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.data.map((item, key) => (
                            <tr key={key}>
                                <td className={'history-modal-table-td'}>
                                    {item.descricao}
                                </td>
                                <td className={'history-modal-table-td'}>
                                    {item.valorMinimo}
                                </td>
                                <td className={'history-modal-table-td'}>
                                    {item.valorKg}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <table className={'history-modal-table'}>
                        <thead>
                        <tr>
                            <th className={'history-modal-table-th'}>
                                Descrição
                            </th>
                            <th className={'history-modal-table-th'}>
                                Porcentagem
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.data.map((item, key) => (
                            <tr key={key}>
                                <td className={'history-modal-table-td'}>
                                    {item.descricao}
                                </td>
                                <td className={'history-modal-table-td'}>
                                    {item.valor}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}