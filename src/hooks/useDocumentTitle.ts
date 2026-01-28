import { useEffect } from 'react';

const BASE_TITLE = 'Stromberg Zitate';

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;

    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
};
