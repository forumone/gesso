import parse from 'html-react-parser';
import React from 'react';
import twigTemplate from './modal.twig';
import data from './modal.yml';
import './modal.source.scss';
import './modal.source';

const settings = {
  title: 'Components/Modal',
  decorators: Story => (
    <div className="l-constrain u-spaced-5">
      <button
        className="c-button js-modal-open"
        aria-controls="modal-1234"
        type="submit"
      >
        Open Modal
      </button>
      <Story />
    </div>
  ),
};

const Modal = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Modal };
