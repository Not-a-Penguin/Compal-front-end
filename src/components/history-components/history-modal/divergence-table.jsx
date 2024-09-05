import './history-modal-accordion-tables/history-modal-accordion.css'

export default function DivergenceTable(props) {
    return(
        <div>
            <table className={'history-modal-table'}>
                <thead>
                    <tr>
                        <th className={'history-modal-table-th'}>Divergência</th>
                        <th className={'history-modal-table-th'}>Valor esperado</th>
                        <th className={'history-modal-table-th'}>Valor CTE</th>
                    </tr>
                </thead>
                <tbody>
                {props.divergencias.map((divergencia, key) => (
                    <tr key={key}>
                        <td className={'history-modal-table-td'}>
                            {divergencia.divergencia}
                        </td>
                        <td className={'history-modal-table-td'}>
                            {divergencia.valor_esperado}
                        </td>
                        <td className={'history-modal-table-td'}>
                            {divergencia.valor_CTE}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}