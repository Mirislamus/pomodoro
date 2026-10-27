import { useEffect, useRef } from 'react';

/** Ref that always points at the latest value, for use inside long-lived listeners. */
const useLatest = <T>(value: T) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref;
};

export default useLatest;
