import { styled } from '@material-ui/core/styles';

const I18nFlagsWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '24px',

  '& img': {
    marginRight: '8px',
    cursor: 'pointer',
  },
});

export default I18nFlagsWrapper;
