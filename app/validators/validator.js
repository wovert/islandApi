const { LinValidator, Rule } = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      // 且关系
      new Rule('isInt', '需要时正整数', { min: 1 })
    ]
  }
}

module.exports = {
  PositiveIntegerValidator
}