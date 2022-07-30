import '@testing-library/jest-dom';

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...props: Array<any>) => {
    // const matchedPath = /(.)*(\'(.*)\')(.)*/.exec(props[0].toString());
    // if (matchedPath) {
    //   return require(matchedPath[3]);
    // } else return () => <></>;
    return () => <></>;
  },
}));

jest.mock('next-auth/react');
