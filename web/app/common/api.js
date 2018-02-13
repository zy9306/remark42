import { siteId, url } from './settings';

import fetcher from './fetcher'

/* common */

export const getConfig = () => fetcher.get(`/config`);

export const find = ({ url }) => fetcher.get(`/find?url=${url}&sort=-score&format=tree`);

export const getComment = ({ id }) => fetcher.get(`/id/${id}?url=${url}`);

export const vote = ({ id, url, value }) => fetcher.put({
  url: `/vote/${id}?url=${url}&vote=${value}`,
  withCredentials: true,
});

export const send = ({ text, pid }) => fetcher.post({
  url: '/comment',
  body: {
    text,
    locator: {
      site: siteId,
      url
    },
    ...(pid ? { pid } : {}),
  },
  withCredentials: true,
});

export const getUser = () => fetcher.get({
  url: '/user',
  withCredentials: true
});

/* admin */
export const pin = ({ id, url }) => fetcher.put({
  url: `/admin/pin/${id}?url=${url}&pin=1`,
  withCredentials: true,
});

export const unpin = ({ id, url }) => fetcher.put({
  url: `/admin/pin/${id}?url=${url}&pin=0`,
  withCredentials: true,
});

export const remove = ({ id }) => fetcher.delete({
  url: `/admin/comment/${id}?url=${url}`,
  withCredentials: true,
});

export const blockUser = ({ id }) => fetcher.put({
  url: `/admin/user/${id}?block=1`,
  withCredentials: true,
});

export const unblockUser = ({ id }) => fetcher.put({
  url: `/admin/user/${id}?block=0`,
  withCredentials: true,
});

export default {
  getConfig,
  find,
  getComment,
  vote,
  send,
  getUser,

  pin,
  unpin,
  remove,
  blockUser,
  unblockUser,
};
