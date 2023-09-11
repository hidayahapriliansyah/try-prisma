import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

// tokennya cuman di set 1 ms boy
const token = jwt.sign({ message: 'hello' }, 'loveletter', { expiresIn: 1 });

setTimeout(() => {
  try {
    console.log('beres nuggu 1 detik');
    const verifiy = jwt.verify('fgfgfgfg', 'loveletter');
    console.log(verifiy);
  } catch (error: any) {
    console.log('error =>>', error);
    console.log('error instanceof TokenExpiredError', error instanceof JsonWebTokenError);
    console.log('message', (error as TokenExpiredError).message);
  }
}, 1000);





// create
// verify