import './sidebar-button-style.css'

export default function SidebarButton(props) {

    if(props.id === props.isCurrentMenu){
        return (
            <button onClick={props.clicked} id={props.id}
                    className={'button-sidebar-active'}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <img src={props.icon} alt={'icon'}/>
                    {props.text}
                </div>
            </button>
        )
    }

    else{
        return (
            <button onClick={props.clicked} id={props.id} className={'button-sidebar'}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <img src={props.icon} alt={'icon'}/>
                    {props.text}
                </div>
            </button>
        )
    }
}