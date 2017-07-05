// ax

/**
 * new Reg({
 *  keys: ['idGood', 'idUser'],
 *  opts: ['idDoc'],
 *  args : ['sum:2', 'qtty:3']
 *  period : 3600 * 1000
 * })
 *
 */
class Reg {
  constructor (params) {
    // this.params = params
    this.keys = params.keys || []
    this.opts = params.opts || []
    this.args = params.args || []
    this.period = params.period || 24 * 3600 * 1000
  }

  /**
   * reg.put({
   *  idGood: 1,
   *  idUser: 2,
   *  dt: 1499258727561,
   *  sum: 100,
   *  qtty: 1
   * })
   * @param {*} data
   */
  put (data) {
    data.dt = data.dt || Date.now()
  }

  /**
   * var balanse = reg.balanse({
   *  idGood: 1
   * }, Date.now())
   * 
   * @param {*} dt 
   * @param {*} keys 
   */
  balanse (keys, dt = Date.now()) {

  }

  /**
   * 
   * @param {*} dt 
   * @param {*} keys 
   */
  rev (keys, from = Date.now(), to = Date.now()) {

  }
}

export default Reg

