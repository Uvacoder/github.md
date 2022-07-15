import { createContext } from 'react';
const FoldersContext = createContext<{ folders: { path: string }[] }>({
  folders: [],
});
export default FoldersContext;
