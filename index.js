const app = require('koa')()
const router = require('koa-router')() 
const bodyParser = require('koa-bodyparser')
const chalk = require('chalk')

const date = () => chalk.grey((new Date()).toISOString())
const getting = chalk.green('getting')
const putting = chalk.yellow('putting')
const posting = chalk.red('posting')
const listening = chalk.blue('listening')

router.get('/v1/receivers/:user', function * () {
  console.log(date(), getting, 'receiver', this.params.user)
  this.body = {
    type: 'payee',
    name: 'Somebody McPerson',
    account: 'https://example.com/accounts/' + this.params.user,
    currencySymbol: '£',
    currencyCode: 'GBP',
    imageUrl: 'https://nexus.justmoon.com/api/users/sharafian/profilepic',
    paymentsUrl: 'http://localhost:6666/v1/receivers/' + this.params.user + '/payments/:id'
  }
})

router.get('/v1/receivers/invoices/:id', function * () {
  console.log(date(), getting, 'receivers invoices', this.params.id)
  this.body = {
    type: 'invoice',
    account: 'https://example.com/accounts/' + this.params.id,
    currencySymbol: '£',
    currencyCode: 'GBP',
    amount: '10.00',
    status: 'unpaid',
    invoiceInfo: 'https://example.com',
    paymentsUrl: 'http://localhost:6666/v1/receivers/invoices/' + this.params.id
  }
})

router.put('/v1/receivers/:user/payments/:id', function * () {
  console.log(date(), putting, 'receivers', this.params.user, 'payments', this.params.id)
  this.status = 200
})

router.put('/v1/receivers/invoices/:id', function * () {
  console.log(date(), putting, 'receivers invoices', this.params.id)
  this.status = 200
})

router.post('/v1/invoices', function * () {
  console.log(date(), posting, 'invoice')
  this.status = 200
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser())
  .listen(6666)

console.log(date(), listening, 'on 6666')
