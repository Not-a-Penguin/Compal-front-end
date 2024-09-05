export default function StatusButton(props) {

    if(props.status === 'valido'){
        return(
            <button>
                valido
            </button>
        )
    }
    else{
        return(
            <button>
                invalido
            </button>
        )
    }
}