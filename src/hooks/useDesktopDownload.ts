import { useEffect, useState } from 'react';
import { DESKTOP_DOWNLOADS, DesktopPlatform } from '../consts/downloads';

const detectPlatform = (): DesktopPlatform | null => {
  const { userAgent, maxTouchPoints } = navigator;
  if (/Windows NT/i.test(userAgent)) return 'windows';
  if (/Macintosh/i.test(userAgent) && maxTouchPoints <= 1) return 'macos';
  return null;
};

const useDesktopDownload = () => {
  const [platform, setPlatform] = useState<DesktopPlatform | null>(null);

  useEffect(() => {
    if (import.meta.env.PUBLIC_DESKTOP_APP) return;
    setPlatform(detectPlatform());
  }, []);

  return platform ? DESKTOP_DOWNLOADS[platform] : null;
};

export default useDesktopDownload;
