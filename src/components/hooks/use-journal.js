import { useContext } from 'react';
import { JournalContext } from '../context/journal-context';

export const useJournal = () => useContext(JournalContext);
