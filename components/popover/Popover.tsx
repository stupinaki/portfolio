import React, { HTMLProps, isValidElement, ReactElement, ReactNode } from 'react';

import {
  useMergeRefs,
  Placement,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';

import { usePopoverContext, PopoverContext } from '@components/popover/PopoverContext';
import { usePopover } from '@components/popover/usePopover';

import styles from './popover.module.scss';

export interface PopoverOptions {
  placement?: Placement;
  open?: boolean;
  isMathWidth?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type PopoverTriggerProps = HTMLProps<HTMLElement> & {
  children: ReactNode;
};

type PopoverContentProps = HTMLProps<HTMLDivElement>;

type PopoverProps = PopoverOptions & {
  children: ReactNode;
};

export const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  function PopoverTrigger({ children, ...props }, propRef) {
    const context = usePopoverContext();

    if (!isValidElement(children)) {
      throw new Error('PopoverTrigger expects a React element as a child');
    }
    const childrenRef = (children as ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    return (
      <button
        ref={ref}
        type="button"
        className={styles.trigger}
        data-state={context.open ? 'open' : 'closed'}
        {...context.getReferenceProps(props)}>
        {children}
      </button>
    );
  },
);

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent({ style, ...props }, propRef) {
    const { context: floatingContext, ...context } = usePopoverContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!floatingContext.open) return null;

    return (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext}>
          <div
            ref={ref}
            style={{ ...context.floatingStyles, ...style }}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}>
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);

export function Popover({ children, ...restOptions }: PopoverProps) {
  const popover = usePopover(restOptions);
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>;
}
