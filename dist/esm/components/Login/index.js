import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, Button, Container, Group, LoadingOverlay, Paper, PasswordInput, TextInput } from '@mantine/core';
import { useState } from 'react';
import { AlertCircle } from 'tabler-icons-react';
import { login } from '@lfai/egeria-js-commons';
export function EgeriaLogin(props) {
    const { loginCallback } = props;
    const [username, setUsername] = useState({ value: '', isValid: false, isPristine: true });
    const [password, setPassword] = useState({ value: '', isValid: false, isPristine: true });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const validate = (field, value) => {
        if (value !== '') {
            return Object.assign(Object.assign({}, field), { value: value, isValid: true });
        }
        else {
            return Object.assign(Object.assign({}, field), { value: value, isValid: false });
        }
    };
    const handleSubmit = () => {
        setUsername(Object.assign({}, validate(Object.assign(Object.assign({}, username), { isPristine: false }), username.value)));
        setPassword(Object.assign({}, validate(Object.assign(Object.assign({}, password), { isPristine: false }), password.value)));
        if (username.isValid && password.isValid) {
            setIsLoading(true);
            login(username.value, password.value).then((response) => {
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
                    setErrors(errors);
                    setIsLoading(false);
                }
                else {
                    loginCallback();
                }
            });
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    return _jsx(_Fragment, { children: _jsxs(Container, Object.assign({ mt: 100, size: 420 }, { children: [_jsx(Group, Object.assign({ align: "center", className: "egeria-logo" }, { children: _jsx("img", { src: "http://localhost:3000/egeria-logo.svg", style: { width: '80%', margin: '0 auto' }, alt: "Egeria", title: "Egeria" }) })), _jsxs("div", Object.assign({ style: { width: 420, position: 'relative' } }, { children: [_jsx(LoadingOverlay, { visible: isLoading }), _jsxs(Paper, Object.assign({ withBorder: true, shadow: "md", p: 30, mt: 30, radius: "md" }, { children: [errors.length > 0 && _jsx(Group, Object.assign({ mb: 20 }, { children: _jsx(Alert, Object.assign({ style: { width: 420 }, icon: _jsx(AlertCircle, { size: 16 }), title: "Warning!", color: "red" }, { children: errors.map((e, key) => _jsx("p", { children: e }, key)) })) })), _jsx(TextInput, { label: "Username", placeholder: "Your username", required: true, error: !username.isValid && !username.isPristine ? 'Field is required.' : '', value: username.value, onKeyPress: handleKeyPress, onChange: (event) => setUsername(Object.assign({}, validate(Object.assign(Object.assign({}, username), { isPristine: false }), event.currentTarget.value))) }), _jsx(PasswordInput, { label: "Password", placeholder: "Your password", required: true, error: !password.isValid && !password.isPristine ? 'Field is required.' : '', mt: "md", value: password.value, onKeyPress: handleKeyPress, onChange: (event) => setPassword(Object.assign({}, validate(Object.assign(Object.assign({}, username), { isPristine: false }), event.currentTarget.value))) }), _jsx(Button, Object.assign({ fullWidth: true, mt: "xl", onClick: () => handleSubmit() }, { children: "Sign in" }))] }))] }))] })) });
}
