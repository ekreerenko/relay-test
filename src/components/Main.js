import React, { memo } from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import environment from '../RelayEnvironment.js';
import styles from './Main.module.scss';

function Main() {

  return (
    <div className={styles.container}>
      <h2>Main info</h2>
      <QueryRenderer
        environment={environment}
        query={graphql`
        query MainUserQuery {
          viewer {
          user {
            firstName
            lastName
          }
        }
      }
      `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div className={styles.containerInfo}>
            <div className={styles.label}>
              first Name
              <span>{props.viewer.user.firstName}</span>
            </div>
            <div className={styles.label}
            >last Name
            <span>{props.viewer.user.lastName}</span>
            </div>
          </div>;
        }}
      />
    </div>
  );
}

export default memo(Main);


