export default function TextButton(props) {
    return(
        <button className={props.style} onClick={props.onClick}>{props.text}</button>
    )
}