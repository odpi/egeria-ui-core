import React from 'react';
import { token } from '@lfai/egeria-js-commons';

interface Props {
}

interface State {
  displayName: string;
}

/**
 *
 * React component used for displaying UserInfo from JWT Token.
 *
 * @since      0.1.0
 * @access     public
 *
 */
class UserInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      displayName: ''
    };
  }

  componentDidMount() {
    const _token = token.decodedObject();
    const username = _token?.sub;

    this.setState<any>({
      displayName: username
    });
  }

  render() {
    const { displayName } = this.state;

    return (
      <div>
        <span>{ displayName }</span>
      </div>
    );
  }
}

export default UserInfo;