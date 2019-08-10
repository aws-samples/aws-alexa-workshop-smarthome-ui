/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDevice = `query GetDevice($thingName: String!) {
  getDevice(thingName: $thingName) {
    thingName
    username
    description
  }
}
`;
export const listDevices = `query ListDevices(
  $thingName: String
  $filter: ModelDeviceFilterInput
  $limit: Int
  $nextToken: String
) {
  listDevices(
    thingName: $thingName
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      thingName
      username
      description
    }
    nextToken
  }
}
`;
