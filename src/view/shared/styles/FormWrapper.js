import styled from 'styled-components';

const FormWrapper = styled('div')({
  paddingTop: 0,
  paddingBottom: 0,
});

export const FormButtons = styled('div')({
  paddingTop: '16px',
  display: 'flex',

  '& > *': {
    marginRight: '8px',
    marginBottom: '8px',
  },
});

export default FormWrapper;
