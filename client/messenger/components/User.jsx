import React, { PropTypes } from 'react';


const propTypes = {
  // TODO: user must be required
  user: PropTypes.object,
};

function User({ user }) {
  const avatar = user && user.details && user.details.avatar;
  const defaultAvatar = '/static/images/user.png';

  return (
    <div className="erxes-avatar">
      <img src={avatar || defaultAvatar} alt="avatar" />
    </div>
  );
}

User.propTypes = propTypes;

User.defaultProps = {
  user: {},
};

export default User;
