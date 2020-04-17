import { styled } from '@material-ui/core/styles';

const FilterWrapper = styled('div')({
  padding: '16px',
  marginBottom: '16px',
  border: '1px solid rgb(224, 224, 224)',
  borderRadius: '5px',
});

export const FilterButtons = styled('div')({
  paddingTop: '16px',
  textAlign: 'right',

  '& > *': {
    marginLeft: '8px',
    marginBottom: '8px',
  },
});

export default FilterWrapper;
