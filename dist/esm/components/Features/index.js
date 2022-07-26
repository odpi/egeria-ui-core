import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeIcon, Text, Container, SimpleGrid, useMantineTheme } from '@mantine/core';
import { MOCKDATA } from './mockdata';
export function Feature({ icon: Icon, title, description }) {
    const theme = useMantineTheme();
    return (_jsxs("div", { children: [_jsx(ThemeIcon, Object.assign({ variant: "light", size: 40, radius: 40 }, { children: _jsx(Icon, { style: { width: 20, height: 20 } }) })), _jsx(Text, Object.assign({ style: { marginTop: theme.spacing.sm, marginBottom: 7 } }, { children: title })), _jsx(Text, Object.assign({ size: "sm", color: "dimmed", style: { lineHeight: 1.6 } }, { children: description }))] }));
}
export function FeaturesGrid({ data = MOCKDATA }) {
    const theme = useMantineTheme();
    const features = data.map((feature, index) => _createElement(Feature, Object.assign({}, feature, { key: index })));
    return (_jsx(Container, { children: _jsx(SimpleGrid, Object.assign({ mt: 60, cols: 3, spacing: theme.spacing.xl * 2, breakpoints: [
                { maxWidth: 980, cols: 2, spacing: 'xl' },
                { maxWidth: 755, cols: 1, spacing: 'xl' },
            ] }, { children: features })) }));
}
