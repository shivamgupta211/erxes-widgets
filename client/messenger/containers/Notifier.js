import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { Notifier as DumbNotifier } from '../components';
import { changeRoute, toggle, changeConversation, toggleNotifer } from '../actions/messenger';
import { readEngageMessage, readMessages } from '../actions/messages';

import { connection } from '../connection';
import NotificationSubscriber from './NotificationSubscriber';
import graphqlTypes from './graphql';

class Notifier extends NotificationSubscriber {
  render() {
    if (this.props.data.loading) {
      return null;
    }

    const lastUnreadMessage = this.props.data.lastUnreadMessage;

    if (!lastUnreadMessage || !lastUnreadMessage._id) {
      return null;
    }

    const uiOptions = connection.data.uiOptions || {};

    const extendedProps = {
      ...this.props,
      lastUnreadMessage,
      color: uiOptions.color,
    };

    return <DumbNotifier {...extendedProps} />;
  }
}

const mapStateToProps = state => ({
  isMessengerVisible: state.isVisible,
});

const mapDisptachToProps = dispatch => ({
  readMessage({ conversationId, engageData }) {
    // show messenger
    dispatch(toggle());

    // change route
    dispatch(changeRoute('conversation'));

    // set current conversation
    dispatch(changeConversation(conversationId));

    // mark as read
    dispatch(readMessages(conversationId));

    // if engage message then add this customer to received list
    if (engageData) {
      dispatch(readEngageMessage({ engageData }));
    }

    toggleNotifer();

    toggle();
  },
});

const NotifierWithData = graphql(
  gql`
    query lastUnreadMessage(${connection.queryVariables}) {
      lastUnreadMessage(${connection.queryParams}) {
        ${graphqlTypes.messageFields}
      }
    }
  `,

  {
    options: () => ({
      fetchPolicy: 'network-only',
      variables: connection.data,
    }),
  },
)(Notifier);

export default connect(mapStateToProps, mapDisptachToProps)(NotifierWithData);
