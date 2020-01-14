export default function getStories() {
  return gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: '1PTVvFYGTUTCT1K7yTm5HR8hKcZmZVTAk2EjCBTdnHQ4',
      range: 'A1:AA200'
    })
    .then(function(response) {
      // Handle the results here (response.result has the parsed body).
      const rows = response.result.values
      const [header, ...stories] = rows
      return stories.map(row => ({
        title: row[21] || 'Saga utan namn',
        pages: row.slice(1, 21).filter(i => i)
      }))
    })
    .catch(function(err) {
      console.error('Execute error', err)
    })
}
