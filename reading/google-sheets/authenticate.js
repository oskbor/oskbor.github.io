export default function authenticate() {
  return Promise.resolve(
    gapi.auth2
      .getAuthInstance()
      .signIn({
        scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
      })
  )
}
