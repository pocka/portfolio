/**
 * Get point lays on circle.
 *
 * @param {number} radius
 * @param {number} degrees
 */
export const getPosition = (radius = 0, degrees = 0) => [
  radius * Math.cos(getRadians(degrees)),
  radius * Math.sin(getRadians(degrees))
]

/**
 * Get radians from degrees.
 *
 * @param {number} degrees
 */
export const getRadians = (degrees = 0) => degrees * (Math.PI / 180)
