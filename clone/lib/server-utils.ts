import { RoomServiceClient } from 'livekit-server-sdk';

export function getRoomClient(): RoomServiceClient {
  checkKeys();
  return new RoomServiceClient(getLiveKitURL());
}

export function getLiveKitURL(region?: string | string[]): string {
  let targetKey = 'LK_URL';
  if (region && !Array.isArray(region)) {
    targetKey = `LK_URL_${region}`.toUpperCase();
  }
  const url = process.env[targetKey];
  if (!url) {
    throw new Error(`${targetKey} is not defined`);
  }
  return url;
}

export function checkKeys() {
  if (typeof process.env.LK_API_KEY === 'undefined') {
    throw new Error('LK_API_KEY is not defined');
  }
  if (typeof process.env.LK_SECRET === 'undefined') {
    throw new Error('LK_SECRET is not defined');
  }
}
