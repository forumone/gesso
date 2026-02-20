import parse from 'html-react-parser';
import React from 'react';
import twigTemplate from './modal.twig';
import data from './modal.yml';
import './modal.source.scss';
import './modal.source';
import componentInfo from './modal.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Modal',
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
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
