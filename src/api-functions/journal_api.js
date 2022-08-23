import axios from 'axios';
import { HOST } from './api-host';

class JournalApi {
  async getJournals(monthYear) {
    try {
      const address = HOST + `/journal/${monthYear.year}/${monthYear.month}`;
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
      const { data } = await axios.get(address);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async postEntry(selectedEntry) {
    try {
      const address = HOST + `/journal/post`;
      const { data } = await axios.post(address, { selectedEntry });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export const journalApi = new JournalApi();
