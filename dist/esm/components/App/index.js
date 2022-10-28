import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { AppShell, useMantineTheme } from '@mantine/core';
import { EgeriaHeader } from '../Header';
import { EgeriaNavbar } from '../NavbarMinimal';
export function EgeriaApp(props) {
    const theme = useMantineTheme();
    const { menu, apiUrl } = props;
    return _jsx(_Fragment, { children: _jsx(AppShell, Object.assign({ styles: {
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
                }
            }, navbarOffsetBreakpoint: "sm", asideOffsetBreakpoint: "sm", fixed: true, navbar: _jsx(EgeriaNavbar, { menu: menu ? menu : [] }), header: _jsx(EgeriaHeader, { apiUrl: apiUrl }) }, { children: _jsx("div", Object.assign({ style: { width: '100%', height: '100%' } }, { children: props.main })) })) });
}
