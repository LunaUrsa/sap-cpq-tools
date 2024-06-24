import { useEffect } from 'react';

export const useFreshUserOptions = (setUserOptions: React.Dispatch<React.SetStateAction<UserOptions>>) => {
  useEffect(() => {
    chrome.storage.local.get('userOptions', result => {
      if (result.userOptions) {
        const storedUserOptions = JSON.parse(result.userOptions);
        setUserOptions(storedUserOptions);
      }
    });
  }, [setUserOptions]);
};
