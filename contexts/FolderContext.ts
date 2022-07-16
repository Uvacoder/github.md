import { createContext } from 'react';
const FoldersContext = createContext<{
  folders: { path: string; active: boolean }[];
}>({
  folders: [],
});
export default FoldersContext;
