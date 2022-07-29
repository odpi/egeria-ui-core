import React from "react";
interface Props {
    apiUrl: string;
}
interface State {
    data: {
        loaded: boolean;
        name: String;
        version: String;
        commitId: String;
        buildTime: String;
    };
}
/**
 *
 * React component used for displaying details about the application instance.
 *
 * @since      0.1.0
 * @access     public
 *
 */
declare class EgeriaAbout extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
}
export { EgeriaAbout };
