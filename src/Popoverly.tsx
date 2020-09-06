import React from 'react';

export interface IPopoverProps {
    isPopoverOpen?: boolean;
}

interface IPopoverState {
    isPopoverOpen: boolean;
}

class Popoverly extends React.Component<IPopoverProps, IPopoverState> {
    constructor(props: IPopoverProps) {
        super(props);
        this.state = { isPopoverOpen: props.isPopoverOpen || false };
    }

    render(): JSX.Element {
        return <div />;
    }
}

export default Popoverly;
