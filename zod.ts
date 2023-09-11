import z from 'zod';
import { ZodError } from 'zod/lib';

const zodSchema = z.object({
  restaurantId: z.string({
    required_error: 'RestaurantId harus diisi.',
    invalid_type_error: 'restaurantId harus berupa string.',
  }),
  menus: z.array(z.object({
    id: z.string({
      required_error: 'item menus id harus diisi.',
      invalid_type_error: 'item menus id harus berupa string.'
    }),
    quantity: z.number({
      required_error: 'item menus quantity harus diisi.',
      invalid_type_error: 'item menus quantity harus berupa number.'
    }),
  }, {
    required_error: 'item menus harus diisi.',
    invalid_type_error: 'item menus harus berupa object.',
  }), {
    required_error: 'menus harus diisi.',
    invalid_type_error: 'menus harus berupa array.',
  }).min(1),
});

try {
  const dummyPayload = {
    restaurantId: 'helloid',
    menus: {
      id: 3434,
      quantity: 'ererer',
    },
  };

  zodSchema.parse(dummyPayload);
} catch (error: any) {
  console.log('error ==>>', error);
  const groupedError = (error as ZodError).errors.map((err) => ({
    path: err.path[0],
    message: err.message,
  }));
  console.log('groupedError', groupedError);
}