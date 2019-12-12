'use strict'

/**
 * DynamoDB Toolbox: A simple set of tools for working with Amazon DynamoDB
 * @author Jeremy Daly <jeremy@jeremydaly.com>
 * @license MIT
 */

const validateType = require('./validateType')
const { error } = require('./utils')

// Get partitionKey/sortKey
module.exports = (data,schema,partitionKey,sortKey) => {
  let pk = data[partitionKey] ||
      error(`'${partitionKey}'${schema[partitionKey].alias ? ` or '${schema[partitionKey].alias}'` : ''} is required`)

  let sk = sortKey === null || data[sortKey] ||
      error(`'${sortKey}'${schema[sortKey].alias ? ` or '${schema[sortKey].alias}'` : ''} is required`)

  return Object.assign(
    { [partitionKey]: validateType(schema[partitionKey],partitionKey,pk,data) },
    sortKey !== null ? { [sortKey]: validateType(schema[sortKey],sortKey,sk,data) } : {}
  ) // end assign
} // end get keys