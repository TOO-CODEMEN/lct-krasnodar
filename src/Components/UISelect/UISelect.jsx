import { FormControl, InputLabel, Select } from "@mui/material"
import { useController } from "react-hook-form"

export const UISelect = ({ control, name, label, children, defaultValue = '', multiple }) => {

    const { field } = useController({
        name,
        control,
        defaultValue
    })

    return (
        <FormControl fullWidth sx={{ marginTop: '5px' }} >
            <label style={{ alignItems: "normal", flexDirection: 'column' }}>
                {label}
                <Select
                    {...field}
                    labelId="select-label"
                    multiple={multiple}
                    sx={{
                        color: 'black',
                        marginBottom: '15px',
                        marginTop: '4px',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: "#979797" },
                        '& .MuiInputBase-input': { paddingY: '13.5px' }
                    }}
                >
                    {children}
                </Select>
            </label>
        </FormControl>
    )
}