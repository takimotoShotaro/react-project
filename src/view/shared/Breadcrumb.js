import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumbs,
  Typography,
  Link as MaterialLink,
} from '@material-ui/core';

class Breadcrumb extends Component {
  isLink = (item) => {
    return item.length > 1;
  };

  render() {
    return (
      <Breadcrumbs>
        {this.props.items.map((item, index) => {
          if (this.isLink(item)) {
            return (
              <MaterialLink
                key={item[0]}
                color="inherit"
                component={Link}
                to={item[1]}
              >
                {item[0]}
              </MaterialLink>
            );
          }

          return (
            <Typography key={item[0]} color="textPrimary">
              {item[0]}
            </Typography>
          );
        })}
      </Breadcrumbs>
    );
  }
}

export default Breadcrumb;
