import React, { createRef } from 'react';
import { TPosition } from './types';
import CalcPosition, { ContainerPostionStyles } from './utils/CalcPosition';
import PopoverlyPortal from './PopoverlyPortal';

export interface IPopoverProps {
    isPopoverOpen?: boolean;
    position: TPosition | TPosition[];
    content: JSX.Element;
    children: JSX.Element;
}

interface IPopoverState {
    isPopoverOpen: boolean;
    hasMounted: boolean;
}

class Popoverly extends React.Component<IPopoverProps, IPopoverState> {
    state: IPopoverState;
    private popoverElement: HTMLDivElement;
    private readonly childRef: React.RefObject<HTMLElement>;
    private readonly arrowRef: React.RefObject<HTMLDivElement>;
    constructor(props: IPopoverProps) {
        super(props);
        this.state = { isPopoverOpen: props.isPopoverOpen || false, hasMounted: false };
        this.childRef = createRef<HTMLElement>();
        this.arrowRef = createRef<HTMLDivElement>();
    }

    componentDidMount() {
        this.setState({ hasMounted: true });
    }

    componentDidUpdate(prevProps: Readonly<IPopoverProps>, prevState: Readonly<IPopoverState>): void {
        const { isPopoverOpen } = this.state;

        if (prevState.isPopoverOpen !== isPopoverOpen) {
            this.updatePopover();
        }
    }

    updatePopover = (): void => {
        const { isPopoverOpen } = this.state;
        if (isPopoverOpen) {
            this.setPosition();
        }
    };

    setContainer = (): void => {
        this.popoverElement = window.document.createElement('div');
        this.popoverElement.classList.add('Popoverly');
    };

    setArrow = (positionStyles: ContainerPostionStyles & { direction?: string }): void => {
        this.arrowRef.current.classList.add(positionStyles.direction);
        this.arrowRef.current.style.left = positionStyles?.left;
        this.arrowRef.current.style.right = positionStyles?.right;
        this.arrowRef.current.style.bottom = positionStyles?.bottom;
        this.arrowRef.current.style.top = positionStyles?.top;
    };

    setPosition = (): void => {
        const { position } = this.props;
        const prio = position as TPosition;

        const positionStyles = CalcPosition(prio, this.childRef.current, this.popoverElement);
        this.popoverElement.style.left = positionStyles?.container.left;
        this.popoverElement.style.right = positionStyles?.container.right;
        this.popoverElement.style.bottom = positionStyles?.container.bottom;
        this.popoverElement.style.top = positionStyles?.container.top;
        this.popoverElement.style.visibility = 'visible';

        this.setArrow(positionStyles.arrow);

        console.log(positionStyles);
    };

    renderPopoverlyContainer = (): JSX.Element => {
        const { content } = this.props;
        const { isPopoverOpen } = this.state;

        this.setContainer();

        if (isPopoverOpen) {
            return (
                <PopoverlyPortal container={window.document.body} element={this.popoverElement}>
                    <>
                        <div className="Popoverly__arrow" ref={this.arrowRef} />
                        {content}
                    </>
                </PopoverlyPortal>
            );
        }

        return null;
    };

    renderChildContent = (): JSX.Element => {
        const { children } = this.props;
        return (
            <div role="button" onClick={this.toggleOpenState}>
                {React.cloneElement(children as JSX.Element, {
                    ref: this.childRef,
                })}
            </div>
        );
    };

    toggleOpenState = (): void => {
        const { isPopoverOpen } = this.state;
        console.log('toggle' + isPopoverOpen);
        this.setState({ isPopoverOpen: !isPopoverOpen });
    };

    render(): JSX.Element {
        const { hasMounted } = this.state;
        return (
            <>
                {hasMounted && this.renderPopoverlyContainer()}
                {this.renderChildContent()}
            </>
        );
    }
}

export default Popoverly;
