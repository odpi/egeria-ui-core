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
import { ActionIcon, Container, Group, Header, TextInput, createStyles, useMantineTheme, MultiSelect, LoadingOverlay, Paper, Title, Text } from '@mantine/core';
import { Search, ArrowRight, ArrowLeft, BrandGithub, BrandSlack, Logout, Login } from 'tabler-icons-react';
import { FeaturesGrid } from '../Features';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { currentJwt, logout, goHome, fetchTypes } from '@lfai/egeria-js-commons';
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
    innerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
    },
    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,
        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },
    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,
        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },
    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },
    image: {
        flex: 1,
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },
    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    }
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
const emptyTypesData = [];
export function EgeriaHome(props) {
    const { links, apiUrl } = props;
    const navigate = useNavigate();
    const [q, setQ] = useState('');
    const [types, setTypes] = useState([]);
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const isLoggedIn = currentJwt();
    const [typesData, setTypesData] = useState({
        isLoading: true,
        typesData: [...emptyTypesData]
    });
    useEffect(() => {
        setTypesData(Object.assign(Object.assign({}, typesData), { isLoading: true }));
        const bringTypes = () => __awaiter(this, void 0, void 0, function* () {
            const rawTypesData = yield fetchTypes(apiUrl);
            setTypesData({
                isLoading: false,
                typesData: [...rawTypesData]
            });
        });
        bringTypes();
    }, [apiUrl]);
    const items = links.map((link, index) => (_jsx(NavLink, Object.assign({ className: classes.link, to: link.link }, { children: link.label }), index)));
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(`/assets/catalog?q=${q}&types=${types.join(',')}`);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, Object.assign({ height: 56, mb: 15 }, { children: _jsxs(Container, Object.assign({ className: classes.inner }, { children: [_jsx(Group, Object.assign({ className: classes.links, spacing: 5 }, { children: items })), _jsx("img", { src: "/egeria-logo.svg", alt: "Egeria", title: "Egeria", style: { height: 40 } }), _jsxs(Group, Object.assign({ spacing: 0, className: classes.social, position: "right", noWrap: true }, { children: [_jsx(ActionIcon, Object.assign({ size: "lg", title: "Github", onClick: () => { window.open('https://github.com/odpi', '_blank'); } }, { children: _jsx(BrandGithub, { size: 18 }) })), _jsx(ActionIcon, Object.assign({ size: "lg", title: "Slack", onClick: () => { window.open('https://lfaifoundation.slack.com', '_blank'); } }, { children: _jsx(BrandSlack, { size: 18 }) })), isLoggedIn && _jsx(ActionIcon, Object.assign({ size: "lg", title: 'Logout', onClick: () => { logout(goHome); } }, { children: _jsx(Logout, { size: 18 }) })), !isLoggedIn && _jsx(NavLink, Object.assign({ to: `/login` }, { children: _jsx(ActionIcon, Object.assign({ size: "lg", title: `Login` }, { children: _jsx(Login, { size: 18 }) })) }))] }))] })) })), _jsx(Container, { children: _jsxs("div", Object.assign({ className: classes.innerHeader }, { children: [_jsxs("div", Object.assign({ className: classes.content }, { children: [_jsx(Title, Object.assign({ className: classes.title }, { children: "Egeria Project" })), _jsx(Text, Object.assign({ color: "dimmed", mt: "md", style: { textAlign: 'justify' } }, { children: "Open source project dedicated to enabling teams to collaborate by making metadata open and automatically exchanged between tools and platforms, no matter which vendor they come from." }))] })), _jsx(Paper, Object.assign({ shadow: "md", style: { width: 560 }, className: classes.image }, { children: _jsx("iframe", { width: "560", height: "315", src: "https://www.youtube.com/embed/dgeOAJF6jq8?controls=0&start=1464", title: "YouTube video player", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }))] })) }), _jsxs(Container, Object.assign({ style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' } }, { children: [_jsx(MultiSelect, { data: typesData.typesData, value: types, onChange: (value) => setTypes([...value]), radius: "xl", size: "md", placeholder: "Type", style: { width: '30%' } }), _jsx(TextInput, { style: { width: '69%' }, icon: _jsx(Search, { size: 18 }), radius: "xl", size: "md", value: q, onKeyPress: handleKeyPress, onChange: (event) => setQ(event.currentTarget.value), rightSection: _jsx(ActionIcon, Object.assign({ size: 32, radius: "xl", color: theme.primaryColor, variant: "filled" }, { children: theme.dir === 'ltr' ? _jsx(ArrowRight, { size: 18 }) : _jsx(ArrowLeft, { size: 18 }) })), placeholder: "Search terms", rightSectionWidth: 42 })] })), _jsx(FeaturesGrid, {}), _jsx(LoadingOverlay, { visible: typesData.isLoading })] }));
}
