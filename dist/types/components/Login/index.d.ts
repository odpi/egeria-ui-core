import React from 'react';
interface Props {
    loginCallback: Function;
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
    handleKeyPress: (e: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
