import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient()

/**
 * try
 * kalau unique single dilanggar gimana DONE
 * kalau unique multiple collomn dilanggar gimana DONE
 * kalau length dilanggar gimana DONE
 * kalau $transaction dilanggar gimana DONE
 * kalau fk constraint dilanggar gimana
 */

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'User Hehe',
  //     email: 'userhehehe@prisma.ioy',
  //     username: 'userhehe',
  //   },
  // });

  // const book = await prisma.book.create({
  //   data: {
  //     name: 'Book Hey',
  //   },
  // });

  await prisma.borrowedBook.create({
    data: {
      bookId: 1,
      userId: 50,
    }
  });
}

main()
.then(async () => {
  await prisma.$disconnect();
  await prisma.user.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.borrowedBook.deleteMany({});
})
.catch(async (e) => {
    console.log('error =>>', e)
    await prisma.user.deleteMany({});
    await prisma.book.deleteMany({});
    await prisma.borrowedBook.deleteMany({});
    await prisma.$disconnect()
    process.exit(1)
  })

/**
 * UNIQUE SINGLE CONSTRAINT
 * kalau unique constraint akan menghasilkan error dari unique yang pertama
 * misal, email unique, username unique, ketika ada input yang mana email dan usernamenya udah kepake
 * karena email itu urutan inputnya pertama kali, maka yang kedetek error itu email, username belum
 * nah pas email dibenerin, username baru error.
 * 
 * error instance of PrismaClientKnownRequestError
 * error.code P2002
 * error.meta?.target[0] = field error (kolom mana yang error)
 * 
 * UNIQUE MULTIPLE COLUMN CONSTRAINT
 * kalau ini misal
 * @@unique([userId, bookId])
 * maka ketika ada record yang melanggar constrain itu hasilnya
 * code: 'P2003',
 * clientVersion: '5.2.0',
 * meta: { field_name: 'BorrowedBook_userId_fkey (index)' }
 * 
 * 
 * LENGTH username @db.VarChar(30)
 * malah kieu boy ... btw aya issue nu can solve oge sih
 * https://github.com/prisma/prisma/issues/12073
 * 
 *
 * error =>> PrismaClientKnownRequestError: 
Invalid `prisma.user.create()` invocation in
D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\script.ts:16:34
  13 
  14
  15 async function main() {
→ 16   const user = await prisma.user.create(
  The provided value for the column is too long for the column's type. Column: (not available)
    at vn.handleRequestError (D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\node_modules\@prisma\client\runtime\library.js:123:6730)
    at vn.handleAndLogRequestError (D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\node_modules\@prisma\client\runtime\library.js:123:6119)        
    at vn.request (D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\node_modules\@prisma\client\runtime\library.js:123:5839)
    at async l (D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\node_modules\@prisma\client\runtime\library.js:128:9763) {
  code: 'P2000',
  clientVersion: '5.2.0',
  meta: { column_name: '(not available)' }
 *
 * TRANSACTION ERROR
 * keren euy. nge throw error mentahna atuh da.
 * nah untuk prisma.$transaction((tx) => {})
 * kalah di dalam callbacknya masih pakai prisma.table bukan tx.table
 * maka meskipun nge rollback yang pakai prisma itu gak termasuk dalam transaction
 * ini keren sih ... aawhejfhsdhjshdjfhsjdhfj
 * 
 * ERROR FK
 * error =>> PrismaClientKnownRequestError: 
  Invalid `prisma.borrowedBook.create()` invocation in
  D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\script.ts:30:29
  27 //   },
  28 // });
  29
  → 30 await prisma.borrowedBook.create(
  Foreign key constraint failed on the field: `BorrowedBook_userId_fkey (index)`
      at vn.handleRequestError (D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\node_modules\@prisma\client\runtime\library.js:123:6730)
    at vn.handleAndLogRequestError (D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\node_modules\@prisma\client\runtime\library.js:123:6119)        
    at vn.request (D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\node_modules\@prisma\client\runtime\library.js:123:5839)
    at async l (D:\backup-dell-latitude\Desktop\belajar-mandiri\try-prisma\node_modules\@prisma\client\runtime\library.js:128:9763) {
  code: 'P2003',
  clientVersion: '5.2.0',
  meta: { field_name: 'BorrowedBook_userId_fkey (index)' }
 */