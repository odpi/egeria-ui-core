/// <reference types="react" />
export declare const links: {
    link: string;
    label: string;
}[];
interface HeaderMiddleProps {
    links: {
        link: string;
        label: string;
    }[];
    apiUrl?: string;
}
export declare function EgeriaHome(props: HeaderMiddleProps): JSX.Element;
export {};
