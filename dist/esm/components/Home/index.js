var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, Container, Group, Header, TextInput, createStyles, MultiSelect, LoadingOverlay, Paper, Checkbox, Button } from '@mantine/core';
import { AlertCircle, Search } from 'tabler-icons-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { currentJwt, logout, goHome, fetchTypes, ABOUT_PATH, ASSET_CATALOG_PATH } from '@lfai/egeria-js-commons';
const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },
    links: {
        width: 260,
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));
export const links = [
    {
        "link": "/",
        "label": "Home"
    },
    {
        "link": ASSET_CATALOG_PATH,
        "label": "Catalog"
    },
    {
        "link": ABOUT_PATH,
        "label": "About"
    }
];
const emptyTypesData = [];
export function EgeriaHome(props) {
    const { links } = props;
    const navigate = useNavigate();
    const [q, setQ] = useState('');
    const [types, setTypes] = useState([]);
    const [inputValidation, setErrorInputValidation] = useState({
        isError: false,
        errorMessage: ''
    });
    const { classes } = useStyles();
    const isLoggedIn = currentJwt();
    const [exactMatch, setExactMatch] = useState(false);
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [typesData, setTypesData] = useState({
        isLoading: true,
        typesData: [...emptyTypesData]
    });
    useEffect(() => {
        setTypesData(Object.assign(Object.assign({}, typesData), { isLoading: true }));
        const bringTypes = () => __awaiter(this, void 0, void 0, function* () {
            const rawTypesData = yield fetchTypes();
            setTypesData({
                isLoading: false,
                typesData: [...rawTypesData]
            });
        });
        bringTypes();
    }, []);
    const items = links.map((link, index) => (_jsx(NavLink, Object.assign({ className: classes.link, to: link.link }, { children: link.label }), index)));
    const submit = () => {
        const paramsValid = areParamsValid();
        if (paramsValid && inputValidation.isError) {
            setErrorInputValidation({
                isError: false,
                errorMessage: ''
            });
        }
        if (areParamsValid()) {
            navigate(`${ASSET_CATALOG_PATH}?q=${q}&types=${types.join(',')}&exactMatch=${exactMatch}&caseSensitive=${caseSensitive}`);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            submit();
        }
    };
    const areParamsValid = () => {
        if (q.length < 3) {
            setErrorInputValidation({
                isError: true,
                errorMessage: 'The query must be at least 3 characters long'
            });
            return false;
        }
        const selectedTypes = types;
        if (!selectedTypes || selectedTypes.length === 0) {
            setErrorInputValidation({
                isError: true,
                errorMessage: 'You must select at least one type'
            });
            return false;
        }
        return true;
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, Object.assign({ height: 56, mb: 100 }, { children: _jsxs(Container, Object.assign({ className: classes.inner }, { children: [_jsx(Group, Object.assign({ className: classes.links, spacing: 5 }, { children: items })), _jsxs(Group, Object.assign({ spacing: 0, position: "right", noWrap: true }, { children: [isLoggedIn && _jsx(Button, Object.assign({ variant: "light", onClick: () => { logout(goHome); } }, { children: "Logout" })), !isLoggedIn && _jsx(NavLink, Object.assign({ to: `/login` }, { children: _jsx(Button, Object.assign({ variant: "light" }, { children: "Login" })) }))] }))] })) })), _jsx(Container, Object.assign({ style: { display: 'flex', alignItems: 'center', justifyContent: 'center' }, mb: 50 }, { children: _jsx(NavLink, Object.assign({ to: '/' }, { children: _jsx("img", { src: "http://localhost:3000/egeria-logo.svg", alt: "Egeria", title: "Egeria", style: { height: 150 } }) })) })), _jsx(Container, { children: _jsxs(Paper, Object.assign({ shadow: "md", radius: "lg" }, { children: [_jsxs("div", Object.assign({ style: { display: 'flex', padding: 20, flexWrap: 'wrap', justifyContent: 'space-between' } }, { children: [_jsx(TextInput, { style: { width: '69%' }, icon: _jsx(Search, { size: 18 }), radius: "lg", size: "md", value: q, onKeyPress: handleKeyPress, onChange: (event) => setQ(event.currentTarget.value), placeholder: "Search terms", rightSectionWidth: 42 }), _jsx(MultiSelect, { data: typesData.typesData, value: types, onChange: (value) => setTypes([...value]), radius: "lg", size: "md", placeholder: "Type", style: { width: '30%' } })] })), _jsxs("div", Object.assign({ style: { display: 'flex', padding: 20, paddingTop: 0, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' } }, { children: [_jsxs("div", Object.assign({ style: { width: '40%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' } }, { children: [_jsx(Checkbox, { mr: "xl", label: 'Exact match', checked: exactMatch, onChange: (event) => setExactMatch(event.currentTarget.checked) }), _jsx(Checkbox, { mr: "xl", label: 'Case sensitive', checked: caseSensitive, onChange: (event) => setCaseSensitive(event.currentTarget.checked) })] })), _jsx("div", Object.assign({ style: { width: '60%' } }, { children: _jsx(Button, Object.assign({ fullWidth: true, onClick: () => submit() }, { children: "Search" })) }))] })), _jsx("div", { children: inputValidation.isError &&
                                _jsx(Alert, Object.assign({ icon: _jsx(AlertCircle, { size: 16 }), color: "red" }, { children: _jsx("p", { children: inputValidation.errorMessage }) })) })] })) }), _jsx(LoadingOverlay, { visible: typesData.isLoading })] }));
}
