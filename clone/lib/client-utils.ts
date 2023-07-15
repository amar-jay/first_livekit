import { UseTokenOptions } from '@livekit/components-react';
import React from 'react';
import { useEffect, useState } from 'react';

export function useServerUrl(region?: string) {
  const [serverUrl, setServerUrl] = useState<string | undefined>();
  useEffect(() => {
    let endpoint = `/api/url`;
    if (region) {
      endpoint += `?region=${region}`;
    }
    fetch(endpoint).then(async (res) => {
      if (res.ok) {
        const body = await res.json();
        setServerUrl(body.url);
      } else {
        throw Error('Error fetching server url, check server logs');
      }
    });
  });
  return serverUrl;
}

export function useToken(
  tokenEndpoint: string | undefined,
  roomName: string,
  options: UseTokenOptions = {},
) {
  const [token, setToken] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (tokenEndpoint === undefined) {
      throw Error('token endpoint needs to be defined');
    }
    if (options.userInfo?.identity === undefined) {
      return;
    }
    const tokenFetcher = async () => {
      console.log('fetching token');
      const params = new URLSearchParams({ ...options.userInfo, roomName });
      const res = await fetch(`${tokenEndpoint}?${params.toString()}`);
      const { accessToken } = await res.json();
      setToken(accessToken);
    };
    tokenFetcher();
  }, [tokenEndpoint, roomName, options]);
  return token;
}