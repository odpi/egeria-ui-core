import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Alert, Button, Container, Group, Paper, PasswordInput, TextInput } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
import { login } from '@lfai/egeria-js-commons';
export class EgeriaLogin extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = () => {
            const { username, password } = this.state;
            const { apiUrl } = this.props;
            this.setState({
                isLoading: true
            }, () => {
                login(username, password, apiUrl).then((response) => {
                    let errors = [];
                    if (!response.ok) {
                        switch (response.status) {
                            case 401:
                                errors.push('Wrong credentials!');
                                break;
                            case 403:
                                errors.push('You are not authorized to access this application.');
                                break;
                            default:
                                errors.push('Ops! Cannot authenticate right now.');
                                break;
                        }
                        this.setState({
                            errors,
                            isLoading: false
                        });
                    }
                    else {
                        const { loginCallback } = this.props;
                        loginCallback();
                    }
                });
            });
        };
        this.handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                this.handleSubmit();
            }
        };
        this.state = {
            errors: [],
            isLoading: false,
            password: '',
            username: ''
        };
    }
    componentDidMount() {
        document.addEventListener("keypress", this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleKeyPress);
    }
    render() {
        const { errors, username, password } = this.state;
        return (_jsxs(Container, Object.assign({ size: 420, my: 40 }, { children: [_jsx(Group, Object.assign({ align: "center", className: "egeria-logo" }, { children: _jsx("img", { src: "/egeria-logo.svg", alt: "Egeria", title: "Egeria" }) })), errors.length > 0 && _jsx(Group, Object.assign({ mt: 30 }, { children: _jsx(Alert, Object.assign({ style: { width: 420 }, icon: _jsx(AlertCircle, { size: 16 }), title: "Bummer!", color: "red", radius: "md", variant: "outline" }, { children: errors.map((e, key) => _jsx("p", { children: e }, key)) })) })), _jsxs(Paper, Object.assign({ withBorder: true, shadow: "md", p: 30, mt: 30, radius: "md" }, { children: [_jsx(TextInput, { label: "Username", placeholder: "Your username", required: true, value: username, onChange: (event) => this.setState({ username: event.currentTarget.value }) }), _jsx(PasswordInput, { label: "Password", placeholder: "Your password", required: true, mt: "md", value: password, onChange: (event) => this.setState({ password: event.currentTarget.value }) }), _jsx(Button, Object.assign({ fullWidth: true, mt: "xl", onClick: () => this.handleSubmit() }, { children: "Sign in" }))] }))] })));
    }
}
