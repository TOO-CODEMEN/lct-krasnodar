
export const Input = (props) => {
    return (
        <input
            required={props.required}
            placeholder={props.placeholder}
            value={props.value}
            type={props.type}
        />
    )
}