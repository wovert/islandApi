const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const { LoginType, ArtType } = require('../lib/enum')

class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      // 且关系
      new Rule('isLength', '不符合账号规则', { min: 4, max:32 })
    ]
    this.secret = [
      // 1. 可以为空 可以不穿
      // 2. 空 不为空
      // 传统web: account + secrent
      // 现代: account
      // 手机登录
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
      })
    ]
  }

  validateLoginType(vals) {
    let type = vals.body.type
    if (!type) {
      throw new Error("type是必须参数");
    }
    type = parseInt(type)
    if (!LoginType.isThisType(type)) {
      throw new Error("type参数不合法");
    }

    // 邮箱登录用户必须输入密码
    if (LoginType.USER_EMAIL === type && !vals.body.secret) {
      throw new Error('密码至少输入6个字符')
    }
  }
}

function checkType(type) {
  if (!type) {
    throw new Error('type是必须参数') // 登录类型参数必须传值
  }

  if (!LoginType.isThisType(type)) {
    throw new Error('type参数不合法')     
  }
}

function checkArtType(vals) {
  let type = vals.body.type || vals.path.type
  if (!type) {
    throw new Error("type是必须参数")
  }
  type = parseInt(type)

  if (!ArtType.isThisType(type)) {
    throw new Error("type参数不合法")
  }
}

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      // 且关系
      new Rule('isInt', '需要时正整数', { min: 1 })
    ]
  }
}

class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super()
    this.validateType = checkArtType
  }
}

class ClassicValidator extends LikeValidator {

}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', '不允许为空', { min: 1 })
    ]
  }
}

// 注册验证器
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.password1 = [
      // 用户指定范围：123456 $^
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z+$])[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      }),
    ]
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (user) {
      throw new Error('email已存在')
    }
  }
}

class SearchValidator extends LinValidator {
  constructor() {
    super()
    this.q = [
      new Rule('isLength', '搜索关键词不能为空', {
        min: 1,
        max: 16
      })
    ]
    // 第几个开始
    this.start = [
      new Rule('isInt', 'start不符合规范', {
        min: 0,
        max: 60000
      }),
      new Rule('isOptional', '', 0)
    ]
    this.count = [
      new Rule('isInt', 'count不符合规范', {
        min: 1,
        max: 20
      }),
      new Rule('isOptional', '', 20)
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  TokenValidator,
  LikeValidator,
  NotEmptyValidator,
  RegisterValidator,
  ClassicValidator,
  SearchValidator
}