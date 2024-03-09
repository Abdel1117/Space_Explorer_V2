/**
 * Rendering the text and replacing what is not displayable with (...) 
 * @author Abderahmane Adjali
 * @date 2024-11-17
 * @param {String} string
 * @param {Number} n
 * @returns {None}
 */
export function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
}