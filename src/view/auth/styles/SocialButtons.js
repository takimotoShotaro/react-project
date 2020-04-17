import { styled } from '@material-ui/core/styles';

const SocialButtons = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '24px',

  '& > img': {
    marginLeft: '16px',
    marginRight: '16px',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
  },
});

export default SocialButtons;
