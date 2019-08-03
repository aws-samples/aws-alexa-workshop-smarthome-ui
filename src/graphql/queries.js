/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDevice = `query GetDevice($id: ID!) {
  getDevice(id: $id) {
    id
    name
    description
    userId
  }
}
`;
export const listDevices = `query ListDevices(
  $filter: ModelDeviceFilterInput
  $limit: Int
  $nextToken: String
) {
  listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      userId
    }
    nextToken
  }
}
`;
