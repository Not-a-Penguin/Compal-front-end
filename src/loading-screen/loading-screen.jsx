import './loading-screen-style.css'

function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="logo">
                <img className={"bank-card-double"} src={'src/assets/credit-card.svg'} alt={'Credit Card'}/>
                <div className={'text'}>compal</div>
            </div>
        </div>
    )
}

export default LoadingScreen