const { Flow } = require('../models/flow')
const { Art } = require('../models/art')

class ClassicService {

  /**
   * Function 查找最新的经典(电影|音乐|句子|书籍)
   * return Art Object 
   */
  static async latest() {
    const flow = await Flow.findOne({
      order: [
        ['index', 'DESC']
      ]
    })

    const art = await Art.getData(flow.art_id, flow.type)
    art.setDataValue('index', flow.index) // set flow.index to art object

    return art
  }
}

module.exports = {
  ClassicService
}