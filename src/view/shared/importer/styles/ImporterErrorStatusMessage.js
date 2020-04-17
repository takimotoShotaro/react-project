import { styled } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const ImporterErrorStatusMessage = styled('span')({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  color: red[500],
});

export default ImporterErrorStatusMessage;
