export default function loadClient() {
  gapi.client.setApiKey('AIzaSyAIrd3vAHY26l1qoXEFlwejn6gLYSV1H7s')
  return gapi.client.load(
    'https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest'
  )
}
