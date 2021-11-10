import { useEffect, useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';

interface IUseCopy {
  tooltipDelay?: number;
}

const useCopy = (
  data: IUseCopy = {
    tooltipDelay: 1000,
  },
) => {
  const { tooltipDelay = 1000 } = data;
  const [visibleCopiedTooltip, setVisibleCopied] = useState(false);

  const copy = (value: string) => {
    copyToClipboard(value);
    setVisibleCopied(true);
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (visibleCopiedTooltip) {
      timerId = setTimeout(() => {
        setVisibleCopied(false);
      }, tooltipDelay);

      return () => {
        clearTimeout(timerId);
      };
    }

    return () => {};
  }, [visibleCopiedTooltip, tooltipDelay]);

  return { visibleCopiedTooltip, copy };
};

export default useCopy;
