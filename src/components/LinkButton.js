import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const LinkButton = ({ type, link, onClick, children }) => {
  return (
    <Link to={link}>
      <Button
        type={type}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  )
};

LinkButton.propTypes = {
  type: PropTypes.string,
  link: PropTypes.string.isRequired,
  onclick: PropTypes.func,
  children: PropTypes.any,
};

export default LinkButton;
