import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

interface IPopoverlyPortalProps {
    container: Element;
    element: HTMLDivElement;
    children: JSX.Element;
}

const PopoverlyPortal = (props: IPopoverlyPortalProps): JSX.Element => {
    const { element, container, children } = props;

    useLayoutEffect(() => {
        container.appendChild(element);
        return () => container.removeChild(element);
    }, [container]);

    return createPortal(children, element);
};

export default PopoverlyPortal;
