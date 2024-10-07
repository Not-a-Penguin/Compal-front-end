export default function StatusButton(props) {

    if(props.status === 'valido'){
        return(
            <button>
                Válido
            </button>
        )
    }
    else{
        return(
            <button>
                Inválido
            </button>
        )
    }
}