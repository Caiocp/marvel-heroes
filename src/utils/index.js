import md5 from 'md5';

export const getMd5Hash = () => {
  const ts = Date.now().toString();
  const hash = md5(
    `${ts}${process.env.REACT_APP_SECRET_KEY}${process.env.REACT_APP_PUBLIC_KEY}`
  );

  return { hash, ts };
};
