import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'modules/shared/fileUpload/fileUploader';
import Errors from 'modules/shared/error/errors';
import { i18n } from 'i18n';
import ImageModal from 'view/shared/modals/ImageModal';
import { Button, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  uploadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  card: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: '100px',
    '&:hover div': {
      display: 'block',
    },
  },

  image: {
    borderRadius: '5px',
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  },

  imageButtons: {
    display: 'none',
    position: 'relative',
    bottom: '3.3rem',
    width: '100px',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
  },

  imageButtonIcon: {
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
  },
});

class ImagesUploader extends Component {
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

  doPreviewImage = (image) => {
    this.setState({
      imageSrc: image.publicUrl,
      imageAlt: image.name,
    });
  };

  doCloseImageModal = () => {
    this.setState({
      imageSrc: null,
      imageAlt: null,
    });
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
          accept="image/*"
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
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
          >
            {this.value().map((item) => {
              return (
                <div className={classes.card} key={item.id}>
                  <img
                    alt={item.name}
                    src={item.publicUrl}
                    className={classes.image}
                  />

                  <div className={classes.imageButtons}>
                    <IconButton
                      onClick={() =>
                        this.doPreviewImage(item)
                      }
                    >
                      <SearchIcon
                        className={classes.imageButtonIcon}
                      />
                    </IconButton>

                    {!readonly && (
                      <IconButton
                        onClick={() =>
                          this.handleRemove(item.id)
                        }
                      >
                        <CloseIcon
                          className={
                            classes.imageButtonIcon
                          }
                        />
                      </IconButton>
                    )}
                  </div>
                </div>
              );
            })}
          </Box>
        ) : null}

        {this.state.imageSrc && (
          <ImageModal
            src={this.state.imageSrc}
            alt={this.state.imageAlt}
            onClose={() => this.doCloseImageModal()}
          />
        )}
      </div>
    );
  }
}

ImagesUploader.propTypes = {
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

export default withStyles(styles)(ImagesUploader);
