import './history-header-style.css'

export default function HistoryHeader(){
    return(
        <div className={'history-header'}>
            <div>
                N° do pedido
            </div>
            <div>
                N° do CTE
            </div>
            <div>
                N° nota fiscal
            </div>
            <div>
                Valor total CTE
            </div>
            <div>
                Local de coleta
            </div>
            <div>
                Local de destino
            </div>
            <div>
                Status
            </div>
        </div>
    )
}