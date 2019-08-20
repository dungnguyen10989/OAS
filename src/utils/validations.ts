// import * as yup from 'yup';

const yup = require('yup');

const def = yup.object().shape({
  email: yup
    .string()
    .test('min', 'Min', (value: string) => Number(value.replace(',', '')) >= 20000)
    .test('max', 'Max', (value: string) => Number(value.replace(',', '')) <= 50000)
    .required()
});

const validate = {
  email: (min: number, max: number): boolean =>
    yup
      .string()
      .test('min', 'Min', (value: string) => Number(value.replace(/,/g, '')) >= min)
      .test('max', 'Max', (value: string) => Number(value.replace(/,/g, '')) <= max)
      .required()
};

export { def, validate };
