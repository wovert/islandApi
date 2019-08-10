// async function fn() {
//   return 'hello'
// }

// let i = 10;

// let m = 20;

// console.log(fn())

function func1() {
  func2()
}

async function func2() {
  try {
    await func3() // reject 自动抛出异常
  } catch (error) {
    console.log('error....')
  }
}

async function func3() {
  // return await setTimeout(function () { 
  //   throw new Error('error')
  // }, 1000)
  return new Promise((resolve, reject) => {
    setTimeout(function () { 
      const r = Math.random()
      if (r < 0.5) {
        reject('error')
      }
    }, 1000)
  })
}

func1()

// 函数设计

// 判断出异常：return false null
// throw new Error

// 机制：全局监听异常
