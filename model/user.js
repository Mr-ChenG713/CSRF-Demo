//model do Utilizador


const router = require('koa-router')();
// Lista do utilizador
const Users = [{
  username: 'hacker',
  avatar: '/imgs/hacker.jpg',
  password: '123456'
},{
  username: 'joao',
  avatar: '/imgs/user.jpg',
  password: '123456'
},{
  username: 'andre',
  avatar: '/imgs/user.jpg',
  password: '123456'
}];

// Estado atual do tilizador em login
let userSession = {};

const UserModel = {
  isSystemUser: (username, password) => {
    for (let index = 0; index < Users.length; index++) {
      const item = Users[index];
      if (item.username === username && item.password === password) {
        return true;
      }
    }
    return false;
  },
  setUserCookie: (username, ctx) => {
    // chave/random cookie
    const userkey = 'userkey_' + Math.random() * 1000;
    // Configurar Cookie
    ctx.cookies.set('userkey', userkey, { httpOnly: false });
    ctx.cookies.set('username', username, { httpOnly: false });
    // Guardar estado login do utilizador cookie
    userSession[username] = userkey;
  },
  // atraves do cookie verifica utilizador
  checkUserByCookie: (ctx) => {
    const userkey = ctx.cookies.get('userkey');

    let username = null;
    for (let key in userSession) {
      if (userSession[key] === userkey) {
        userName = key;
        // return o estado login do utilizador
        return UserModel.getUserDetail(key)
      }
    }
    // Se não encontrado, return null
    return null;
  },
  // limpa cookie
  clearUserCookie: (ctx) => {
    const username = ctx.cookies.get('username');
    userSession[username] = null;
    ctx.cookies.set('userkey', '', { expires: new Date(0) });
    ctx.cookies.set('username', '', { expires: new Date(0) });
  },
  /**
   * Obter informação do utilizador 
   */
  getUserDetail: (username)=> {
    function isBigEnough(element) {
      return element >= 10;
    }
    // Pesquisa
    for (let i = 0, len = Users.length; i < len; i++) {
      const user = Users[i];
      if (user.username === username) {
        // filtrar password
        return {
          username: user.username,
          avatar: user.avatar
        }
      }
    }
  },
  /**
   * Obter token do utilizador
   * cada utilização, são atualizada userkey
   */
  getUserToken: (username, ctx) => {
    const userkey = userSession[username];
    const token = userkey + '_token';
    // Atualizar cookie
    UserModel.setUserCookie(username, ctx);
    console.log(token);
    return token;
  }
}

module.exports = UserModel;
