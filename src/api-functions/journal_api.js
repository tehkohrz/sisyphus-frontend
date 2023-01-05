import axios from 'axios';
import { HOST } from './api-host';

const MOCKDATA = true;
const MOCKENTRY = [
  {
    id: 1,
    user_id: 1,
    title: 'TEST JOURNAL',
    content: 'Test content for mock journal entry.',
    entry_date: new Date(),
  },
];

class JournalApi {
  async getJournals(monthYear) {
    try {
      const address = HOST + `/journal/${monthYear.year}/${monthYear.month}`;

      if (MOCKDATA) {
        const typeDate = [MOCKENTRY[0].entry_date];
        return typeDate;
      }
      const { data } = await axios.get(address);
      // Date data returns as a string need to convert to type Date
      const typeDate = data.map((entry) => {
        return new Date(entry.entry_date);
      });
      // Return sorted array
      typeDate.sort((a, b) => a - b);
      return typeDate;
    } catch (err) {
      console.log(err);
    }
  }

  async getEntry(year, month, day) {
    try {
      const address = HOST + `/journal/${year}/${month}/${day}`;
      if (MOCKDATA) {
        return MOCKENTRY[0];
      }

      const { data } = await axios.get(address);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async postEntry(selectedEntry) {
    try {
      const address = HOST + `/journal/post`;
      if (MOCKDATA) {
        return selectedEntry;
      }
      const { data } = await axios.post(address, { selectedEntry });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export const journalApi = new JournalApi();
