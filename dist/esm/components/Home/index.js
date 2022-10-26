import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ActionIcon, Container, Group, Header, TextInput, createStyles, useMantineTheme, MultiSelect, LoadingOverlay } from '@mantine/core';
import { Search, ArrowRight, ArrowLeft, BrandGithub, BrandSlack, Logout, Login } from 'tabler-icons-react';
import { FeaturesGrid } from '../Features';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { currentJwt, logout, goHome, types } from '@lfai/egeria-js-commons';
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
    social: {
        width: 260,
        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },
    burger: {
        marginRight: theme.spacing.md,
        [theme.fn.largerThan('sm')]: {
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
    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
        },
    },
}));
export const links = [
    {
        "link": "/",
        "label": "Home"
    },
    {
        "link": "/assets/catalog",
        "label": "Catalog"
    },
    {
        "link": "/about",
        "label": "About"
    }
];
export function EgeriaHome({ links }) {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const isLoggedIn = currentJwt();
    const [typesData, setTypesData] = useState([]);
    useEffect(() => {
        types.getAll().then((response) => response.json()).then((data) => {
            setTypesData(data.map((d) => {
                return {
                    value: d.name,
                    label: d.name
                };
            }));
        });
    }, []);
    const items = links.map((link, index) => (_jsx(NavLink, Object.assign({ className: classes.link, to: link.link }, { children: link.label }), index)));
    return (_jsxs(_Fragment, { children: [_jsx(Header, Object.assign({ height: 56, mb: 15 }, { children: _jsxs(Container, Object.assign({ className: classes.inner }, { children: [_jsx(Group, Object.assign({ className: classes.links, spacing: 5 }, { children: items })), _jsx("img", { src: "/egeria-logo.svg", alt: "Egeria", title: "Egeria", style: { height: 40 } }), _jsxs(Group, Object.assign({ spacing: 0, className: classes.social, position: "right", noWrap: true }, { children: [_jsx(ActionIcon, Object.assign({ size: "lg", title: "Github", onClick: () => { window.open('https://github.com/odpi', '_blank'); } }, { children: _jsx(BrandGithub, { size: 18 }) })), _jsx(ActionIcon, Object.assign({ size: "lg", title: "Slack", onClick: () => { window.open('https://lfaifoundation.slack.com', '_blank'); } }, { children: _jsx(BrandSlack, { size: 18 }) })), isLoggedIn && _jsx(ActionIcon, Object.assign({ size: "lg", title: 'Logout', onClick: () => { logout(goHome); } }, { children: _jsx(Logout, { size: 18 }) })), !isLoggedIn && _jsx(NavLink, Object.assign({ to: `/login` }, { children: _jsx(ActionIcon, Object.assign({ size: "lg", title: `Login` }, { children: _jsx(Login, { size: 18 }) })) }))] }))] })) })), _jsxs(Container, Object.assign({ mt: 70, style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' } }, { children: [_jsx(MultiSelect, { data: typesData, radius: "xl", size: "md", placeholder: "Type", style: { width: '30%' } }), _jsx(TextInput, { style: { width: '69%' }, icon: _jsx(Search, { size: 18 }), radius: "xl", size: "md", rightSection: _jsx(ActionIcon, Object.assign({ size: 32, radius: "xl", color: theme.primaryColor, variant: "filled" }, { children: theme.dir === 'ltr' ? _jsx(ArrowRight, { size: 18 }) : _jsx(ArrowLeft, { size: 18 }) })), placeholder: "Search terms", rightSectionWidth: 42 })] })), _jsx(FeaturesGrid, {}), _jsx(LoadingOverlay, { visible: !typesData.length })] }));
}
