import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppShell, useMantineTheme } from '@mantine/core';
import { 
// NavLink,
Route, Routes } from 'react-router-dom';
import { EgeriaGlossary, EgeriaLineage } from 'egeria-ui-components';
import { EgeriaHeader } from '../Header';
import { EgeriaNavbar } from '../NavbarMinimal';
import { EgeriaAbout } from '../About';
import { RequireAuth } from '../RequireAuth';
export function EgeriaApp() {
    const theme = useMantineTheme();
    return _jsx(_Fragment, { children: _jsx(AppShell, Object.assign({ styles: {
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
                }
            }, navbarOffsetBreakpoint: "sm", asideOffsetBreakpoint: "sm", fixed: true, navbar: _jsx(EgeriaNavbar, {}), header: _jsx(EgeriaHeader, {}) }, { children: _jsx("div", Object.assign({ style: { width: '100%', height: '100%' } }, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/hi", element: _jsx(_Fragment, { children: "Hi" }) }), _jsx(Route, { path: "/about", element: _jsx(EgeriaAbout, {}) }), _jsx(Route, { path: "/glossary", element: _jsx(RequireAuth, { children: _jsx(EgeriaGlossary, {}) }) }), _jsx(Route, { path: "/lineage", element: _jsx(RequireAuth, { children: _jsx(EgeriaLineage, { lineage: 'ultimate-source' }) }) })] }) })) })) });
}
