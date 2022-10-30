import React from "react";
import { Accordion, LoadingOverlay, Paper, Text } from '@mantine/core';
import { capitalize } from "@lfai/egeria-js-commons";
import { apiUrl } from '@lfai/egeria-js-commons';

interface Props {
}

interface State {
  data: {
    loaded: boolean,
    name: String,
    version: String,
    commitId: String,
    buildTime: String
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
      data: {
        loaded: false,
        name: '',
        version: '',
        commitId: '',
        buildTime: ''
      }
    };
  }

  componentDidMount() {
    fetch(`${apiUrl()}/about.json`)
      .then(data => {
        return data.json()
      })
      .then(data => {
        this.setState({
          data: {
            ...data,
            loaded: true
          }
        });
      });
  }

  render() {
    const { data }: any = this.state;

    return (<>
      <div style={{ height:'100%', position: 'relative' }}>
        <LoadingOverlay visible={!data.loaded} />

        <Paper shadow="xs" p="md" style={{height: '100%'}}>
          <Text size="xl">About</Text>
          <Accordion defaultValue="customization">
            <Accordion.Item value="customization">
              <Accordion.Control>Customization</Accordion.Control>
              <Accordion.Panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            { Object.keys(data).filter(k => k !== 'loaded').map((k, index) => {
              return (
                <Accordion.Item value={k} key={index}>
                  <Accordion.Control>{ capitalize(k) }</Accordion.Control>
                  <Accordion.Panel>{ capitalize(data[k]) }</Accordion.Panel>
                </Accordion.Item>
              );
            }) }
          </Accordion>
        </Paper>
      </div>
    </>);
  }
}

export {
  EgeriaAbout
};