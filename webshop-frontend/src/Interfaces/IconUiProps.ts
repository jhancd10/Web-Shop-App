import { IconTypeMap } from "@mui/material"

type IconProps = IconTypeMap['props']

export interface IconUiProps extends IconProps {
    name: string | undefined
}