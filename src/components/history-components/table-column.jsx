import './table-column-style.css'

export default function TableColumn(props) {

    const columns = props.data.map((item) => {
        return item[props.header]
    })

    console.log(columns)

    function renderButton(item){

        if(item === "Inválido"){
            return (
                <button className={'button-table-column-invalid'}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '5px',
                    }}>
                        <img src={'src/assets/arrow-square.svg'}/>
                        {item}
                    </div>
                </button>
            )
        }
        else{
            return (
                <button className={'button-table-column-valid'}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <img src={'src/assets/arrow-square.svg'}/>
                        {item}
                    </div>
                </button>
            )
        }
    }

    if (props.header === "Status") {
        return (
            <div>
                <div className={'table-column-header'}>
                    {props.headerName}
                </div>
                <div style={{
                    marginTop: '5px'
                }}>
                    {columns.map((item) => (
                       renderButton(item)
                    ))}
                </div>
            </div>
        )
    }

    if(props.bold){
        return (
            <div>
                <div className={'table-column-header'}>
                    {props.headerName}
                </div>
                <div>
                    {columns.map( (item, index) => (
                        <div className={'bold-table-column'} key={index}>{columns[index]}</div>
                    ))}
                </div>
            </div>
        )
    }else {

        return (
            <div>
                <div className={'table-column-header'}>
                    {props.headerName}
                </div>
                <div>
                    {columns.map((item, index) => (
                        <div className={'table-column'} key={index}>{columns[index]}</div>
                    ))}
                </div>
            </div>
        )
    }
}