import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs';
import s from './Modal.module.css';
// import ReactDOM from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string,
    currentImageDescription: PropTypes.string,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, currentImageUrl, currentImageDescription } = this.props;

    return (
      <>
        {createPortal(
          <div className={s.backdrop} onClick={this.handleClickBackdrop}>
            <div className={s.modal}>
              <div className={s.wrapper}>
                <button className={s.button} type="button" onClick={onClose}>
                  <BsXLg className={s.icon} />
                </button>
              </div>
              <img
                src={currentImageUrl}
                alt={currentImageDescription}
                loading="lazy"
              />
            </div>
            ,
          </div>,
          modalRoot
        )}{' '}
      </>
    );
  }
}

export default Modal;
