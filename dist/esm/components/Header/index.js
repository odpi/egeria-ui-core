import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, Center, Group, Header, createStyles } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { Search } from 'tabler-icons-react';
const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },
    inner: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    search: {
        width: 500,
        [theme.fn.smallerThan('sm')]: {
            width: 200,
        },
        [theme.fn.largerThan('md')]: {
            width: 800
        },
    },
}));
export function EgeriaHeader() {
    const { classes } = useStyles();
    return (_jsx(Header, Object.assign({ height: 60, p: "md", className: classes.header }, { children: _jsxs("div", Object.assign({ className: classes.inner }, { children: [_jsx(Group, { children: _jsx(NavLink, Object.assign({ to: '/', style: { height: 50 } }, { children: _jsx("img", { src: "/egeria-logo.svg", alt: "Egeria", title: "Egeria", style: { height: 50 } }) })) }), _jsx(Center, Object.assign({ style: { width: '100%' } }, { children: _jsx(Autocomplete, { placeholder: "Search", className: classes.search, icon: _jsx(Search, { size: 16 }), data: ['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js'] }) }))] })) })));
}
