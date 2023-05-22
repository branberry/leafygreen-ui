import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

import { useEventListener } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';
import Popover from '@leafygreen-ui/popover';

interface DropdownItemId {
  id: string;
}
interface DropdownItem {}
type DropdownItemWithId = DropdownItemId & DropdownItem;

// REDUCER
export enum DropdownReducerActionType {
  Push = 'push',
  Pop = 'pop',
  Update = 'update',
}

export type DropdownReducerAction =
  | {
      type: DropdownReducerActionType.Push;
      payload: DropdownItemWithId;
    }
  | {
      type: DropdownReducerActionType.Pop;
      payload: ToastId;
    }
  | {
      type: DropdownReducerActionType.Update;
      payload: {
        id: ToastId;
        props: Partial<ToastProps>;
      };
    }
  | {
      type: DropdownReducerActionType.Clear;
    };

export const generateDropdownId = map => {
  let id;

  do {
    id = 'dropdown-' + (Math.random() * 10_000).toFixed(0).padStart(4, '0');
  } while (map?.has(id));

  return id;
};

export function makeItem(props) {
  const id = generateDropdownId();

  return {
    id,
    ...props,
  };
}

const dropdownReducer = (state, action) => {
  switch (action.type) {
    case DropdownReducerActionType.Push: {
      const { items } = state;
      const { id, ...item } = action.payload;

      return {
        items: items.set(id, { ...item }),
      };
    }

    case DropdownReducerActionType.Pop: {
      const { items } = state;
      const id = action.payload;
      const poppedItem = items.get(id);

      if (poppedItem) {
        items.delete(id);
      }

      return { items };
    }

    case DropdownReducerActionType.Update: {
      const { items } = state;
      const { id, props } = action.payload;
      const updatedToast = items.get(id);

      if (updatedToast) {
        items.set(id, { ...updatedToast, ...props });
      }

      return { items };
    }
  }
};

export const useDropdownReducer = initialValue => {
  const [{ items }, dispatch] = useReducer(dropdownReducer, {
    items: initialValue ?? new Map(),
  });

  const pushItem = useCallback(props => {
    const item = makeItem(props);

    dispatch({
      type: DropdownReducerActionType.Push,
      payload: item,
    });

    return item.id;
  }, []);

  const getItem = useCallback(id => items.get(id), [items]);

  const popItem = useCallback(
    id => {
      const itemProps = getItem(id);

      dispatch({
        type: DropdownReducerActionType.Pop,
        payload: id,
      });

      return itemProps;
    },
    [getItem],
  );

  const updateItem = useCallback(
    (id, props) => {
      dispatch({
        type: DropdownReducerActionType.Update,
        payload: {
          id,
          props,
        },
      });
      return getItem(id);
    },
    [getItem],
  );

  return useMemo(() => {
    return {
      pushItem,
      popItem,
      updateItem,
      getItem,
      items,
    };
  }, [pushItem, popItem, updateItem, getItem, items]);
};

// CONTEXT
const initialValue = {
  items: [],
};

const DropdownContext = createContext(initialValue);
const useDropdownContext = () => useContext(DropdownContext);

// COMPONENTS
export function DropdownProvider({ children }: { children: React.ReactNode }) {
  const initialValue = useDropdownReducer();
  const memoizedValue = useMemo(() => initialValue, [initialValue]);

  return (
    <DropdownContext.Provider value={memoizedValue}>
      {children}
    </DropdownContext.Provider>
  );
}

export function DropdownItem({
  disabled,
  children,
  ...props
}: {
  disabled?: boolean;
  children?: React.ReactElmeent;
}) {
  const ref = useRef(null);
  const [itemId, setItemId] = useState(null);
  const { pushItem, popItem } = useDropdownContext();

  useEffect(() => {
    if (!itemId) {
      const _id = pushItem({ disabled, ref, ...props });
      setItemId(_id);
    }
  }, [itemId, disabled, props, pushItem, ref]);

  useEffect(() => {
    return () => {
      if (itemId) {
        popItem(itemId);
        setItemId(null);
      }
    };
  }, [popItem, itemId, setItemId]);

  return <button ref={ref}>{children}</button>;
}

export function Dropdown({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if (!open) {
      setOpen(open);
    }
  }, [open, setOpen]);

  const triggerRef = useRef(null);

  const [focused, setFocused] = useState(null);
  const { items } = useDropdownContext();

  const setFocus = (el: HTMLElement | null) => {
    if (el == null) {
      return;
    }

    setFocused(el);
    el.focus();
  };

  const refs = Array.from(items)
    .filter(item => !item.disabled)
    .map(([_key, props]) => props?.ref?.current);

  console.log(items, refs);

  const updateFocusedOption = useCallback(
    (direction: Direction) => {
      const optionsCount = refs.length;
      const lastIndex = optionsCount - 1 > 0 ? optionsCount - 1 : 0;
      const indexOfCurrent = refs.indexOf(focused);

      switch (direction) {
        case 'next': {
          const newFocusEl =
            indexOfCurrent + 1 < optionsCount
              ? refs[indexOfCurrent + 1]
              : refs[0];
          setFocus(newFocusEl);

          break;
        }

        case 'prev': {
          const newFocusEl =
            indexOfCurrent - 1 >= 0
              ? refs[indexOfCurrent - 1]
              : refs[lastIndex];
          setFocus(newFocusEl);

          break;
        }

        case 'first': {
          const newFocusEl = refs[0];
          setFocus(newFocusEl);

          break;
        }

        case 'last': {
          const newFocusEl = refs[lastIndex];
          setFocus(newFocusEl);

          break;
        }
      }
    },
    [refs, focused],
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case keyMap.ArrowDown:
        e.preventDefault(); // Prevents page scrolling
        updateFocusedOption('next');
        break;

      case keyMap.ArrowUp:
        e.preventDefault(); // Prevents page scrolling
        updateFocusedOption('prev');
        break;

      case keyMap.Tab:
        e.preventDefault(); // Prevent tabbing outside of portal and outside of the DOM when `usePortal={true}`
        handleClose();
        setFocus(triggerRef?.current); // Focus the trigger on close
        break;

      case keyMap.Escape:
        handleClose();
        setFocus(triggerRef?.current); // Focus the trigger on close
        break;

      case keyMap.Space:
      case keyMap.Enter:
        if (!open) {
          setFocus(refs[0]);
        }
        break;
    }
  };

  useEventListener('keydown', handleKeyDown, { enabled: open });

  return (
    <>
      {/* Trigger */}
      <button ref={triggerRef} onClick={() => setOpen(curr => !curr)}>
        demo trigger
        {/* Menu */}
        <Popover active={open} usePortal={true}>
          <ul>{children}</ul>
        </Popover>
      </button>
    </>
  );
}

Dropdown.displayName = 'Dropdown';
