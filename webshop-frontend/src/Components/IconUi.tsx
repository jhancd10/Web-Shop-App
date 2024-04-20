import * as MUIcon from '@mui/icons-material'
import { IconUiProps } from '../Interfaces/IconUiProps'

export default function IconUi(props: IconUiProps) {

  const { name } = props
  const Icon = MUIcon[name as keyof typeof MUIcon]

  if (Icon == null) {
    throw `There is no "${name}" Icon`
  }
  
  return <Icon {...props} />
}