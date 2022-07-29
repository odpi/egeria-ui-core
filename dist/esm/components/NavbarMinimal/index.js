import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, Tooltip, UnstyledButton, createStyles, Group } from '@mantine/core';
import { Logout, InfoCircle, UserCircle } from 'tabler-icons-react';
import { NavLink } from 'react-router-dom';
import { logout } from 'egeria-js-commons';
const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },
    active: {
        '&, &:hover': {
            backgroundColor: theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        },
    },
}));
function NavbarLink({ icon: Icon, customIcon, label, href, active = false, onClick }) {
    const { classes, cx } = useStyles();
    return (_jsx(Tooltip, Object.assign({ label: label, position: "right", withArrow: true, transitionDuration: 0 }, { children: _jsx(UnstyledButton, Object.assign({ onClick: onClick, className: cx(classes.link, { [classes.active]: active }) }, { children: _jsxs(NavLink, Object.assign({ style: { color: 'inherit' }, to: href || '#' }, { children: [customIcon && _jsx("img", { src: `data:image/svg+xml;utf8,${encodeURIComponent(customIcon)}`, alt: "" }), Icon && _jsx(Icon, {})] })) })) })));
}
export function EgeriaNavbar(props) {
    const { menu } = props;
    const links = menu.map((link, index) => (_createElement(NavbarLink, Object.assign({}, link, { href: link.href, key: link.label }))));
    const handleLogout = () => {
        logout();
    };
    return (_jsxs(Navbar, Object.assign({ p: "md", width: { base: 80, sm: 80, lg: 80 } }, { children: [_jsx(Navbar.Section, Object.assign({ grow: true }, { children: _jsx(Group, Object.assign({ direction: "column", align: "center" }, { children: links })) })), _jsxs(Navbar.Section, { children: [_jsx(Group, Object.assign({ direction: "column", align: "center" }, { children: _jsx(NavbarLink, { icon: UserCircle, label: "Profile", href: "/profile" }) })), _jsx(Group, Object.assign({ direction: "column", align: "center" }, { children: _jsx(NavbarLink, { icon: InfoCircle, label: "About", href: "/about" }) })), _jsx(Group, Object.assign({ direction: "column", align: "center" }, { children: _jsx(NavbarLink, { icon: Logout, label: "Logout", onClick: () => handleLogout() }) }))] })] })));
}
