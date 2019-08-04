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
  $id: ID
  $filter: ModelDeviceFilterInput
  $limit: Int
  $nextToken: String
) {
  listDevices(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken) {
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
