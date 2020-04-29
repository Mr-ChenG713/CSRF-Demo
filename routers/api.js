//API


const router = require('koa-router')();
const userModel = require('../model/user');
const bankModel = require('../model/bank');

//Login
router.post('/login', async ( ctx )=>{
  const postData = ctx.request.body;
  if (userModel.isSystemUser(postData.username, postData.password)) {
    // Configurar o estado de login cookie
    userModel.setUserCookie(postData.username, ctx);
    // Login sucesso
    ctx.body = {
      success: true,
      retcode: 0
    };
  } else {
    // Login insucesso
    ctx.body = {
      success: false,
      message: 'Não existe este utilizador'
    };
  }
});

//Logout
router.post('/logout', async ( ctx )=>{
  const postData = ctx.request.body;
  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    userModel.clearUserCookie(ctx);
    ctx.body = {
      success: true,
      retcode: 0
    };
  } else {
    // Login insucesso
    ctx.body = {
      success: false,
      message: 'Não tem sessão iniciada'
    };
  }
});

//Obter informação do utilizador dados
router.get('/get_userinfo', async ( ctx )=> {

    const user = userModel.checkUserByCookie(ctx);
    if (user) {
      ctx.body = {
        is_login: true,
        username: user.username
      }
    } else {
      ctx.body = {
        is_login: false
      }
    }
  })

//Obter informação do utilizador money
router.get('/get_user_money', async ( ctx )=>{

  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    ctx.body = {
      success: true,
      user: user,
      money: bankModel.getUserMoney(user.username)
    };
  } else {
    ctx.body = {
      success: false,
      retcode: -1,
      message: 'Não tem sessão iniciada陆'
    };
  }
});

// Pedido da transferencia
router.post('/transfer_money', async ( ctx )=>{
  const user = userModel.checkUserByCookie(ctx);
  const postData = ctx.request.body;
  // Operação da transferencia
  const result = bankModel.transferMoney({
    from: user.username,
    to: postData.username,
    money: postData.money
  });
  // return resultado
  ctx.body = result;
});


/**
 * csrf condigo defesa
 * Adicionar referer
 */

 /*router.post('/transfer_money', async ( ctx )=>{
   const user = userModel.checkUserByCookie(ctx);
   const postData = ctx.request.body;

   // Obter verificação de referer
   const referer = ctx.request.header.referer;
   // Se é valido, continua a operação
   if (/https?:\/\/localhost:3000/.test(referer)) {
     // Operação de transferencia
     const result = bankModel.transferMoney({
       from: user.username,
       to: postData.username,
       money: postData.money
     });
     ctx.body = result;
   } else {
     // return resultado
     ctx.body = {
       success: false,
       mesage: 'referer não está certo'
     };
   }
 }); */


/**
 * csrf codigo defense
 * Acrescentar a verificação de token
 */

/* router.post('/transfer_money', async ( ctx )=>{
   const user = userModel.checkUserByCookie(ctx);
   const postData = ctx.request.body;

   // Verificar token
   const postToken = postData.token;  // 用户提交的 token
   const serverToken = userModel.getUserToken(user.username, ctx); // 服务器算的token
   const isTrueToken = postToken === serverToken;
   if (isTrueToken) {
      // Operação transferencia
      const result = bankModel.transferMoney({
       from: user.username,
       to: postData.username,
       money: postData.money
     });
     ctx.body = result;
   } else {
     // return resultado
     ctx.body = {
       success: false,
       mesage: 'token não está certo'
     };
   }
 });*/



module.exports = router;
