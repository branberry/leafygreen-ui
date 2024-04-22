import { transformCheck } from '../../../../../utils/tests/transformCheck';

const transform = 'update-component-prop-value';
const test = {
  name: 'update-component-prop-value-array',
  options: {
    componentName: 'MyComponent',
    attributeName: 'prop',
    newAttributeValue: {
      value1: 'value1Mapped',
      value2: 'value2Mapped',
      value3: 'value3Mapped',
      value4: 'value4Mapped',
    },
  },
};
transformCheck(__dirname, {
  fixture: test.name,
  transform,
  options: test.options,
});
