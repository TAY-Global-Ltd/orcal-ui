/**
 * @typedef {Object} GraphObject
 * @property {string} id
 * @property {string} name
 * @property {string} path
 * @property {string} root
 */

/**
 * @typedef {Object} GraphFunction
 * @property {string} id
 * @property {string} objectId
 * @property {string} name
 * @property {string} objectPath
 * @property {string} root
 */

/**
 * @typedef {Object} GraphCall
 * @property {string} source
 * @property {string} target
 */

/**
 * @typedef {Object} GraphData
 * @property {string} [root]
 * @property {GraphObject[]} objects
 * @property {GraphFunction[]} functions
 * @property {GraphCall[]} calls
 */

/**
 * @typedef {Object} SpecialLabelConfig
 * @property {string} label
 * @property {number} [opacity]
 */

/**
 * @typedef {Object} GraphVisualizerProps
 * @property {GraphData} data
 * @property {Record<string, string>} pathColors
 * @property {Function} [onRefresh]
 * @property {Record<string, SpecialLabelConfig>} [specialLabels]
 */

/**
 * @typedef {Object} SimulationNode
 * @property {string} id
 * @property {string} name
 * @property {string} path
 * @property {string} root
 * @property {'function'|'object_anchor'} type
 * @property {number} r
 * @property {string} [objectId]
 * @property {string} [objectPath]
 * @property {boolean} [isRoot]
 * @property {number} [x]
 * @property {number} [y]
 * @property {number} [vx]
 * @property {number} [vy]
 * @property {number|null} [fx]
 * @property {number|null} [fy]
 */

/**
 * @typedef {Object} SimulationLink
 * @property {string|SimulationNode} source
 * @property {string|SimulationNode} target
 * @property {'call'|'structure'} type
 * @property {number} [count]
 */

/**
 * @typedef {Object} GroupData
 * @property {string} id
 * @property {string} root
 * @property {string} path
 * @property {string} name
 * @property {SimulationNode[]} leaves
 */

/**
 * @typedef {Object} ClickedObjectData
 * @property {string} id
 * @property {string} name
 * @property {string} path
 * @property {string} root
 * @property {SimulationNode[]} functions
 */

/**
 * @typedef {Object} SearchResult
 * @property {'object'|'function'} type
 * @property {GraphObject|GraphFunction} item
 * @property {string} matchField
 * @property {number} score
 */
