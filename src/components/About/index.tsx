import React from "react";
import { LoadingOverlay, Paper, Table, Title } from '@mantine/core';
import { capitalize } from "@lfai/egeria-js-commons";
import { apiUrl } from '@lfai/egeria-js-commons';

interface Props {
}

interface State {
  loaded: boolean,
  error: boolean,
  data: {
    name: string,
    version: string,
    commitId: string,
    buildTime: string
  }
}

/**
 *
 * React component used for displaying details about the application instance.
 *
 * @since      0.1.0
 * @access     public
 *
 */
class EgeriaAbout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loaded: false,
      error: false,
      data: {
        name: '',
        version: '',
        commitId: '',
        buildTime: ''
      }
    };
  }

  componentDidMount() {
    fetch(`${apiUrl() || ''}/about.json`)
      .then((response: any) => {
        if(!response.ok) {
          this.setState({
            loaded: true,
            error: true
          });

          const event = new CustomEvent('EGERIA_API_ERROR', {
            'detail': {
              status: response.status,
              statusText: response.statusText
            }
          });

          document.dispatchEvent(event);
        }

        return response;
      })
      .then((data: any) => {
        return data.json();
      })
      .then(data => {
        this.setState({
          loaded: true,
          data: {
            ...data
          }
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  render() {
    const { loaded, error, data }: any = this.state;
    return (<>
      <div style={{ height:'100%', position: 'relative' }}>
        <LoadingOverlay visible={!loaded} />

        { !error && loaded && <>
          <Paper radius='md' p='lg' withBorder  mb='md'>
            <Title order={2}>About</Title>
          </Paper>
          <Paper radius='md' shadow="xs" p="lg" withBorder style={{height: '100%'}}>
            <Table striped>
              <tbody>
              { Object.keys(data).filter(k => k !== 'loaded').map((k, index) => {
                return (
                  <tr key={index}>
                    <td style={{width: '20%'}}><strong>{ capitalize(k) }</strong></td>
                    <td>{ capitalize(data[k]) }</td>
                  </tr>
                );
              }) }
              </tbody>
            </Table>
          </Paper> </>}
      </div>
    </>);
  }
}

export {
  EgeriaAbout
};