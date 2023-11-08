import { TextField } from "@mui/material"

export const Input = (props) => {
    return (
        <TextField onChange={(event) => (
            props.setValue(typeof props.object == "object" ? (value) => (
                {
                    ...value,
                    [props.typeObject]: event.target.value
                }
            ) : event.target.value))}
            required
            label={props.label}
            value={props.value}
            type={props.type}
            sx={{ width: '500px', marginBottom: 2 }}
        />
    )
}