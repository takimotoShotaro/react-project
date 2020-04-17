import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from './modules/components/Typography';
import ProductHeroLayout from './modules/views/ProductHeroLayout';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {i18n} from "../../i18n";

const backgroundImage = '/images/lp/3.jpg';

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function Body(props) {
  const { classes } = props;
  // const isSP = !useMediaQuery('(min-width:600px)');

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <Typography color="inherit" align="center" variant="h4" className={classes.h5}>
        {i18n('lp.message')}
      </Typography>
      <Link style={{textDecoration: 'none'}} to="/auth/signup">
        <Button
          variant="outlined"
          color="primary"
          style={{color: 'white', border: '2px solid white', fontWeight: 'bold'}}
          className={classes.button}>
          {i18n('lp.startNow')}
        </Button>
      </Link>
    </ProductHeroLayout>
  );
}

Body.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);
