import axios from 'axios';

class JournalApi {
  async getJournals(monthYear) {
    try {
      const entries = await axios.get(
        `/journal/${monthYear.year}/${monthYear.month}`
      );
      return entries;
    } catch (err) {
      console.log(err);
    }
  }
}

export const journalApi = new JournalApi();
