import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'modules/shared/fileUpload/fileUploader';
import Errors from 'modules/shared/error/errors';
import { i18n } from 'i18n';
import AddIcon from '@material-ui/icons/Add';
import LinkIcon from '@material-ui/icons/Link';
import ClearIcon from '@material-ui/icons/Clear';
import {
  Button,
  Link as MaterialLink,
  Box,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  uploadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  linkIcon: {
    marginRight: theme.spacing(1),
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearLink: {
    marginLeft: theme.spacing(1),
  },
});

class FilesUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.input = React.createRef();
  }

  value = () => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  fileList = () => {
    return this.value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.publicUrl,
    }));
  };

  handleRemove = (id) => {
    this.props.onChange(
      this.value().filter((item) => item.id !== id),
    );
  };

  handleChange = async (event) => {
    try {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      let file = files[0];

      FileUploader.validate(file, this.props.schema);

      this.setState({ loading: true });

      file = await FileUploader.upload(
        this.props.path,
        file,
        this.props.schema,
      );

      this.input.current.value = '';

      this.setState({ loading: false });
      this.props.onChange([...this.value(), file]);
    } catch (error) {
      this.input.current.value = '';
      console.log('error', error);
      this.setState({ loading: false });
      Errors.showMessage(error);
    }
  };

  formats = () => {
    const { schema } = this.props;

    if (schema && schema.formats) {
      return schema.formats
        .map((format) => `.${format}`)
        .join(',');
    }

    return undefined;
  };

  render() {
    const { max, readonly, classes } = this.props;
    const { loading } = this.state;

    const uploadButton = (
      <Button
        component="label"
        disabled={loading}
        startIcon={<AddIcon />}
        variant="outlined"
        className={classes.uploadButton}
      >
        {i18n('fileUploader.upload')}
        <input
          style={{ display: 'none' }}
          disabled={loading || readonly}
          accept={this.formats()}
          type="file"
          onChange={this.handleChange}
          ref={this.input}
        />
      </Button>
    );

    return (
      <div>
        {readonly || (max && this.fileList().length >= max)
          ? null
          : uploadButton}

        {this.value() && this.value().length ? (
          <div>
            {this.value().map((item) => {
              return (
                <Box
                  display="flex"
                  alignItems="center"
                  key={item.id}
                >
                  <MaterialLink
                    className={classes.link}
                    href={item.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <LinkIcon
                      className={classes.linkIcon}
                      color="primary"
                    />

                    {item.name}
                  </MaterialLink>

                  {!readonly && (
                    <MaterialLink
                      component="button"
                      color="secondary"
                      onClick={() =>
                        this.handleRemove(item.id)
                      }
                      className={classes.clearLink}
                    >
                      <ClearIcon fontSize="small" />
                    </MaterialLink>
                  )}
                </Box>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

FilesUploader.propTypes = {
  readonly: PropTypes.bool,
  path: PropTypes.string,
  max: PropTypes.number,
  schema: PropTypes.shape({
    image: PropTypes.bool,
    size: PropTypes.number,
    formats: PropTypes.arrayOf(PropTypes.string),
  }),
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default withStyles(styles)(FilesUploader);
