import { useEffect, useState } from 'react';

const useControlledValue = <T>(
  valueExternal?: T,
  onChangeExternal?: (value: T) => void,
) => {
  const [innerValue, setInnerValue] = useState<T | undefined>();

  useEffect(() => {
    setInnerValue(valueExternal);
  }, [valueExternal]);

  const isExternalPresent = valueExternal !== undefined && onChangeExternal !== undefined;

  return {
    valueData: isExternalPresent ? valueExternal : innerValue,
    onChangeFn: isExternalPresent ? onChangeExternal : (value: T) => setInnerValue(value),
  };
};

export default useControlledValue;
