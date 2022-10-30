import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { Accordion, LoadingOverlay, Paper, Text } from '@mantine/core';
import { capitalize } from "@lfai/egeria-js-commons";
import { apiUrl } from '@lfai/egeria-js-commons';
/**
 *
 * React component used for displaying details about the application instance.
 *
 * @since      0.1.0
 * @access     public
 *
 */
class EgeriaAbout extends React.Component {
    constructor(props) {
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
            return data.json();
        })
            .then(data => {
            this.setState({
                data: Object.assign(Object.assign({}, data), { loaded: true })
            });
        });
    }
    render() {
        const { data } = this.state;
        return (_jsx(_Fragment, { children: _jsxs("div", Object.assign({ style: { height: '100%', position: 'relative' } }, { children: [_jsx(LoadingOverlay, { visible: !data.loaded }), _jsxs(Paper, Object.assign({ shadow: "xs", p: "md", style: { height: '100%' } }, { children: [_jsx(Text, Object.assign({ size: "xl" }, { children: "About" })), _jsx(Accordion, { children: Object.keys(data).filter(k => k !== 'loaded').map((k, index) => {
                                    return (_jsx(Accordion.Item, Object.assign({ label: capitalize(k) }, { children: capitalize(data[k]) }), index));
                                }) })] }))] })) }));
    }
}
export { EgeriaAbout };
