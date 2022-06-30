import React from 'react';
interface Props {
}
interface State {
    errors: Array<string>;
    isLoading: Boolean;
    username: string;
    password: string;
}
export declare class EgeriaLogin extends React.Component<Props, State> {
    constructor(props: Props);
    handleSubmit: () => void;
    render(): JSX.Element;
}
export {};
