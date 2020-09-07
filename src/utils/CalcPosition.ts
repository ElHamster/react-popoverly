import { TPosition } from '../types';

interface Bounding {
    left: number;
    right: number;
    top: number;
    bottom: number;
    height: number;
    heightHalf: number;
    width: number;
    widthHalf: number;
    rect: DOMRect;
}

export interface ContainerPostionStyles {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
}

interface PositionStyles {
    container: ContainerPostionStyles;
    arrow: ContainerPostionStyles & { direction?: string };
}

const CalcPosition = (
    prio: TPosition,
    targetElement: HTMLElement | null,
    popoverElement: HTMLElement,
): PositionStyles => {
    if (!targetElement || !popoverElement) return null;

    const browserWidth = document.documentElement.clientWidth;
    const rect = targetElement.getBoundingClientRect();
    const elementOffset = {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft,
    };
    const bounding: Bounding = {
        left: elementOffset.left,
        right: browserWidth - (elementOffset.left + rect.width),
        top: elementOffset.top,
        bottom: document.body.scrollHeight - (elementOffset.top + rect.height),
        height: rect.height,
        heightHalf: rect.height / 2,
        width: rect.width,
        widthHalf: rect.width / 2,
        rect: rect,
    };

    const popoverElementRect = popoverElement.getBoundingClientRect();

    console.log(popoverElementRect.height);
    console.log(popoverElementRect.height);

    let force = false;

    do {
        switch (prio) {
            case 'bottom':
                if (bounding.bottom > popoverElementRect.height) {
                    return setBottom(bounding, popoverElementRect);
                } else {
                    prio = 'top';
                    force = true;
                }
                break;
            case 'right':
                if (bounding.right > popoverElementRect.width && bounding.rect.top > popoverElementRect.height / 2) {
                    return setRight(bounding, popoverElementRect);
                } else {
                    prio = 'left';
                }
                break;
            case 'left':
                if (bounding.left > popoverElementRect.width && bounding.rect.top > popoverElementRect.height / 2) {
                    return setLeft(bounding, popoverElementRect);
                } else {
                    prio = 'bottom';
                }
                break;
            case 'top':
            default:
                if (bounding.rect.top > popoverElementRect.height || force) {
                    return setTop(bounding, popoverElementRect);
                } else {
                    prio = 'bottom';
                }
                break;
        }
        // eslint-disable-next-line no-constant-condition
    } while (true);
};

const style: PositionStyles = {
    container: {},
    arrow: {},
};

const setTop = function (bounding: Bounding, popoverElementRect: DOMRect): PositionStyles {
    const browserWidth = document.documentElement.clientWidth;
    const rightPlace = bounding.left + bounding.widthHalf + popoverElementRect.width / 2;
    style.arrow.direction = 'top';

    if (bounding.left + bounding.widthHalf - popoverElementRect.width / 2 > 0 && rightPlace < browserWidth) {
        style.container.left = bounding.left + bounding.widthHalf - popoverElementRect.width / 2 + 'px';
    } else if (rightPlace > browserWidth) {
        style.container.right = browserWidth - (bounding.left + bounding.width) + 10 + 'px';
        style.arrow.right = bounding.widthHalf + 10 + 'px';
    } else {
        style.container.left = bounding.left + 'px';
        style.arrow.left = bounding.widthHalf + 'px';
    }
    style.container.top = bounding.top - popoverElementRect.height - 12 + 'px';

    return style;
};

const setBottom = function (bounding: Bounding, popoverElementRect: DOMRect): PositionStyles {
    const browserWidth = document.documentElement.clientWidth;
    const rightPlace = bounding.left + bounding.widthHalf + popoverElementRect.width / 2;
    style.arrow.direction = 'bottom';

    if (bounding.left + bounding.widthHalf - popoverElementRect.width / 2 > 0 && rightPlace < browserWidth) {
        style.container.left = bounding.left + bounding.widthHalf - popoverElementRect.width / 2 + 'px';
    } else if (rightPlace > browserWidth) {
        style.container.right = browserWidth - (bounding.left + bounding.width) + 10 + 'px';
        style.arrow.right = bounding.widthHalf + 10 + 'px';
    } else {
        style.container.left = bounding.left + 'px';
        style.arrow.left = bounding.widthHalf + 'px';
    }
    style.container.top = bounding.top + bounding.height + 20 + 'px';
    return style;
};

const setLeft = function (bounding: Bounding, popoverElementRect: DOMRect): PositionStyles {
    style.arrow.direction = 'left';

    if (bounding.bottom - popoverElementRect.height / 2 > 0) {
        style.container.top = bounding.top - popoverElementRect.height / 2 + bounding.heightHalf + 'px';
    } else {
        style.container.top = bounding.top + 'px';
        style.arrow.top = bounding.heightHalf + 'px';
    }
    style.container.left = bounding.left - popoverElementRect.width - 20 + 'px';
    return style;
};

const setRight = function (bounding: Bounding, popoverElementRect: DOMRect): PositionStyles {
    style.arrow.direction = 'right';

    if (bounding.top - popoverElementRect.height / 2 > 0) {
        style.container.top = bounding.top - popoverElementRect.height / 2 + bounding.heightHalf + 'px';
    } else {
        style.container.top = bounding.top + 'px';
        style.arrow.top = bounding.heightHalf + 'px';
    }
    style.container.left = bounding.left + bounding.width + 20 + 'px';
    return style;
};

export default CalcPosition;
