import { useEffect, useState } from 'react';
import { DESKTOP_DOWNLOADS, DesktopPlatform } from '../consts/downloads';

interface NavigatorUAData {
  getHighEntropyValues: (hints: string[]) => Promise<{ architecture?: string }>;
}

const isIntelMac = async () => {
  const uaData = (navigator as Navigator & { userAgentData?: NavigatorUAData }).userAgentData;
  if (!uaData) return false;
  try {
    const { architecture } = await uaData.getHighEntropyValues(['architecture']);
    return architecture === 'x86';
  } catch {
    return false;
  }
};

const detectPlatform = async (): Promise<DesktopPlatform | null> => {
  const { userAgent, maxTouchPoints } = navigator;
  if (/Windows NT/i.test(userAgent)) return 'windows';
  if (/Macintosh/i.test(userAgent) && maxTouchPoints <= 1 && !(await isIntelMac())) return 'macos';
  return null;
};

const useDesktopDownload = () => {
  const [platform, setPlatform] = useState<DesktopPlatform | null>(null);

  useEffect(() => {
    if (import.meta.env.PUBLIC_DESKTOP_APP) return;
    let isActive = true;
    detectPlatform().then(detected => isActive && setPlatform(detected));
    return () => {
      isActive = false;
    };
  }, []);

  return platform ? DESKTOP_DOWNLOADS[platform] : null;
};

export default useDesktopDownload;
