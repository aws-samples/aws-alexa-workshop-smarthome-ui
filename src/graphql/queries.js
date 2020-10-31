/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDevice = /* GraphQL */ `
  query GetDevice($thingName: String!) {
    getDevice(thingName: $thingName) {
      thingName
      username
      description
      createdAt
      updatedAt
    }
  }
`;
export const listDevices = /* GraphQL */ `
  query ListDevices(
    $thingName: String
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDevices(
      thingName: $thingName
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        thingName
        username
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
