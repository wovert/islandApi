const { Flow } = require('../models/flow')
const { Art } = require('../models/art')
const { Favor } = require('../models/favor')

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

    const art = await ClassicService.getData(flow.art_id, flow.type)
    art.setDataValue('index', flow.index) // set flow.index to art object

    return art
  }

  static async next(index, uid) {
    const flow = await Flow.findOne({
      where: {
          index: index + 1
      }
    })
    if (!flow) {
      throw new global.exceptions.NotFound()
    }
    const art = await ClassicService.getData(flow.art_id, flow.type)
    const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeNext)
    // art.exclude = ['index','like_status']
    return art
  }

  static async previous(index, uid) { 
    const flow = await Flow.findOne({
      where: {
        index: index - 1
      }
    })
    if (!flow) {
      throw new global.exceptions.NotFound()
    }
    const art = await ClassicService.getData(flow.art_id, flow.type)
    const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likePrevious)
    return art
  }

  static async detail(id, type, uid) {
    const artDetail = ClassicService.art(id, type, uid)
    artDetail.art.setDataValue('like_status', artDetail.like_status)
    return artDetail.art
  }

  static async art(id, type, uid) {
    const artDetail = await new Art(id, type).getDetail(uid)
    return artDetail
  }

  static async getData(art_id, type) {
    return await Art.getData(art_id, type)
  }

  static async favor(uid) {
    return await Favor.getMyClassicFavors(uid)
  }
}

module.exports = {
  ClassicService
}