const RELEASES_URL = 'https://github.com/Mirislamus/pomodoro/releases/latest/download';

export type DesktopPlatform = 'windows' | 'macos';

export const DESKTOP_DOWNLOADS: Record<DesktopPlatform, { name: string; url: string }> = {
  windows: { name: 'Windows', url: `${RELEASES_URL}/Pomotomo-windows-x64-setup.exe` },
  macos: { name: 'macOS', url: `${RELEASES_URL}/Pomotomo-macos-universal.dmg` },
};
